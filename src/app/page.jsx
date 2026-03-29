"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  RefreshCw,
  User,
  KeyRound,
  FileText,
  Shuffle,
  Sparkles,
  LayoutDashboard,
  Settings,
  Wand2,
  BadgeInfo,
  Mail,
  Globe,
  LogIn,
  UserPlus,
  Check,
} from "lucide-react";

const adjectives = [
  "Shadow","Nova","Hyper","Vortex","Frost","Venom","Ghost","Rapid","Dark","Silent",
  "Alpha","Blaze","Storm","Pixel","Neon","Steel","Turbo","Rogue","Void","Cosmo"
];

const nouns = [
  "Wolf","Falcon","Byte","Knight","Echo","Hunter","Pulse","Raven","Titan","Orbit",
  "Cipher","Drift","Phantom","Comet","Sniper","Spark","Nexus","Blade","Shift","Crown"
];

const firstNames = ["Arda","Eren","Mert","Kaan","Berk","Deniz","Emir","Yusuf","Mina","Zeynep","Elif","Asya"];
const lastNames = ["Yılmaz","Kaya","Demir","Çelik","Aydın","Koç","Arslan","Şahin","Acar","Taş"];
const cities = ["İzmir","İstanbul","Ankara","Bursa","Antalya","Eskişehir","Muğla","Adana"];
const bios = [
  "Dijital projelerle ilgileniyor.",
  "Tasarım ve içerik üretmeyi seviyor.",
  "Teknoloji odaklı bir profil.",
  "Hızlı çalışan modern araçları tercih ediyor.",
  "Topluluk ve üretim odaklı bir kullanıcı."
];

const bioTemplates = [
  "Minimal yaşayan, büyük düşünen biri.",
  "Tasarım, teknoloji ve hız odaklı.",
  "Sessiz ama etkili projeler üretir.",
  "Dijital dünyada iz bırakmayı sever.",
  "Modern, sade ve güçlü detaylardan hoşlanır.",
  "Fikirleri ürüne dönüştürmeyi sever.",
];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function generateUsername(style = "cool") {
  const adj = rand(adjectives);
  const noun = rand(nouns);
  const num = randNum(10, 9999);

  if (style === "clean") return `${adj}${noun}`;
  if (style === "gaming") return `${adj}_${noun}_${num}`;
  if (style === "short") return `${adj.slice(0, 3)}${noun.slice(0, 3)}${randNum(1, 99)}`;
  return `${adj}${noun}${num}`;
}

function generatePassword(length = 14) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function generateProfile() {
  const first = rand(firstNames);
  const last = rand(lastNames);
  const birthYear = randNum(1996, 2006);
  const city = rand(cities);
  const username = `${first.toLowerCase()}${last.toLowerCase()}${randNum(10, 999)}`;

  return {
    name: `${first} ${last}`,
    username,
    email: `${username}@maildemo.com`,
    city,
    bio: rand(bios),
    birthYear,
  };
}

function generateEmailVariant(base) {
  const clean = (base || "demo").toLowerCase().replace(/[^a-z0-9]/g, "") || "demo";
  const providers = ["gmail.com", "outlook.com", "hotmail.com", "maildemo.com"];
  return `${clean}${randNum(10, 9999)}@${rand(providers)}`;
}

function generateFakeData() {
  const first = rand(firstNames);
  const last = rand(lastNames);
  const username = `${first.toLowerCase()}${last.toLowerCase()}${randNum(10, 999)}`;
  return {
    fullName: `${first} ${last}`,
    username,
    email: generateEmailVariant(first + last),
    city: rand(cities),
    phone: `05${randNum(30, 55)} ${randNum(100, 999)} ${randNum(10, 99)} ${randNum(10, 99)}`,
    bio: rand(bioTemplates),
  };
}

function SidebarButton({ active, icon: Icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
        active
          ? "bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
          : "bg-slate-900/40 text-slate-300 hover:bg-slate-800/80"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="font-semibold">{children}</span>
    </button>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
      <div className="text-2xl font-black text-cyan-200">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default function Page() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authName, setAuthName] = useState("Berdan");
  const [authEmail, setAuthEmail] = useState("berdan@example.com");
  const [authPassword, setAuthPassword] = useState("12345678");

  const [usernameStyle, setUsernameStyle] = useState("cool");
  const [usernameCount, setUsernameCount] = useState(12);
  const [usernames, setUsernames] = useState(() => Array.from({ length: 12 }, () => generateUsername("cool")));

  const [passwordLength, setPasswordLength] = useState(14);
  const [passwords, setPasswords] = useState(() => Array.from({ length: 8 }, () => generatePassword(14)));

  const [profiles, setProfiles] = useState(() => Array.from({ length: 6 }, () => generateProfile()));
  const [bioCount, setBioCount] = useState(8);
  const [bioList, setBioList] = useState(() => Array.from({ length: 8 }, () => rand(bioTemplates)));
  const [fakeBase, setFakeBase] = useState("berdan");
  const [fakeRows, setFakeRows] = useState(() => Array.from({ length: 6 }, () => generateFakeData()));
  const [searchTerm, setSearchTerm] = useState("");

  const usernameSummary = useMemo(() => `${usernames.length} adet kullanıcı adı üretildi`, [usernames]);
  const passwordSummary = useMemo(() => `${passwords.length} adet şifre hazır`, [passwords]);

  const regenerateUsernames = () => {
    const count = Math.max(1, Math.min(50, Number(usernameCount) || 1));
    setUsernames(Array.from({ length: count }, () => generateUsername(usernameStyle)));
  };

  const regeneratePasswords = () => {
    const len = Math.max(8, Math.min(32, Number(passwordLength) || 14));
    setPasswords(Array.from({ length: 8 }, () => generatePassword(len)));
  };

  const regenerateProfiles = () => {
    setProfiles(Array.from({ length: 6 }, () => generateProfile()));
  };

  const regenerateBios = () => {
    const count = Math.max(1, Math.min(20, Number(bioCount) || 1));
    setBioList(Array.from({ length: count }, () => rand(bioTemplates)));
  };

  const regenerateFakeRows = () => {
    setFakeRows(
      Array.from({ length: 6 }, () => ({
        ...generateFakeData(),
        email: generateEmailVariant(fakeBase),
      }))
    );
  };

  React.useEffect(() => {
    const savedLogged = localStorage.getItem("utp_logged_in");
    const savedName = localStorage.getItem("utp_name");
    const savedEmail = localStorage.getItem("utp_email");
    if (savedLogged === "1") setLoggedIn(true);
    if (savedName) setAuthName(savedName);
    if (savedEmail) setAuthEmail(savedEmail);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("utp_logged_in", loggedIn ? "1" : "0");
    localStorage.setItem("utp_name", authName);
    localStorage.setItem("utp_email", authEmail);
  }, [loggedIn, authName, authEmail]);

  const filteredUsernames = usernames.filter((x) => x.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPasswords = passwords.filter((x) => x.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredBios = bioList.filter((x) => x.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFakeRows = fakeRows.filter((row) =>
    [row.fullName, row.username, row.email, row.city, row.phone, row.bio]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const exportCsv = () => {
    const header = ["fullName", "username", "email", "city", "phone", "bio"];
    const rows = filteredFakeRows.map((row) => [row.fullName, row.username, row.email, row.city, row.phone, row.bio]);
    const csv = [header, ...rows]
      .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("
");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fake-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    const blob = new Blob([
      JSON.stringify(
        {
          usernames,
          passwords,
          profiles,
          bioList,
          fakeRows,
        },
        null,
        2
      ),
    ], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "panel-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f3b52_0%,#020617_38%,#000814_100%)] px-4 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_60px_rgba(34,211,238,0.15)]">
              <Sparkles className="h-7 w-7 text-cyan-300" />
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">Ultimate Tools Panel</h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
              Login, dashboard, tool modülleri, export ve modern tasarım tek panel içinde hazır.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr,.85fr]">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3">
                  {authMode === "login" ? <LogIn className="h-5 w-5 text-cyan-300" /> : <UserPlus className="h-5 w-5 text-cyan-300" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}</h2>
                  <p className="text-sm text-slate-400">Frontend demo auth ekranı hazır. Sonra backend bağlanabilir.</p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 rounded-2xl border border-slate-800 bg-slate-950/50 p-1">
                <button onClick={() => setAuthMode("login")} className={`rounded-xl px-4 py-3 font-semibold ${authMode === "login" ? "bg-cyan-500 text-slate-950" : "text-slate-300"}`}>
                  Giriş
                </button>
                <button onClick={() => setAuthMode("register")} className={`rounded-xl px-4 py-3 font-semibold ${authMode === "register" ? "bg-cyan-500 text-slate-950" : "text-slate-300"}`}>
                  Kayıt
                </button>
              </div>

              <div className="space-y-4">
                {authMode === "register" && (
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Ad Soyad</label>
                    <input value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none" />
                  </div>
                )}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">E-posta</label>
                  <input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Şifre</label>
                  <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none" />
                </div>
                <button onClick={() => setLoggedIn(true)} className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                  <Check className="mr-2 h-4 w-4" />
                  {authMode === "login" ? "Panele Gir" : "Hesap Oluştur"}
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              <StatCard value="6+" label="Hazır modül" />
              <StatCard value="Dark" label="Modern arayüz" />
              <StatCard value="JSON" label="Export desteği" />
              <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
                <h3 className="mb-3 text-lg font-bold text-slate-100">Bu sürümde neler var?</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-300" /> Login / register ekranı</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-300" /> Dashboard ve sol menü</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-300" /> Kullanıcı adı üretici</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-300" /> Şifre üretici</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-300" /> Bio ve demo veri araçları</li>
                  <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-cyan-300" /> JSON export</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f3b52_0%,#020617_38%,#000814_100%)] text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px,1fr] lg:px-6">
        <aside className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <div className="text-lg font-black">Ultimate Panel</div>
              <div className="text-sm text-slate-400">{authName || "Kullanıcı"}</div>
            </div>
          </div>

          <div className="space-y-2">
            <SidebarButton active={page === "dashboard"} icon={LayoutDashboard} onClick={() => setPage("dashboard")}>Dashboard</SidebarButton>
            <SidebarButton active={page === "usernames"} icon={User} onClick={() => setPage("usernames")}>Kullanıcı Adı</SidebarButton>
            <SidebarButton active={page === "passwords"} icon={KeyRound} onClick={() => setPage("passwords")}>Şifreler</SidebarButton>
            <SidebarButton active={page === "profiles"} icon={FileText} onClick={() => setPage("profiles")}>Demo Profiller</SidebarButton>
            <SidebarButton active={page === "bios"} icon={Wand2} onClick={() => setPage("bios")}>Bio Generator</SidebarButton>
            <SidebarButton active={page === "fakedata"} icon={Mail} onClick={() => setPage("fakedata")}>Fake Data</SidebarButton>
            <SidebarButton active={page === "settings"} icon={Settings} onClick={() => setPage("settings")}>Ayarlar</SidebarButton>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="text-sm text-slate-400">Durum</div>
            <div className="mt-2 text-lg font-bold text-cyan-200">Pro Sürüm Hazır</div>
            <p className="mt-2 text-sm text-slate-400">İstersen sonraki adımda backend, veritabanı ve gerçek kullanıcı sistemi bağlanır.</p>
          </div>

          <button onClick={() => { setLoggedIn(false); localStorage.removeItem("utp_logged_in"); }} className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-800">
            Çıkış Yap
          </button>
        </aside>

        <main className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="mb-3 w-full md:hidden">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Panel içinde ara..."
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{page === "dashboard" ? "Dashboard" : page === "usernames" ? "Kullanıcı Adı Üretici" : page === "passwords" ? "Şifre Üretici" : page === "profiles" ? "Demo Profil Üretici" : page === "bios" ? "Bio Generator" : page === "fakedata" ? "Fake Data" : "Ayarlar"}</h1>
                <p className="mt-2 text-slate-400">Dark UI, hızlı araçlar ve tek panel mantığı ile hazır sistem.</p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Panel içinde ara..."
                  className="hidden w-full min-w-[240px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none md:block"
                />
                <button onClick={exportJson} className="rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">JSON Export</button>
                <button className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-800">Canlıya Alma Hazır</button>
              </div>
            </div>
          </motion.div>

          {page === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <StatCard value="6" label="Araç modülü" />
                <StatCard value="100%" label="Frontend hazır" />
                <StatCard value="Dark" label="Tasarım dili" />
                <StatCard value="JSON" label="Export desteği" />
              </div>
              <div className="grid gap-6 xl:grid-cols-[1.1fr,.9fr]">
                <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <BadgeInfo className="h-5 w-5 text-cyan-300" />
                    <h2 className="text-xl font-bold">Hazır Özellikler</h2>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      "Login / register ekranı",
                      "Modern sidebar",
                      "Kullanıcı adı üretici",
                      "Şifre üretici",
                      "Bio generator",
                      "Fake data üretici",
                      "JSON export",
                      "Responsive tasarım",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-200">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[28px] border border-slate-800 bg-slate-900/60 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Globe className="h-5 w-5 text-cyan-300" />
                    <h2 className="text-xl font-bold">Sonraki Adımlar</h2>
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li>• Domain bağlama</li>
                    <li>• Vercel deploy</li>
                    <li>• Backend API ekleme</li>
                    <li>• Veritabanı bağlama</li>
                    <li>• Gerçek kullanıcı kayıt sistemi</li>
                    <li>• Admin dashboard geliştirme</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {page === "usernames" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3"><User className="h-5 w-5 text-cyan-300" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-50">Kullanıcı Adı Üretici</h2>
                    <p className="mt-1 text-slate-400">Discord, oyun, sosyal medya veya marka adı için hızlı öneriler.</p>
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{usernameSummary}</div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
                <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Stil</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[["cool", "Cool"],["gaming", "Gaming"],["short", "Kısa"]].map(([value, label]) => (
                        <button key={value} onClick={() => setUsernameStyle(value)} className={`rounded-2xl border px-3 py-2 text-sm font-semibold ${usernameStyle === value ? "border-cyan-400/30 bg-cyan-500/15 text-cyan-200" : "border-slate-700 bg-slate-900 text-slate-300"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Adet</label>
                    <input type="number" min={1} max={50} value={usernameCount} onChange={(e) => setUsernameCount(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                  </div>
                  <button onClick={regenerateUsernames} className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                    <RefreshCw className="mr-2 h-4 w-4" /> Yeniden Üret
                  </button>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {filteredUsernames.map((name, i) => (
                      <div key={`${name}-${i}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                        <span className="truncate text-sm font-semibold text-slate-100">{name}</span>
                        <button onClick={() => copyText(name)} className="rounded-xl p-2 text-slate-300 hover:bg-slate-800"><Copy className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {page === "passwords" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3"><KeyRound className="h-5 w-5 text-cyan-300" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-50">Şifre Üretici</h2>
                    <p className="mt-1 text-slate-400">Güçlü ve hızlı şifre listesi oluşturur.</p>
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{passwordSummary}</div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
                <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Uzunluk</label>
                    <input type="number" min={8} max={32} value={passwordLength} onChange={(e) => setPasswordLength(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                  </div>
                  <button onClick={regeneratePasswords} className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                    <Shuffle className="mr-2 h-4 w-4" /> Yeni Şifreler
                  </button>
                </div>
                <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
                  {filteredPasswords.map((pwd, i) => (
                    <div key={`${pwd}-${i}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                      <span className="break-all font-mono text-sm text-slate-100">{pwd}</span>
                      <button onClick={() => copyText(pwd)} className="shrink-0 rounded-xl p-2 text-slate-300 hover:bg-slate-800"><Copy className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {page === "profiles" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3"><FileText className="h-5 w-5 text-cyan-300" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-50">Demo Profil Üretici</h2>
                    <p className="mt-1 text-slate-400">Test, arayüz gösterimi ve örnek kayıtlar için profil kartları üretir.</p>
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Demo data</div>
              </div>
              <div className="mb-4 flex justify-end">
                <button onClick={regenerateProfiles} className="flex items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400"><RefreshCw className="mr-2 h-4 w-4" /> Profilleri Yenile</button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {profiles.map((profile, i) => (
                  <div key={`${profile.username}-${i}`} className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 font-bold text-cyan-200">
                        {profile.name.split(" ").map((x) => x[0]).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-slate-100">{profile.name}</div>
                        <div className="text-sm text-slate-400">@{profile.username}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div><span className="text-slate-500">Mail:</span> {profile.email}</div>
                      <div><span className="text-slate-500">Şehir:</span> {profile.city}</div>
                      <div><span className="text-slate-500">Doğum:</span> {profile.birthYear}</div>
                      <p className="pt-2 text-slate-400">{profile.bio}</p>
                    </div>
                    <button onClick={() => copyText(JSON.stringify(profile, null, 2))} className="mt-4 flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 hover:bg-slate-800">
                      <Copy className="mr-2 h-4 w-4" /> JSON Kopyala
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {page === "bios" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3"><Wand2 className="h-5 w-5 text-cyan-300" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-50">Bio Generator</h2>
                    <p className="mt-1 text-slate-400">Kısa sosyal medya biyografileri ve profil açıklamaları üretir.</p>
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{bioList.length} adet</div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
                <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Adet</label>
                    <input type="number" min={1} max={20} value={bioCount} onChange={(e) => setBioCount(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                  </div>
                  <button onClick={regenerateBios} className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                    <RefreshCw className="mr-2 h-4 w-4" /> Yeni Biyolar
                  </button>
                </div>
                <div className="grid gap-3">
                  {filteredBios.map((bio, i) => (
                    <div key={`${bio}-${i}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-4">
                      <span className="text-slate-200">{bio}</span>
                      <button onClick={() => copyText(bio)} className="rounded-xl p-2 text-slate-300 hover:bg-slate-800"><Copy className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {page === "fakedata" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3"><Mail className="h-5 w-5 text-cyan-300" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-50">Fake Data Generator</h2>
                    <p className="mt-1 text-slate-400">Demo kayıt, test arayüzü ve örnek kullanıcı listesi üretir.</p>
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">6 kayıt</div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
                <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/40 p-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Mail kökü</label>
                    <input value={fakeBase} onChange={(e) => setFakeBase(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                  </div>
                  <button onClick={regenerateFakeRows} className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-400">
                    <RefreshCw className="mr-2 h-4 w-4" /> Demo Veri Üret
                  </button>
                </div>
                <div className="mb-4 flex justify-end">
                <button onClick={exportCsv} className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 font-semibold text-cyan-200 hover:bg-cyan-500/20">
                  CSV Export
                </button>
              </div>
              <div className="space-y-3">
                {filteredFakeRows.map((row, i) => (
                    <div key={`${row.username}-${i}`} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-200">
                      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                        <div><span className="text-slate-500">Ad:</span> {row.fullName}</div>
                        <div><span className="text-slate-500">Username:</span> {row.username}</div>
                        <div><span className="text-slate-500">Mail:</span> {row.email}</div>
                        <div><span className="text-slate-500">Şehir:</span> {row.city}</div>
                        <div><span className="text-slate-500">Telefon:</span> {row.phone}</div>
                      </div>
                      <div className="mt-2 text-slate-400">{row.bio}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {page === "settings" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3"><Settings className="h-5 w-5 text-cyan-300" /></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-50">Ayarlar</h2>
                  <p className="mt-1 text-slate-400">Şimdilik frontend demo ayar ekranı. Sonra backend ile gerçek ayarlar bağlanır.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5">
                  <div className="mb-2 text-sm text-slate-400">Hesap adı</div>
                  <input value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-5">
                  <div className="mb-2 text-sm text-slate-400">Hesap maili</div>
                  <input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none" />
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
