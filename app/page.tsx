"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, Box, Cpu, Printer, Settings, Layers, Zap,
  ShieldCheck, Atom, ChevronDown, Star, CheckCircle2, Package2
} from 'lucide-react';

/* ─── Intersection Observer Hook ──────────── */
function useReveal() {
  const ref = useRef<any>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          el.classList.add('visible'); 
          const children = el.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-rotate');
          children.forEach((c: Element) => c.classList.add('visible'));
          obs.disconnect(); 
        } 
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Data ────────────────────────────────── */
const STEPS = [
  { num: '01', icon: Box,      title: 'Import Modelu',     desc: 'Przeciągnij plik .STL na platformę. Akceptujemy modele do 50 MB.' },
  { num: '02', icon: Cpu,      title: 'Analiza Geometrii', desc: 'Algorytm oblicza objętość, wymiary i powierzchnię w czasie rzeczywistym.' },
  { num: '03', icon: Settings, title: 'Konfiguracja',       desc: 'Dobierz materiał, jakość warstwy i procent wypełnienia.' },
  { num: '04', icon: Printer,  title: 'Druk i Dostawa',    desc: 'Zatwierdzasz wycenę — realizacja w 24–48 h.' },
];

const STATS = [
  { value: '12 000+', label: 'Wydrukowanych modeli' },
  { value: '0.1 mm',  label: 'Tolerancja wymiarowa' },
  { value: '24h',     label: 'Czas realizacji' },
  { value: '5+',      label: 'Lat doświadczenia' },
];

const SPEC_ROWS = [
  { param: 'Technologia druku',     value: 'FDM / SLA / SLS' },
  { param: 'Rozdzielczość warstwy', value: '0.05 – 0.35 mm' },
  { param: 'Tolerancja',            value: '±0.1 mm' },
  { param: 'Maks. rozmiar wydruku', value: '300 × 300 × 400 mm' },
  { param: 'Obsługiwane formaty',   value: 'STL, OBJ, 3MF' },
  { param: 'Czas realizacji',       value: '24 – 72 h' },
  { param: 'Powierzchnia',          value: 'Surowa / Wygładzona / Malowana' },
  { param: 'Kolory',                value: '20+ standardowych + RAL na zamówienie' },
];

const TESTIMONIALS = [
  {
    name: 'Bartek W.',
    role: 'Inżynier mechanik',
    stars: 5,
    text: 'Wycena w 10 sekund, model gotowy następnego dnia. Nikt inny w Polsce nie oferuje takiej szybkości przy tej precyzji.',
  },
  {
    name: 'Marta K.',
    role: 'Designer produktu',
    stars: 5,
    text: 'Podgląd 3D w przeglądarce to game-changer. Widzę dokładnie jak model wygląda zanim go zamówię. Polecam wszystkim projektantom.',
  },
  {
    name: 'Piotr J.',
    role: 'Startup founder',
    stars: 5,
    text: 'Zamówiliśmy 200 sztuk prototypów PETG. Tolerancja idealna, opakowanie przemysłowe, faktura VAT od razu. Profesjonalizm na każdym etapie.',
  },
];

const FAQS = [
  { q: 'Jakie formaty plików obsługujecie?',         a: 'Głównie pliki binarne STL (najbardziej popularne w druku 3D). Planujemy wsparcie dla OBJ i 3MF w kolejnych wersjach platformy.' },
  { q: 'Jak dokładna jest wycena automatyczna?',     a: 'Algorytm liczy dokładną objętość z siatki triangulacyjnej, co daje błąd poniżej 2% względem wyceny ręcznej. Wystarczający do każdego zamówienia produkcyjnego.' },
  { q: 'Ile trwa realizacja zamówienia?',             a: 'Standardowe modele z PLA/PETG realizujemy w 24h robocze. Większe serie lub złożone kształty — 48–72h. Dostawę liczymy osobno.' },
  { q: 'Czy mogę zamówić wiele sztuk tego samego?',  a: 'Tak. Kalkulator uwzględnia ilość sztuk przy przeliczaniu ceny. Przy seriach powyżej 10 szt. automatycznie nalicza rabat materiałowy.' },
  { q: 'Czy oferujecie obróbkę powierzchni?',         a: 'Tak — wygładzanie, lakierowanie, malowanie proszkowe i anodowanie dla ABS/PETG. Opcje dostępne w formularzu zamówienia po wycenie.' },
];

/* ─── FAQ Accordion ──────────────────────── */
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

/* ─── Page ────────────────────────────────── */
export default function LandingPage() {
  const refHero     = useReveal();
  const refProcess  = useReveal();
  const refMat      = useReveal();
  const refSpec     = useReveal();
  const refTestimon = useReveal();
  const refFaq      = useReveal();
  const refCta      = useReveal();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ════ NAV ═══════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)',
          }}>
            <Box size={16} color="#000" />
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
            3D<span style={{ color: 'var(--accent)' }}>GEN</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {[['#proces', 'Proces'], ['#materialy', 'Materiały'], ['#specyfikacja', 'Spec'], ['#faq', 'FAQ']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', padding: '0.5rem 0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
              {label}
            </a>
          ))}
          <Link href="/wycena" className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '0.6rem 1.25rem', marginLeft: '0.75rem' }}>
            Wycena →
          </Link>
        </div>
      </nav>

      {/* ════ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={refHero} className="stack-section" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', padding: '4rem 2rem' }}>
        <div className="container" style={{ padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>
          <div>
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
              <span className="label-tag">Platforma wyceny druku 3D</span>
            </div>
            <h1 className="animate-fade-in delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Precyzyjna<br />wycena.<br />
              <span className="text-gradient">Natychmiastowo.</span>
            </h1>
            <p className="animate-fade-in delay-2" style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
              Wgraj model 3D, skonfiguruj parametry i uzyskaj dokładną wycenę w ciągu sekund.
              Zero mailowania, zero czekania.
            </p>
            <div className="animate-fade-in delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/wycena" className="btn btn-primary">
                Wyceń model <ArrowUpRight size={16} />
              </Link>
              <a href="#proces" className="btn btn-ghost">Jak to działa?</a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="animate-fade-in delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', border: '1px solid var(--border)' }}>
            {STATS.map(s => (
              <div key={s.value} style={{ background: 'var(--bg-2)', padding: '2rem', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '2.25rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1, marginBottom: '0.5rem' }}>{s.value}</div>
                <div className="label-tag">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PROCES ════════════════════════════════════════════════════════ */}
      <section id="proces" ref={refProcess} className="stack-section" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem' }}>
        <div className="container" style={{ padding: 0 }}>
          <div className="reveal-left" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-marker">
                <div className="section-marker-line" />
                <span className="label-tag">Jak to działa?</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                4 Kroki<br /><span className="text-gradient">do wyceny</span>
              </h2>
            </div>
            <Link href="/wycena" className="btn btn-ghost">
              Zacznij teraz <ArrowUpRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', border: '1px solid var(--border)' }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className={`reveal-up delay-${(i + 1)}00`} style={{
                  background: 'var(--bg-2)',
                  padding: '2.5rem 2rem',
                  borderRight: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                  position: 'relative',
                  transition: 'background 0.2s, opacity 0.7s, transform 0.7s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-2)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <Icon size={28} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'var(--text-dim)' }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ MATERIALY ═════════════════════════════════════════════════════ */}
      <section id="materialy" ref={refMat} className="stack-section" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem' }}>
        <div className="container" style={{ padding: 0 }}>
          <div className="reveal-scale" style={{ marginBottom: '4rem' }}>
            <div className="section-marker">
              <div className="section-marker-line" />
              <span className="label-tag">Baza produkcyjna</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Materiały,<br /><span className="text-gradient">którym ufamy</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)', gap: '1px', border: '1px solid var(--border)' }}>
            <div className="reveal-scale delay-100" style={{ gridColumn: 'span 2', gridRow: 'span 2', background: 'var(--bg-2)', padding: '3rem', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'opacity 0.7s, transform 0.7s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Atom size={40} style={{ color: 'var(--accent)' }} />
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>PLA Premium</h3>
                  <span className="label-tag" style={{ color: 'var(--accent)' }}>Standard produkcji</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>
                Złoty standard druku 3D. Ekologiczny polimer łączący doskonałą jakość wykończenia powierzchni ze sztywnością i precyzją detali. Szeroka paleta kolorów.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {['Idealne do prototypowania', 'Bogata paleta barw', 'Precyzja ±0.1 mm'].map(p => (
                  <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--accent)', flexShrink: 0 }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-scale delay-200" style={{ gridRow: 'span 2', background: 'var(--bg-2)', padding: '2rem', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'opacity 0.7s, transform 0.7s' }}>
              <div>
                <Zap size={32} style={{ color: 'var(--accent-2)', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>PETG</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Trwalszy niż PLA, doskonała odporność chemiczna i mechaniczna. Idealny do zastosowań zewnętrznych.
                </p>
              </div>
              <div style={{ background: 'rgba(255,184,0,0.08)', padding: '0.875rem 1rem', borderLeft: '2px solid var(--accent-2)', fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'var(--accent-2)', letterSpacing: '0.05em' }}>
                Max temp: 80°C
              </div>
            </div>

            <div className="reveal-scale delay-300" style={{ background: 'var(--bg-2)', padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'opacity 0.7s, transform 0.7s' }}>
              <ShieldCheck size={28} style={{ color: '#f87171', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>ABS</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Niezrównany w środowiskach wysokiej temperatury. Standard inżynieryjny.
              </p>
            </div>

            <div className="reveal-scale delay-400" style={{ background: 'var(--bg-2)', padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'opacity 0.7s, transform 0.7s' }}>
              <Layers size={28} style={{ color: '#a855f7', marginBottom: '0.875rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>TPU</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Elastyczny, gumopodobny. Doskonały na uszczelki i miękkie elementy.
              </p>
            </div>

            <div className="reveal-up delay-200" style={{ gridColumn: 'span 4', background: 'var(--accent)', padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', transition: 'opacity 0.7s, transform 0.7s' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#000', marginBottom: '0.25rem' }}>Nie wiesz, który materiał wybrać?</h3>
                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>Kalkulator dobiera optymalny polimer na podstawie parametrów projektu.</p>
              </div>
              <Link href="/wycena" style={{
                background: '#000', color: 'var(--accent)',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none',
                textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}>
                Otwórz kalkulator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════ SPECYFIKACJA ═══════════════════════════════════════════════════ */}
      <section id="specyfikacja" ref={refSpec} className="stack-section" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem' }}>
        <div className="container" style={{ padding: 0, display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}>

          <div className="reveal-rotate">
            <div className="section-marker">
              <div className="section-marker-line" />
              <span className="label-tag">Możliwości produkcyjne</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Specyfikacja<br /><span className="text-gradient">techniczna</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Pracujemy na profesjonalnym parku maszynowym FDM i SLA, dostarczając powtarzalne wyniki na skalę seryjną.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: CheckCircle2, label: 'Kontrola jakości na każdym etapie',  color: '#10b981' },
                { icon: Package2,     label: 'Bezpieczne pakowanie w formie seryjnej', color: 'var(--accent)' },
                { icon: Printer,      label: 'Farma 15+ drukarek + zlecenia SLA',  color: 'var(--accent-2)' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <Icon size={18} style={{ color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-left delay-200" style={{ border: '1px solid var(--border)', transition: 'opacity 0.7s, transform 0.7s' }}>
            {SPEC_ROWS.map((row, i) => (
              <div key={row.param} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                borderBottom: i < SPEC_ROWS.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ padding: '1.125rem 1.5rem', borderRight: '1px solid var(--border)', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {row.param}
                </div>
                <div style={{ padding: '1.125rem 1.5rem', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ OPINIE ════════════════════════════════════════════════════════ */}
      <section ref={refTestimon} className="stack-section" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem' }}>
        <div className="container" style={{ padding: 0 }}>
          <div className="reveal-blur" style={{ marginBottom: '4rem' }}>
            <div className="section-marker">
              <div className="section-marker-line" />
              <span className="label-tag">Opinie klientów</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Co mówią<br /><span className="text-gradient">o nas klienci</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--border)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`reveal-blur delay-${(i + 1)}00`} style={{
                background: 'var(--bg-2)', padding: '2.5rem 2rem',
                borderRight: i < TESTIMONIALS.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
                transition: 'background 0.2s, opacity 0.7s, transform 0.7s, filter 0.7s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-2)')}
              >
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} fill="var(--accent)" style={{ color: 'var(--accent)' }} />
                  ))}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</div>
                  <div className="label-tag" style={{ marginTop: '0.2rem' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════════════════════════════════════════════════════════════ */}
      <section id="faq" ref={refFaq} className="stack-section" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem' }}>
        <div className="container" style={{ padding: 0, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div className="reveal-right">
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

          <div className="reveal-up delay-100" style={{ border: '1px solid var(--border)', transition: 'opacity 0.7s, transform 0.7s' }}>
            {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ════ CTA BANNER ════════════════════════════════════════════════════ */}
      <section ref={refCta} className="stack-section" style={{ padding: '8rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div className="reveal-up" style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-marker" style={{ justifyContent: 'center' }}>
            <div className="section-marker-line" />
            <span className="label-tag">Gotowy?</span>
            <div className="section-marker-line" />
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.5rem', marginTop: '1.5rem' }}>
            Twój projekt zasługuje<br />na <span className="text-gradient">precyzję przemysłową.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '3rem', maxWidth: '560px', margin: '0 auto 3rem' }}>
            Wgraj model teraz — wycena w sekundy, druk następnego dnia.
          </p>
          <Link href="/wycena" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1.25rem 3rem' }}>
            Wyceń model 3D <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* ════ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="stack-section" style={{ paddingTop: '5rem', paddingBottom: '2rem', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div style={{ width: '28px', height: '28px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }}>
                  <Box size={14} color="#000" />
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                  3D<span style={{ color: 'var(--accent)' }}>GEN</span>
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '280px' }}>
                Platforma automatyzująca wycenę i zamawianie druku 3D. Od prototypu po serię — precyzja przemysłowa.
              </p>
            </div>

            {[
              { title: 'Produkcja', links: [['Kalkulator 3D', '/wycena'], ['Baza materiałów', '#materialy'], ['Dla biznesu', '#']] },
              { title: 'Informacje', links: [['Specyfikacja', '#specyfikacja'], ['FAQ', '#faq'], ['Blog', '#']] },
              { title: 'Kontakt', links: [['kontakt@3dgen.pl', 'mailto:kontakt@3dgen.pl'], ['+48 123 456 789', 'tel:+48123456789']] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="label-tag" style={{ color: 'var(--text)', marginBottom: '1.25rem' }}>{col.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {col.links.map(([label, href]) => (
                    <a key={label} href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
              © {new Date().getFullYear()} 3DGEN STUDIO — WSZELKIE PRAWA ZASTRZEŻONE
            </span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {['Polityka Prywatności', 'Regulamin'].map(t => (
                <a key={t} href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.05em', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
