export const metadata = {
  title: 'Mouka Streaming — Animés, Séries & Films',
  description: 'Regardez tous vos animés, séries et films. Créé par Zylva Labs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          body { background:#0a0a0f; color:#fff; font-family:'Inter',sans-serif; }
          ::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:#0a0a0f}
          ::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px}
          .gradient-text{background:linear-gradient(135deg,#7c3aed,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
          .glass{background:rgba(20,20,28,.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.05)}
          .card-hover{transition:all .3s ease}
          .card-hover:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 20px 40px rgba(124,58,237,.3)}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
    }
