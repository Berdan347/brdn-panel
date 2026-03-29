export default function AliasPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `

    <!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BRDN | Alias Üretim Paneli</title>

  <style>
    :root{
      --bg0:#06080d;
      --bg1:#0b1220;

      --card: rgba(15, 23, 42, .66);
      --stroke: rgba(148, 163, 184, .14);
      --txt:#e8eef9;
      --muted:#aab6cf;

      --accent:#38bdf8;
      --cyan:#22d3ee;

      --radius: 22px;
      --shadow: 0 0 0 1px rgba(148,163,184,.12), 0 18px 60px rgba(0,0,0,.60);
      --glow: 0 0 22px rgba(34,211,238,.14), 0 0 70px rgba(56,189,248,.10);
    }

    *{box-sizing:border-box}
    html,body{height:100%}

    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      color:var(--txt);
      background:
        radial-gradient(1200px 650px at 18% 10%, rgba(56,189,248,.10), transparent 55%),
        radial-gradient(900px 700px at 82% 18%, rgba(34,211,238,.08), transparent 60%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }

    .stars:before, .stars:after{
      content:"";
      position:fixed; inset:0;
      pointer-events:none;
      background-image:
        radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,.40), transparent 55%),
        radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,.28), transparent 55%),
        radial-gradient(1px 1px at 55% 38%, rgba(255,255,255,.25), transparent 55%),
        radial-gradient(1px 1px at 76% 82%, rgba(255,255,255,.22), transparent 55%),
        radial-gradient(1px 1px at 91% 14%, rgba(255,255,255,.30), transparent 55%),
        radial-gradient(1px 1px at 45% 90%, rgba(255,255,255,.18), transparent 55%);
      opacity:.22;
    }
    .stars:after{filter: blur(.6px); opacity:.14; transform:scale(1.06)}

    .wrap{
      max-width: 980px;
      margin: 64px auto;
      padding: 0 16px;
    }

    .brand{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:12px;
      margin-bottom: 10px;
    }
    .logo{
      width:44px;height:44px;
      border-radius:14px;
      background:
        radial-gradient(18px 18px at 30% 30%, rgba(255,255,255,.14), transparent 55%),
        linear-gradient(135deg, rgba(56,189,248,.85), rgba(34,211,238,.55));
      box-shadow: 0 0 26px rgba(56,189,248,.16), 0 0 56px rgba(34,211,238,.10);
      position:relative;
    }
    .logo:after{
      content:"✦";
      position:absolute; inset:0;
      display:grid; place-items:center;
      font-weight:900;
      color: rgba(255,255,255,.92);
      text-shadow: 0 0 14px rgba(255,255,255,.16);
    }

    h1{
      margin: 0;
      text-align:center;
      font-size: 36px;
      letter-spacing:.2px;
      color: #eaf2ff;
      text-shadow: 0 0 18px rgba(34,211,238,.12);
    }

    .sub{
      margin: 10px 0 16px;
      text-align:center;
      color: var(--muted);
      font-size: 14px;
      line-height: 1.55;
    }
    .sub b{color:#ffffff}

    .topnav{
      display:flex;
      justify-content:center;
      gap:10px;
      margin: 10px 0 22px;
      flex-wrap:wrap;
    }
    .navlink{
      text-decoration:none;
      color: var(--txt);
      border: 1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.03);
      padding: 10px 14px;
      border-radius: 999px;
      font-weight: 800;
      font-size: 13px;
      transition: transform .12s ease, border-color .12s ease, filter .12s ease;
      box-shadow: 0 0 0 1px rgba(34,211,238,.06) inset;
    }
    .navlink:active{ transform: translateY(0); }
    .navlink:hover{
      border-color: rgba(34,211,238,.28);
      transform: translateY(-1px);
      filter: brightness(1.04);
    }

    .panel{
      border-radius: var(--radius);
      background: var(--card);
      border: 1px solid var(--stroke);
      box-shadow: var(--shadow), var(--glow);
      position:relative;
      overflow:hidden;
      backdrop-filter: blur(10px);
    }
    .panel:before{
      content:"";
      position:absolute; inset:-2px;
      background: linear-gradient(90deg, rgba(56,189,248,.10), rgba(34,211,238,.08), rgba(255,255,255,.02));
      filter: blur(20px);
      opacity:.55;
      pointer-events:none;
    }
    .inner{position:relative; padding:18px}

    .grid{
      display:grid;
      grid-template-columns: 1.35fr .85fr;
      gap:14px;
    }
    @media (max-width:860px){
      .grid{grid-template-columns:1fr}
    }

    .field{
      background: rgba(0,0,0,.18);
      border:1px solid rgba(148,163,184,.14);
      border-radius:18px;
      padding:12px;
      box-shadow: 0 0 0 1px rgba(34,211,238,.06) inset;
    }
    .label{
      font-size:12px;
      color:var(--muted);
      margin-bottom:8px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
    }

    input[type="text"], input[type="number"]{
      width:100%;
      padding:12px 12px;
      font-size:15px;
      border-radius:14px;
      border:1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.04);
      color:var(--txt);
      outline:none;
      box-shadow: 0 0 0 1px rgba(148,163,184,.06);
    }
    input:focus{
      border-color: rgba(34,211,238,.42);
      box-shadow: 0 0 0 3px rgba(34,211,238,.14), 0 0 22px rgba(56,189,248,.10);
    }

    .sectionTitle{
      margin-top:14px;
      color:var(--muted);
      font-size:12px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
    }

    .modes{
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap:12px;
      margin-top:10px;
    }
    @media (max-width:860px){
      .modes{grid-template-columns:1fr}
    }

    .mode{
      padding:14px 14px;
      border-radius:18px;
      border:1px solid rgba(148,163,184,.12);
      background: rgba(255,255,255,.03);
      cursor:pointer;
      position:relative;
      min-height:74px;
      transition: transform .12s ease, border-color .12s ease;
    }
    .mode:hover{
      border-color: rgba(34,211,238,.25);
      transform: translateY(-1px);
    }
    .mode.active{
      border-color: rgba(34,211,238,.42);
      box-shadow: 0 0 0 1px rgba(34,211,238,.10), 0 0 24px rgba(34,211,238,.10);
      background: rgba(34,211,238,.06);
    }
    .mode .title{
      font-weight:900;
      font-size:14px;
      display:flex; gap:10px; align-items:center;
    }
    .radio{
      width:14px; height:14px; border-radius:50%;
      border:2px solid rgba(170,182,207,.75);
      box-shadow: 0 0 0 2px rgba(0,0,0,.25) inset;
      position:relative;
      flex:0 0 auto;
    }
    .mode.active .radio{border-color: rgba(34,211,238,.85)}
    .mode.active .radio:after{
      content:""; position:absolute; inset:3px;
      border-radius:50%;
      background: linear-gradient(180deg, var(--accent), var(--cyan));
      box-shadow: 0 0 12px rgba(34,211,238,.18);
    }
    .mode .desc{
      margin-top:6px;
      color:var(--muted);
      font-size:12px;
      line-height:1.25;
    }

    .ctaRow{
      display:flex;
      gap:12px;
      margin-top:14px;
      align-items:stretch;
      flex-wrap:wrap;
    }
    .cta{
      flex: 1 1 260px;
      padding:14px 16px;
      border-radius:18px;
      border:1px solid rgba(34,211,238,.35);
      background: linear-gradient(90deg, rgba(56,189,248,.16), rgba(34,211,238,.12));
      color:var(--txt);
      font-size:15px;
      font-weight:900;
      cursor:pointer;
      box-shadow: 0 0 28px rgba(34,211,238,.10);
      display:flex; align-items:center; justify-content:center; gap:10px;
      transition: transform .12s ease, filter .12s ease;
    }
    .cta:hover{filter: brightness(1.06); transform: translateY(-1px)}
    .cta:active{transform: translateY(0px)}
    .cta.pulse{ animation: pulse 520ms ease-out; }
    @keyframes pulse{
      0%{transform: translateY(0); box-shadow: 0 0 0 rgba(34,211,238,.0)}
      40%{transform: translateY(-1px); box-shadow: 0 0 30px rgba(34,211,238,.18)}
      100%{transform: translateY(0); box-shadow: 0 0 28px rgba(34,211,238,.10)}
    }

    .ghost{
      flex: 0 0 auto;
      padding:14px 14px;
      border-radius:18px;
      border:1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.04);
      color:var(--txt);
      cursor:pointer;
      font-weight:900;
      font-size:14px;
    }
    .ghost:hover{border-color: rgba(34,211,238,.22)}

    .hint{
      margin-top:14px;
      padding:12px 14px;
      border-radius:18px;
      border:1px solid rgba(56,189,248,.16);
      background: rgba(56,189,248,.06);
      color: #d8f0ff;
      font-size:12.5px;
      line-height:1.45;
    }

    .out{
      margin-top:14px;
      padding:14px;
      border-radius:18px;
      border:1px solid rgba(148,163,184,.10);
      background: rgba(0,0,0,.16);
    }
    .outHead{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:12px;
      margin-bottom:10px;
      flex-wrap:wrap;
    }
    .outHead .t{font-weight:900}
    .outHead .m{color:var(--muted); font-size:12px; margin-top:4px}

    .mini{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
    }
    .btnMini{
      padding:9px 11px;
      border-radius:14px;
      border:1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.04);
      color:var(--txt);
      cursor:pointer;
      font-size:12.5px;
      font-weight:900;
      transition: transform .12s ease, border-color .12s ease;
    }
    .btnMini:hover{border-color: rgba(34,211,238,.22); transform: translateY(-1px)}
    .btnMini:active{transform: translateY(0px)}

    .list{
      margin:0; padding:0; list-style:none;
      max-height: 280px;
      overflow:auto;
      border-radius:14px;
      border:1px solid rgba(148,163,184,.10);
    }
    .list li{
      padding:10px 12px;
      border-bottom:1px solid rgba(148,163,184,.08);
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      font-size:13px;
      color:#eaf2ff;
    }
    .list li:last-child{border-bottom:none}

    .copy{
      padding:7px 10px;
      border-radius:12px;
      border:1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.03);
      color:var(--muted);
      cursor:pointer;
      font-size:12px;
      font-weight:900;
      white-space:nowrap;
      transition: transform .12s ease, border-color .12s ease, filter .12s ease;
    }
    .copy:hover{border-color: rgba(34,211,238,.22); color: var(--txt); transform: translateY(-1px)}
    .copy:active{transform: translateY(0px)}
    .copy.pop{ animation: pop 360ms ease-out; }
    @keyframes pop{
      0%{transform: translateY(0) scale(1)}
      35%{transform: translateY(-1px) scale(1.04)}
      100%{transform: translateY(0) scale(1)}
    }

    footer{
      text-align:center;
      color: rgba(170,182,207,.72);
      font-size:11.5px;
      margin-top:14px;
      opacity:.95;
    }

    .toast{
      position:fixed;
      left:50%;
      bottom:18px;
      transform:translateX(-50%) translateY(10px);
      background: rgba(15, 23, 42, .92);
      border:1px solid rgba(34,211,238,.22);
      box-shadow: 0 0 20px rgba(34,211,238,.12);
      color:var(--txt);
      padding:10px 12px;
      border-radius:14px;
      font-size:13px;
      font-weight:900;
      opacity:0;
      pointer-events:none;
      transition: opacity .18s ease, transform .18s ease;
      display:flex;
      align-items:center;
      gap:10px;
      min-width: 220px;
      justify-content: center;
      z-index: 60;
    }
    .toast.show{
      opacity:1;
      transform:translateX(-50%) translateY(0);
    }
    .toast .dot{
      width:8px; height:8px; border-radius:999px;
      background: var(--cyan);
      box-shadow: 0 0 14px rgba(34,211,238,.35);
    }

    .list::-webkit-scrollbar{width:10px}
    .list::-webkit-scrollbar-thumb{
      background: rgba(148,163,184,.18);
      border-radius: 999px;
      border: 2px solid rgba(15, 23, 42, .60);
    }
    .list::-webkit-scrollbar-thumb:hover{
      background: rgba(34,211,238,.18);
    }

    .modalBack{
      position:fixed; inset:0;
      background: rgba(0,0,0,.55);
      display:none;
      align-items:center;
      justify-content:center;
      padding: 16px;
      z-index: 50;
    }
    .modal{
      width: min(760px, 100%);
      border-radius: 18px;
      background: rgba(15, 23, 42, .96);
      border: 1px solid rgba(148,163,184,.14);
      box-shadow: 0 18px 70px rgba(0,0,0,.65);
      padding: 16px;
    }
    .modal h3{margin:6px 0 8px; font-size:16px}
    .modal p{margin: 8px 0; color: var(--muted); line-height:1.55; font-size: 13.5px}
    .modal ul{margin:10px 0 0; padding-left: 18px; color: var(--muted); font-size: 13.5px; line-height:1.55}
    .modalTop{
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      margin-bottom: 8px;
    }
    .xbtn{
      border:1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.04);
      color: var(--txt);
      border-radius: 12px;
      padding: 8px 10px;
      cursor:pointer;
      font-weight: 900;
    }
    .xbtn:hover{border-color: rgba(34,211,238,.22)}
    .kbd{
      display:inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      border:1px solid rgba(148,163,184,.14);
      background: rgba(255,255,255,.04);
      color: var(--txt);
      font-weight: 900;
      font-size: 12px;
    }
  </style>
</head>

<body>
  <div class="stars"></div>

  <div class="wrap">
    <div class="brand">
      <div class="logo" aria-hidden="true"></div>
    </div>

    <h1>Alias Üretim Paneli</h1>

    <nav class="topnav" aria-label="Kısayollar">
      <a class="navlink" href="https://discord.com/users/816990858515709962" target="_blank" rel="noopener">Discord Profilim</a>
      <a class="navlink" href="#" id="helpBtn">Kılavuz</a>
    </nav>

    <p class="sub">
      Gmail için <b>+tag</b> ve <b>nokta</b> varyasyonlarını hızlıca üret.<br/>
      <span style="opacity:.9">Giriş yok • Şifre yok • Mail göndermez • Sadece liste üretir</span>
    </p>

    <section class="panel">
      <div class="inner">

        <div class="grid">
          <div class="field">
            <div class="label">
              <span>Gmail Adresi</span>
              <small>Sadece <b>gmail.com</b></small>
            </div>
            <input id="email" type="text" placeholder="ornek@gmail.com" value="denemeyet@gmail.com" />
          </div>

          <div class="field">
            <div class="label">
              <span>Üretilecek Adet</span>
              <small>1–200</small>
            </div>
            <input id="count" type="number" min="1" max="200" value="10" />
          </div>
        </div>

        <div class="sectionTitle">
          <span>Varyasyon Modu</span>
          <span style="font-size:12px; color:var(--muted)">Tek tıkla seç</span>
        </div>

        <div class="modes" id="modes">
          <div class="mode active" data-mode="plus">
            <div class="title"><span class="radio"></span> +tag</div>
            <div class="desc">local+1, local+2… (hızlı ve düzenli)</div>
          </div>
          <div class="mode" data-mode="dot">
            <div class="title"><span class="radio"></span> Nokta</div>
            <div class="desc">lo.cal / l.o.c.a.l (Gmail noktayı yok sayar)</div>
          </div>
          <div class="mode" data-mode="dotplus">
            <div class="title"><span class="radio"></span> Karma</div>
            <div class="desc">Nokta + tag birleşik (maksimum çeşit)</div>
          </div>
        </div>

        <div class="ctaRow">
          <button class="cta" id="genBtn" type="button">⚡ Aliasları Üret</button>
          <button class="ghost" id="resetBtn" type="button">Sıfırla</button>
        </div>

        <div class="hint">
          <b>Bilgi:</b> Gmail’de <b>nokta</b> ve <b>+tag</b> varyasyonları genelde aynı inbox’a düşer.
          Bu panel <b>yalnızca</b> alias listesi üretir (demo amaçlı).
        </div>

        <div class="out" id="outBox" style="display:none">
          <div class="outHead">
            <div>
              <div class="t">Üretilen Aliaslar</div>
              <div class="m" id="outMeta">—</div>
            </div>
            <div class="mini">
              <button class="btnMini" id="copyAll" type="button">Tümünü Kopyala</button>
              <button class="btnMini" id="downloadTxt" type="button">TXT İndir</button>
              <button class="btnMini" id="clear" type="button">Temizle</button>
            </div>
          </div>
          <ul class="list" id="list"></ul>
        </div>

        <footer>
          BRDN • Demo Panel • İletişim:
          <a href="https://discord.com/users/816990858515709962" target="_blank" rel="noopener" style="color: var(--cyan); text-decoration:none; font-weight:900;">
            Discord Profilim
          </a>
        </footer>

      </div>
    </section>
  </div>

  <div class="toast" id="toast"><span class="dot"></span><span id="toastText">Kopyalandı ✅</span></div>

  <div class="modalBack" id="modalBack" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal">
      <div class="modalTop">
        <h3 id="modalTitle">Kılavuz</h3>
        <button class="xbtn" id="closeModal" type="button">Kapat</button>
      </div>
      <p>Bu panel Gmail alias’larını <b>liste</b> şeklinde üretir.</p>
      <ul>
        <li><b>+tag</b>: Ör: <span class="kbd">local+1@gmail.com</span></li>
        <li><b>Nokta</b>: Ör: <span class="kbd">lo.cal@gmail.com</span></li>
        <li><b>Karma</b>: Ör: <span class="kbd">lo.cal+1@gmail.com</span></li>
      </ul>
      <p>Tek satır kopyalamak için listeden <span class="kbd">Kopyala</span> butonunu kullan.</p>
    </div>
  </div>

  <script>
    const emailEl = document.getElementById('email');
    const countEl = document.getElementById('count');
    const modesEl = document.getElementById('modes');
    const genBtn = document.getElementById('genBtn');
    const resetBtn = document.getElementById('resetBtn');
    const outBox = document.getElementById('outBox');
    const outMeta = document.getElementById('outMeta');
    const listEl = document.getElementById('list');
    const copyAllBtn = document.getElementById('copyAll');
    const clearBtn = document.getElementById('clear');
    const downloadTxtBtn = document.getElementById('downloadTxt');

    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');

    const helpBtn = document.getElementById('helpBtn');
    const modalBack = document.getElementById('modalBack');
    const closeModal = document.getElementById('closeModal');

    let mode = 'plus';

    function showToast(msg){
      toastText.textContent = msg;
      toast.classList.add('show');
      setTimeout(()=> toast.classList.remove('show'), 1200);
    }

    function pulseBtn(btn){
      btn.classList.remove('pulse');
      void btn.offsetWidth;
      btn.classList.add('pulse');
      setTimeout(()=> btn.classList.remove('pulse'), 600);
    }

    modesEl.addEventListener('click', (e)=>{
      const card = e.target.closest('.mode');
      if(!card) return;
      mode = card.dataset.mode;
      [...modesEl.querySelectorAll('.mode')].forEach(x=>x.classList.remove('active'));
      card.classList.add('active');
      showToast("Mod seçildi ✅");
    });

    function parseGmail(addr){
      const a = (addr || '').trim();
      const m = a.match(/^([^@]+)@gmail\.com$/i);
      if(!m) return null;
      const local = m[1];
      const normalized = local.replace(/\./g,'');
      return { local: normalized, domain: 'gmail.com' };
    }

    function dotVariants(local, limit){
      const chars = local.split('');
      const n = chars.length;
      if(n <= 1) return [local];
      const maxMasks = 1 << (n - 1);
      const out = [];
      for(let mask = 0; mask < maxMasks && out.length < limit; mask++){
        let s = chars[0];
        for(let i=0;i<n-1;i++){
          if(mask & (1<<i)) s += '.';
          s += chars[i+1];
        }
        out.push(s);
      }
      return out;
    }

    function uniq(arr){
      const seen = new Set();
      const out = [];
      for(const x of arr){
        if(!seen.has(x)){
          seen.add(x);
          out.push(x);
        }
      }
      return out;
    }

    function makePlus(local, count){
      const out = [];
      for(let i=1;i<=count;i++){
        out.push(`${local}+${i}@gmail.com`);
      }
      return out;
    }

    function makeDot(local, count){
      const dots = dotVariants(local, Math.min(4096, count*6));
      const picked = dots.slice(0, count).map(v => `${v}@gmail.com`);
      return uniq(picked).slice(0, count);
    }

    function makeDotPlus(local, count){
      const baseDots = dotVariants(local, Math.min(4096, count*6));
      const out = [];
      let tag = 1;
      for(let i=0;i<baseDots.length && out.length < count;i++){
        out.push(`${baseDots[i]}+${tag}@gmail.com`);
        tag++;
      }
      return uniq(out).slice(0, count);
    }

    function modeLabel(m){
      if(m === 'plus') return '+tag';
      if(m === 'dot') return 'nokta';
      return 'karma';
    }

    function render(items){
      listEl.innerHTML = '';
      items.forEach((item)=>{
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;

        const btn = document.createElement('button');
        btn.className = 'copy';
        btn.type = 'button';
        btn.textContent = 'Kopyala';
        btn.addEventListener('click', async ()=>{
          btn.classList.add('pop');
          setTimeout(()=>btn.classList.remove('pop'), 380);

          try{
            await navigator.clipboard.writeText(item);
            showToast('Kopyalandı ✅');
          }catch{
            showToast('Kopyalanamadı ❌');
          }
        });

        li.appendChild(span);
        li.appendChild(btn);
        listEl.appendChild(li);
      });
    }

    genBtn.addEventListener('click', ()=>{
      pulseBtn(genBtn);

      const parsed = parseGmail(emailEl.value);
      if(!parsed){
        showToast('Sadece gmail.com gir: ornek@gmail.com');
        emailEl.focus();
        return;
      }

      let count = Number(countEl.value || 0);
      count = Math.max(1, Math.min(200, count));
      countEl.value = String(count);

      let items = [];
      if(mode === 'plus') items = makePlus(parsed.local, count);
      if(mode === 'dot') items = makeDot(parsed.local, count);
      if(mode === 'dotplus') items = makeDotPlus(parsed.local, count);

      outBox.style.display = 'block';
      outMeta.textContent = `${items.length} adet • Mod: ${modeLabel(mode)} • ${parsed.local}@gmail.com`;
      render(items);

      outBox.dataset.items = JSON.stringify(items);
      showToast('Liste hazır ✅');
    });

    copyAllBtn.addEventListener('click', async ()=>{
      const items = JSON.parse(outBox.dataset.items || "[]");
      if(!items.length){ showToast('Liste boş'); return; }

      copyAllBtn.classList.add('pop');
      setTimeout(()=>copyAllBtn.classList.remove('pop'), 380);

      try{
        await navigator.clipboard.writeText(items.join('\n'));
        showToast('Tümü kopyalandı ✅');
      }catch{
        showToast('Kopyalanamadı ❌');
      }
    });

    downloadTxtBtn.addEventListener('click', ()=>{
      const items = JSON.parse(outBox.dataset.items || "[]");
      if(!items.length){ showToast('Liste boş'); return; }
      const blob = new Blob([items.join('\n')], {type: 'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'aliaslar.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('TXT indirildi ✅');
    });

    clearBtn.addEventListener('click', ()=>{
      outBox.style.display = 'none';
      listEl.innerHTML = '';
      outBox.dataset.items = "[]";
      showToast('Temizlendi');
    });

    resetBtn.addEventListener('click', ()=>{
      emailEl.value = 'denemeyet@gmail.com';
      countEl.value = '10';
      mode = 'plus';
      [...modesEl.querySelectorAll('.mode')].forEach(x=>x.classList.remove('active'));
      modesEl.querySelector('.mode[data-mode="plus"]').classList.add('active');
      outBox.style.display = 'none';
      listEl.innerHTML = '';
      outBox.dataset.items = "[]";
      showToast('Sıfırlandı ✅');
    });

    helpBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      modalBack.style.display = 'flex';
    });
    closeModal.addEventListener('click', ()=> modalBack.style.display = 'none');
    modalBack.addEventListener('click', (e)=>{
      if(e.target === modalBack) modalBack.style.display = 'none';
    });
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') modalBack.style.display = 'none';
    });
  </script>
</body>
</html>


    `}} />
  );
}