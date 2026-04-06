"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'Jakie formaty plików obsługujecie?',         a: 'Głównie pliki binarne STL (najbardziej popularne w druku 3D). Planujemy wsparcie dla OBJ i 3MF w kolejnych wersjach platformy.' },
  { q: 'Jak dokładna jest wycena automatyczna?',     a: 'Algorytm liczy dokładną objętość z siatki triangulacyjnej, co daje błąd poniżej 2% względem wyceny ręcznej. Wystarczający do każdego zamówienia produkcyjnego.' },
  { q: 'Ile trwa realizacja zamówienia?',             a: 'Standardowe modele z PLA/PETG realizujemy w 24h robocze. Większe serie lub złożone kształty — 48–72h. Dostawę liczymy osobno.' },
  { q: 'Czy mogę zamówić wiele sztuk tego samego?',  a: 'Tak. Kalkulator uwzględnia ilość sztuk przy przeliczaniu ceny. Przy seriach powyżej 10 szt. automatycznie nalicza rabat materiałowy.' },
  { q: 'Czy oferujecie obróbkę powierzchni?',         a: 'Tak — wygładzanie, lakierowanie, malowanie proszkowe i anodowanie dla ABS/PETG. Opcje dostępne w formularzu zamówienia po wycenie.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', textAlign: 'left', gap: '1rem',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      >
        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{q}</span>
        <ChevronDown size={18} style={{
          color: 'var(--accent)', flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease',
        }} />
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>{a}</div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section id="faq" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem', background: 'var(--bg)' }}>
      <div className="container" style={{ padding: 0, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
        <div>
          <div className="section-marker">
            <div className="section-marker-line" />
            <span className="label-tag">Pytania i odpowiedzi</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            FAQ
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Nie znalazłeś odpowiedzi? Napisz do nas — odpowiadamy w ciągu godziny.
          </p>
          <a href="mailto:kontakt@3dgen.pl" className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.75rem 1.25rem' }}>
            Napisz do nas →
          </a>
        </div>

        <div style={{ border: '1px solid var(--border)' }}>
          {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </div>
    </section>
  );
}
