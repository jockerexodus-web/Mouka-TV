'use client';
import { useState } from 'react';

/* ============ DONNÉES DE DÉMO ============ */
const CATALOG = [
  // ANIMÉS
  { id:'a1', title:'Demon Slayer', type:'anime', year:2024, rating:8.7, genres:['Action','Fantastique'], img:'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg', synopsis:"Tanjiro Kamado part en quête pour venger sa famille et guérir sa sœur transformée en démon." },
  { id:'a2', title:'Jujutsu Kaisen', type:'anime', year:2023, rating:8.6, genres:['Action','Surnaturel'], img:'https://image.tmdb.org/t/p/w500/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg', synopsis:"Yuji Itadori avale un doigt maudit et intègre une école de sorcellerie pour combattre les fléaux." },
  { id:'a3', title:'One Piece', type:'anime', year:2024, rating:9.0, genres:['Aventure','Comédie'], img:'https://image.tmdb.org/t/p/w500/fcPUJgsWQ5i37k3mL7mzNoZQLQF.jpg', synopsis:"Luffy et son équipage cherchent le trésor légendaire du One Piece pour devenir Roi des Pirates." },
  { id:'a4', title:'Attack on Titan', type:'anime', year:2023, rating:9.2, genres:['Action','Drame'], img:'https://image.tmdb.org/t/p/w500/hgKJcB6zVCrKvSxr5uxYQrFmPjP.jpg', synopsis:"L'humanité se bat pour sa survie contre des géants mangeurs d'hommes." },
  { id:'a5', title:'Chainsaw Man', type:'anime', year:2022, rating:8.5, genres:['Action','Horreur'], img:'https://image.tmdb.org/t/p/w500/npdB6tgm6iG7eH5m1q4C1Lp5aFN.jpg', synopsis:"Denji fusionne avec son chien-démon tronçonneuse pour devenir un chasseur de démons." },

  // SÉRIES
  { id:'s1', title:'Stranger Things', type:'serie', year:2022, rating:8.7, genres:['Sci-Fi','Horreur'], img:'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', synopsis:"Des enfants affrontent des forces surnaturelles dans les années 80 à Hawkins." },
  { id:'s2', title:'Breaking Bad', type:'serie', year:2013, rating:9.5, genres:['Drame','Crime'], img:'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', synopsis:"Un prof de chimie devient fabricant de méthamphétamine après un diagnostic fatal." },
  { id:'s3', title:'The Witcher', type:'serie', year:2023, rating:7.9, genres:['Fantastique','Aventure'], img:'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg', synopsis:"Geralt de Riv, chasseur de monstres, cherche sa place dans un monde hostile." },
  { id:'s4', title:'Money Heist', type:'serie', year:2021, rating:8.3, genres:['Thriller','Crime'], img:'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg', synopsis:"Le Professeur orchestre le braquage le plus audacieux de l'histoire d'Espagne." },

  // FILMS
  { id:'f1', title:'Dune: Part Two', type:'film', year:2024, rating:8.5, genres:['Sci-Fi','Aventure'], img:'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', synopsis:"Paul Atréides s'unit aux Fremen pour se venger des conspirateurs." },
  { id:'f2', title:'Oppenheimer', type:'film', year:2023, rating:8.4, genres:['Drame','Histoire'], img:'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', synopsis:"L'histoire du créateur de la bombe atomique." },
  { id:'f3', title:'Interstellar', type:'film', year:2014, rating:8.7, genres:['Sci-Fi','Drame'], img:'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', synopsis:"Des explorateurs traversent un trou de ver pour sauver l'humanité." },
  { id:'f4', title:'Spider-Man: No Way Home', type:'film', year:2021, rating:8.3, genres:['Action','Aventure'], img:'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', synopsis:"Peter Parker fait face aux conséquences de la révélation de son identité." },
  { id:'f5', title:'The Batman', type:'film', year:2022, rating:7.8, genres:['Action','Crime'], img:'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', synopsis:"Batman traque le Riddler à Gotham City." },
];

const LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>";

/* ============ ICÔNES SVG INLINE ============ */
const Icon = ({ name, size = 18, className = "" }) => {
  const paths = {
    search: <path d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>,
    play: <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>,
    menu: <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>,
    close: <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>,
    back: <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    film: <><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M7 3v18M17 3v18M2 9h5M2 15h5M17 9h5M17 15h5" stroke="currentColor" strokeWidth="2"/></>,
    tv: <><rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M17 2l-5 5-5-5" stroke="currentColor" strokeWidth="2" fill="none"/></>,
    sparkle: <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" className={className}>{paths[name]}</svg>;
};

/* ============ NAVBAR ============ */
function Navbar({ page, setPage, search, setSearch }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id:'home', label:'Accueil' },
    { id:'anime', label:'Animés' },
    { id:'serie', label:'Séries' },
    { id:'film', label:'Films' },
  ];
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={() => setPage('home')} className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg" style={{background:'linear-gradient(135deg,#7c3aed,#ec4899)'}}>M</div>
          <div className="hidden sm:block">
            <div className="font-black text-lg leading-none gradient-text">MOUKA</div>
            <div className="text-[10px] text-gray-400 tracking-widest">STREAMING</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)}
              className={`text-sm font-medium transition ${page===l.id ? 'gradient-text' : 'text-gray-300 hover:text-white'}`}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex-1 max-w-xs hidden sm:block">
          <div className="relative">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-500 transition"/>
          </div>
        </div>

        <button onClick={()=>setOpen(!open)} className="md:hidden text-white">
          <Icon name={open?'close':'menu'} size={22}/>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-2 border-t border-white/10">
          {links.map(l => (
            <button key={l.id} onClick={()=>{setPage(l.id);setOpen(false)}}
              className={`text-left py-2 text-sm ${page===l.id?'gradient-text':'text-gray-300'}`}>
              {l.label}
            </button>
          ))}
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Rechercher..." className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none"/>
        </div>
      )}
    </nav>
  );
}

/* ============ CARTE ============ */
function Card({ item, onClick }) {
  return (
    <button onClick={onClick} className="card-hover group text-left rounded-xl overflow-hidden bg-[#14141c] border border-white/5">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-xs font-bold flex items-center gap-1">
          <Icon name="star" size={11} className="text-yellow-400"/> {item.rating}
        </div>
        <div className="absolute bottom-0 p-3 w-full">
          <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.title}</h3>
          <p className="text-[11px] text-gray-400 mt-1">{item.year} · {item.genres[0]}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{background:'linear-gradient(135deg,#7c3aed,#ec4899)'}}>
            <Icon name="play" size={20} className="text-white ml-1"/>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ============ HERO ============ */
function Hero({ item, onPlay }) {
  if (!item) return null;
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0" style={{background:'linear-gradient(to top, #0a0a0f 10%, rgba(10,10,15,.7) 50%, rgba(10,10,15,.4) 100%)'}}/>
      <div className="absolute inset-0" style={{background:'linear-gradient(to right, #0a0a0f 0%, rgba(10,10,15,.5) 50%, transparent 100%)'}}/>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-end pb-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold mb-4">
            <Icon name="sparkle" size={12} className="text-purple-400"/> À la une
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{item.title}</h1>
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="flex items-center gap-1 text-yellow-400 font-bold"><Icon name="star" size={14}/>{item.rating}</span>
            <span className="text-gray-400">{item.year}</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-xs uppercase">{item.type}</span>
            <span className="text-gray-400 hidden sm:inline">{item.genres.join(' · ')}</span>
          </div>
          <p className="text-gray-300 mb-6 line-clamp-3">{item.synopsis}</p>
          <div className="flex gap-3">
            <button onClick={()=>onPlay(item)} className="px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition" style={{background:'linear-gradient(135deg,#7c3aed,#ec4899)'}}>
              <Icon name="play" size={18}/> Lecture
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION LIGNE ============ */
function Row({ title, items, onSelect, icon }) {
  if (!items.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-5">
        {icon && <Icon name={icon} size={20} className="text-purple-400"/>}
        <h2 className="text-xl md:text-2xl font-black">{title}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/40 to-transparent ml-3"/>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map(it => <Card key={it.id} item={it} onClick={()=>onSelect(it)}/>)}
      </div>
    </section>
  );
}

/* ============ PAGE DÉTAIL / LECTEUR ============ */
function WatchPage({ item, onBack }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition">
          <Icon name="back" size={18}/> Retour
        </button>

        <div className="rounded-2xl overflow-hidden glass aspect-video flex items-center justify-center relative mb-6">
          <div className="absolute inset-0 opacity-20"><img src={item.img} className="w-full h-full object-cover" alt=""/></div>
          <div className="relative text-center p-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{background:'linear-gradient(135deg,#7c3aed,#ec4899)'}}>
              <Icon name="play" size={32} className="text-white ml-1"/>
            </div>
            <h2 className="text-2xl font-black mb-2">Lecteur vidéo</h2>
            <p className="text-gray-400 text-sm max-w-md">
              Intègre ici ton player (iframe, HLS.js, vidéo MP4 ou ton API légale).
              Ex : <code className="text-purple-300">&lt;iframe src="..." /&gt;</code>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <img src={item.img} className="w-full md:w-48 rounded-xl" alt={item.title}/>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black mb-3">{item.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span className="flex items-center gap-1 text-yellow-400 font-bold"><Icon name="star" size={14}/>{item.rating}</span>
              <span className="text-gray-400">{item.year}</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-xs uppercase">{item.type}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.genres.map(g => <span key={g} className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs">{g}</span>)}
            </div>
            <p className="text-gray-300 leading-relaxed">{item.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 py-8 text-center text-sm text-gray-500">
      <div className="mb-2 flex items-center justify-center gap-2">
        <div className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs" style={{background:'linear-gradient(135deg,#7c3aed,#ec4899)'}}>M</div>
        <span className="font-bold gradient-text">MOUKA STREAMING</span>
      </div>
      <p>© {new Date().getFullYear()} — Créé par <span className="text-purple-400 font-semibold">Zylva Labs</span></p>
      <p className="text-xs mt-2 opacity-60">Démo UI — intégrer une API légale pour du contenu réel.</p>
    </footer>
  );
}

/* ============ PAGE PRINCIPALE ============ */
export default function Page() {
  const [page, setPage] = useState('home');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = CATALOG.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.genres.some(g => g.toLowerCase().includes(search.toLowerCase()))
  );

  const onSelect = (it) => { setSelected(it); window.scrollTo({top:0,behavior:'smooth'}); };
  const onBack = () => setSelected(null);

  let content;
  if (selected) {
    content = <WatchPage item={selected} onBack={onBack}/>;
  } else if (search) {
    content = <Row title={`Résultats (${filtered.length})`} items={filtered} onSelect={onSelect} icon="search"/>;
  } else if (page === 'home') {
    content = (
      <>
        <Hero item={CATALOG[0]} onPlay={onSelect}/>
        <Row title="Tendances Animés" items={CATALOG.filter(i=>i.type==='anime')} onSelect={onSelect} icon="sparkle"/>
        <Row title="Séries populaires" items={CATALOG.filter(i=>i.type==='serie')} onSelect={onSelect} icon="tv"/>
        <Row title="Films à voir" items={CATALOG.filter(i=>i.type==='film')} onSelect={onSelect} icon="film"/>
      </>
    );
  } else {
    const labels = { anime:'Animés', serie:'Séries', film:'Films' };
    content = <Row title={labels[page] || page} items={CATALOG.filter(i=>i.type===page)} onSelect={onSelect} icon={page==='anime'?'sparkle':page==='serie'?'tv':'film'}/>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar page={page} setPage={(p)=>{setPage(p);setSelected(null);setSearch('');}} search={search} setSearch={setSearch}/>
      <main className="flex-1">{content}</main>
      <Footer/>
    </div>
  );
}
