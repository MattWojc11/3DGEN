"use client";
import Link from 'next/link';
import { Atom, Zap, ShieldCheck, Layers } from 'lucide-react';

export default function MaterialsSection() {
  return (
    <section id="materialy" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem', background: 'var(--bg)' }}>
      <div className="container" style={{ padding: 0 }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-marker">
            <div className="section-marker-line" />
            <span className="label-tag">Baza produkcyjna</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Materiały,<br /><span className="text-gradient">którym ufamy</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)', gap: '1px', border: '1px solid var(--border)' }}>
          <div style={{ gridColumn: 'span 2', gridRow: 'span 2', background: 'var(--bg-2)', padding: '3rem', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
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

          <div style={{ gridRow: 'span 2', background: 'var(--bg-2)', padding: '2rem', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

          <div style={{ background: 'var(--bg-2)', padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <ShieldCheck size={28} style={{ color: '#f87171', marginBottom: '0.875rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>ABS</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Niezrównany w środowiskach wysokiej temperatury. Standard inżynieryjny.
            </p>
          </div>

          <div style={{ background: 'var(--bg-2)', padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <Layers size={28} style={{ color: '#a855f7', marginBottom: '0.875rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>TPU</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Elastyczny, gumopodobny. Doskonały na uszczelki i miękkie elementy.
            </p>
          </div>

          <div style={{ gridColumn: 'span 4', background: 'var(--accent)', padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
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
  );
}
