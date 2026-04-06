"use client";
import { CheckCircle2, Package2, Printer } from 'lucide-react';

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

export default function SpecSection() {
  return (
    <section id="specyfikacja" style={{ borderBottom: '1px solid var(--border)', padding: '7rem 2rem', background: 'var(--bg)' }}>
      <div className="container" style={{ padding: 0, display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}>

        <div>
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

        <div style={{ border: '1px solid var(--border)' }}>
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
  );
}
