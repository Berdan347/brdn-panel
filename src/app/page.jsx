"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  Wand2,
  Copy,
  Download,
  History,
  Star,
  Trash2,
  Search,
  Settings,
  ShieldCheck,
  LayoutDashboard,
  Mail,
  Gauge,
  Info,
  MoonStar,
  ChevronRight,
} from "lucide-react";

const MAX_HISTORY = 12;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function parseGmail(addr) {
  const a = (addr || "").trim();
  const m = a.match(/^([^@]+)@gmail\.com$/i);
  if (!m) return null;
  const local = m[1];
  const normalized = local.replace(/\./g, "");
  return { local: normalized, domain: "gmail.com" };
}

function dotVariants(local, limit) {
  const chars = local.split("");
  const n = chars.length;
  if (n <= 1) return [local];
  const maxMasks = 1 << (n - 1);
  const out = [];
  for (let mask = 0; mask < maxMasks && out.length < limit; mask++) {
    let s = chars[0];
    for (let i = 0; i < n - 1; i++) {
      if (mask & (1 << i)) s += ".";
      s += chars[i + 1];
    }
    out.push(s);
  }
  return out;
}

function uniq(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}

function makePlus(local, count) {
  const out = [];
  for (let i = 1; i <= count; i++) out.push(`${local}+${i}@gmail.com`);
  return out;
}

function makeDot(local, count) {
  const dots = dotVariants(local, Math.min(4096, count * 6));
  return uniq(dots.slice(0, count).map((v) => `${v}@gmail.com`)).slice(0, count);
}

function makeDotPlus(local, count) {
  const baseDots = dotVariants(local, Math.min(4096, count * 6));
  const out = [];
  let tag = 1;
  for (let i = 0; i < baseDots.length && out.length < count; i++) {
    out.push(`${baseDots[i]}+${tag}@gmail.com`);
    tag++;
  }
  return uniq(out).slice(0, count);
}

function modeLabel(mode) {
  if (mode === "plus") return "+tag";
  if (mode === "dot") return "nokta";
  return "karma";
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-[26px] border border-slate-800/90 bg-slate-900/60 p-5 shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
          <Icon className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
      <div className="text-3xl font-black tracking-tight text-slate-50">{value}</div>
      {sub ? <div className="mt-1 text-sm text-slate-500">{sub}</div> : null}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, desc, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3">
          <Icon className="h-5 w-5 text-cyan-300" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-50">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export default function Page() {
  const [view, setView] = useState("dashboard");
  const [theme, setTheme] = useState("cyan");
  const [email, setEmail] = useState("beysehmus744@gmail.com");
  const [count, setCount] = useState(20);
  const [mode, setMode] = useState("plus");
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ generated: 0, copied: 0, exported: 0, favorited: 0 });
  const [brandName, setBrandName] = useState("Alias Üretim Paneli");
  const [supportUrl, setSupportUrl] = useState("https://discord.com/users/816990858515709962");

  useEffect(() => {
    const saved = localStorage.getItem("alias_pro_state_v1");
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      if (data.theme) setTheme(data.theme);
      if (data.brandName) setBrandName(data.brandName);
      if (data.supportUrl) setSupportUrl(data.supportUrl);
      if (Array.isArray(data.favorites)) setFavorites(data.favorites);
      if (Array.isArray(data.history)) setHistory(data.history);
      if (data.stats) setStats(data.stats);
      if (data.email) setEmail(data.email);
      if (data.count) setCount(data.count);
      if (data.mode) setMode(data.mode);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "alias_pro_state_v1",
      JSON.stringify({ theme, brandName, supportUrl, favorites, history, stats, email, count, mode })
    );
  }, [theme, brandName, supportUrl, favorites, history, stats, email, count, mode]);

  const themeMap = {
    cyan: "bg-[radial-gradient(circle_at_top,#083b58_0%,#020617_38%,#000814_100%)]",
    violet: "bg-[radial-gradient(circle_at_top,#312e81_0%,#111827_38%,#030712_100%)]",
    emerald: "bg-[radial-gradient(circle_at_top,#064e3b_0%,#052e2b_38%,#020617_100%)]",
  };

  const notify = (text) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, text }].slice(-4));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((x) => x.id !== id));
    }, 2200);
  };

  const filteredItems = useMemo(() => {
    return items.filter((x) => x.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((x) => x.toLowerCase().includes(query.toLowerCase()));
  }, [favorites, query]);

  const generateAliases = () => {
    const parsed = parseGmail(email);
    if (!parsed) {
      notify("Sadece gmail.com formatı kullan.");
      return;
    }

    const safeCount = Math.max(1, Math.min(200, Number(count) || 1));
    setCount(safeCount);

    let out = [];
    if (mode === "plus") out = makePlus(parsed.local, safeCount);
    if (mode === "dot") out = makeDot(parsed.local, safeCount);
    if (mode === "dotplus") out = makeDotPlus(parsed.local, safeCount);

    setItems(out);
    setStats((prev) => ({ ...prev, generated: prev.generated + out.length }));
    setHistory((prev) => [
      {
        id: Date.now(),
        email: `${parsed.local}@gmail.com`,
        mode,
        count: out.length,
        createdAt: new Date().toLocaleString("tr-TR"),
      },
      ...prev,
    ].slice(0, MAX_HISTORY));
    setView("generator");
    notify("Alias listesi üretildi.");
  };

  const resetAll = () => {
    setItems([]);
    setQuery("");
    notify("Liste temizlendi.");
  };

  const addFavorite = (value) => {
    setFavorites((prev) => (prev.includes(value) ? prev : [value, ...prev].slice(0, 50)));
    setStats((prev) => ({ ...prev, favorited: prev.favorited + 1 }));
    notify("Favorilere eklendi.");
  };

  const copyAll = async (list) => {
    if (!list.length) return notify("Liste boş.");
    await navigator.clipboard.writeText(list.join("\n"));
    setStats((prev) => ({ ...prev, copied: prev.copied + list.length }));
    notify("Tümü kopyalandı.");
  };

  const exportTxt = (list, filename = "aliaslar.txt") => {
    if (!list.length) return notify("Liste boş.");
    downloadTextFile(filename, list.join("\n"));
    setStats((prev) => ({ ...prev, exported: prev.exported + list.length }));
    notify("TXT indirildi.");
  };

  const exportJson = (list) => {
    if (!list.length) return notify("Liste boş.");
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aliaslar.json";
    a.click();
    URL.revokeObjectURL(url);
    setStats((prev) => ({ ...prev, exported: prev.exported + list.length }));
    notify("JSON indirildi.");
  };

  return (
    <div className={cn("min-h-screen text-white", themeMap[theme])}>
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="rounded-2xl border border-cyan-400/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 shadow-2xl backdrop-blur"
          >
            {n.text}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-center">
            <div className="rounded-[22px] border border-cyan-400/20 bg-cyan-400/10 p-4 shadow-[0_0_60px_rgba(34,211,238,0.18)]">
              <Sparkles className="h-8 w-8 text-cyan-300" />
            </div>
          </div>
          <h1 className="text-center text-4xl font-black tracking-tight md:text-5xl">{brandName}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-300">
            Gmail için +tag ve nokta varyasyonlarını hızlıca üret. Daha premium görünüm, favoriler, geçmiş, export merkezi ve yönetim ayarları tek panel içinde.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <StatCard icon={Gauge} label="Toplam üretim" value={stats.generated} sub="Bu oturum + kayıtlı veriler" />
          <StatCard icon={Copy} label="Toplam kopyalama" value={stats.copied} sub="Toplu ve tekli işlemler" />
          <StatCard icon={Download} label="Toplam export" value={stats.exported} sub="TXT ve JSON indirme" />
          <StatCard icon={Star} label="Favoriler" value={favorites.length} sub="Kaydedilmiş aliaslar" />
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[260px,1fr]">
          <aside className="rounded-[28px] border border-slate-800/90 bg-slate-900/60 p-4 shadow-2xl backdrop-blur">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Menü</div>
            <div className="space-y-2">
              {[
                ["dashboard", LayoutDashboard, "Dashboard"],
                ["generator", Wand2, "Generator"],
                ["favorites", Star, "Favoriler"],
                ["history", History, "Geçmiş"],
                ["exports", Download, "Export Merkezi"],
                ["settings", Settings, "Ayarlar"],
              ].map(([key, Icon, label]) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition",
                    view === key ? "bg-cyan-500 text-slate-950" : "bg-slate-950/50 text-slate-300 hover:bg-slate-800/80"
                  )}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <ShieldCheck className="h-4 w-4 text-cyan-300" /> Güvenli Kullanım
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Bu sürüm yalnızca alias listesi üretir. Giriş, şifre toplama veya gerçek hesap erişimi içermez.
              </p>
            </div>
          </aside>

          <main className="rounded-[28px] border border-slate-800/90 bg-slate-900/60 p-5 shadow-2xl backdrop-blur md:p-6">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Panel içinde ara..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 py-3 pl-11 pr-4 text-white outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => copyAll(filteredItems)} className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-800">
                  Tümünü Kopyala
                </button>
                <button onClick={() => exportTxt(filteredItems)} className="rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                  Hızlı TXT İndir
                </button>
              </div>
            </div>

            {view === "dashboard" && (
              <div>
                <SectionTitle
                  icon={LayoutDashboard}
                  title="Genel Bakış"
                  desc="Alias panelinin gelişmiş sürümü. Üret, kaydet, filtrele, export et ve geçmişini takip et."
                />
                <div className="grid gap-5 xl:grid-cols-[1.1fr,.9fr]">
                  <div className="rounded-[26px] border border-slate-800 bg-slate-950/50 p-5">
                    <div className="mb-4 text-lg font-bold text-slate-100">Hızlı Üretim</div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-slate-400">Gmail Adresi</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-slate-400">Üretilecek Adet</label>
                        <input type="number" min={1} max={200} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {[
                        ["plus", "+tag", "local+1, local+2..."],
                        ["dot", "Nokta", "lo.cal / l.o.c.a.l"],
                        ["dotplus", "Karma", "nokta + tag birleşik"],
                      ].map(([key, title, desc]) => (
                        <button
                          key={key}
                          onClick={() => setMode(key)}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition",
                            mode === key ? "border-cyan-400/40 bg-cyan-500/10" : "border-slate-800 bg-slate-950/50 hover:bg-slate-900"
                          )}
                        >
                          <div className="font-bold text-slate-100">{title}</div>
                          <div className="mt-1 text-sm text-slate-400">{desc}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button onClick={generateAliases} className="rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                        Aliasları Üret
                      </button>
                      <button onClick={resetAll} className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 font-semibold text-slate-200 hover:bg-slate-800">
                        Temizle
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-800 bg-slate-950/50 p-5">
                    <div className="mb-4 text-lg font-bold text-slate-100">Son Aktiviteler</div>
                    <div className="space-y-3">
                      {history.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-slate-400">Henüz geçmiş yok. İlk üretimini yap.</div>
                      ) : (
                        history.slice(0, 5).map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="font-semibold text-slate-100">{item.email}</div>
                              <div className="text-xs text-slate-500">{item.createdAt}</div>
                            </div>
                            <div className="mt-2 text-sm text-slate-400">{item.count} adet • Mod: {modeLabel(item.mode)}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === "generator" && (
              <div>
                <SectionTitle
                  icon={Mail}
                  title="Alias Generator"
                  desc="Üretilen listeyi filtrele, tek tek kopyala, favorilere ekle veya export et."
                  action={
                    <div className="flex gap-3">
                      <button onClick={() => exportJson(filteredItems)} className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-800">
                        JSON
                      </button>
                      <button onClick={() => exportTxt(filteredItems)} className="rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                        TXT İndir
                      </button>
                    </div>
                  }
                />
                <div className="space-y-3">
                  {filteredItems.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-slate-400">Liste boş. Önce alias üret.</div>
                  ) : (
                    filteredItems.map((item, i) => (
                      <div key={`${item}-${i}`} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="truncate font-medium text-slate-100">{item}</div>
                        <div className="flex gap-2">
                          <button onClick={() => addFavorite(item)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
                            <Star className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              copyText(item);
                              setStats((p) => ({ ...p, copied: p.copied + 1 }));
                              notify("Kopyalandı.");
                            }}
                            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {view === "favorites" && (
              <div>
                <SectionTitle icon={Star} title="Favoriler" desc="Kaydettiğin aliasları burada ayrı olarak tutabilirsin." />
                <div className="space-y-3">
                  {filteredFavorites.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-slate-400">Henüz favori yok.</div>
                  ) : (
                    filteredFavorites.map((item, i) => (
                      <div key={`${item}-${i}`} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="truncate font-medium text-slate-100">{item}</div>
                        <div className="flex gap-2">
                          <button onClick={() => copyText(item)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setFavorites((prev) => prev.filter((x) => x !== item));
                              notify("Favoriden kaldırıldı.");
                            }}
                            className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-200 hover:bg-rose-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {view === "history" && (
              <div>
                <SectionTitle icon={History} title="Geçmiş" desc="Son üretimlerin burada listelenir." />
                <div className="space-y-3">
                  {history.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-slate-400">Henüz kayıtlı geçmiş yok.</div>
                  ) : (
                    history.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="font-semibold text-slate-100">{item.email}</div>
                            <div className="mt-1 text-sm text-slate-400">{item.count} adet • {modeLabel(item.mode)}</div>
                          </div>
                          <div className="text-sm text-slate-500">{item.createdAt}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {view === "exports" && (
              <div>
                <SectionTitle icon={Download} title="Export Merkezi" desc="Üretilen listeyi farklı formatlarda dışa aktar." />
                <div className="grid gap-4 md:grid-cols-3">
                  <button onClick={() => exportTxt(filteredItems, "aliaslar.txt")} className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-5 text-left hover:bg-slate-900">
                    <div className="text-lg font-bold text-slate-100">TXT Export</div>
                    <div className="mt-2 text-sm text-slate-400">Hızlı paylaşım ve düz metin kullanım için.</div>
                  </button>
                  <button onClick={() => exportJson(filteredItems)} className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-5 text-left hover:bg-slate-900">
                    <div className="text-lg font-bold text-slate-100">JSON Export</div>
                    <div className="mt-2 text-sm text-slate-400">Sistem içi kullanım ve veri taşıma için.</div>
                  </button>
                  <button onClick={() => copyAll(filteredItems)} className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-5 text-left hover:bg-slate-900">
                    <div className="text-lg font-bold text-slate-100">Toplu Kopyala</div>
                    <div className="mt-2 text-sm text-slate-400">Tek tıkla tüm liste panoya alınır.</div>
                  </button>
                </div>
              </div>
            )}

            {view === "settings" && (
              <div>
                <SectionTitle icon={Settings} title="Ayarlar" desc="Marka adı, destek bağlantısı ve tema ayarlarını buradan yönet." />
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-[26px] border border-slate-800 bg-slate-950/50 p-5">
                    <div className="mb-4 text-lg font-bold text-slate-100">Marka Ayarları</div>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm text-slate-400">Site adı</label>
                        <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-slate-400">Destek linki</label>
                        <input value={supportUrl} onChange={(e) => setSupportUrl(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-800 bg-slate-950/50 p-5">
                    <div className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-100">
                      <MoonStar className="h-5 w-5 text-cyan-300" /> Tema Seçimi
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      {[
                        ["cyan", "Cyan"],
                        ["violet", "Violet"],
                        ["emerald", "Emerald"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => setTheme(value)}
                          className={cn(
                            "rounded-2xl border px-4 py-4 font-semibold",
                            theme === value ? "border-cyan-400/30 bg-cyan-500/15 text-cyan-200" : "border-slate-700 bg-slate-900 text-slate-300"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
                      Ayarlar tarayıcıda kayıtlı tutulur. Siteyi yenilesen bile korunur.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        <div className="mt-8 rounded-[26px] border border-slate-800/90 bg-slate-900/50 px-5 py-4 text-center text-sm text-slate-400 backdrop-blur">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <span>BRDN • Premium Alias Panel</span>
            <span className="hidden md:block">•</span>
            <a href={supportUrl} target="_blank" rel="noreferrer" className="font-bold text-cyan-300 hover:text-cyan-200">
              Discord Profilim
            </a>
            <span className="hidden md:block">•</span>
            <span className="flex items-center gap-1"><Info className="h-4 w-4" /> Sadece liste üretir, gerçek hesap erişimi içermez.</span>
          </div>
        </div>
      </div>
    </div>
  );
}