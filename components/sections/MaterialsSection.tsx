"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Atom, Zap, ShieldCheck, Layers, ArrowUpRight, Thermometer, Dumbbell, Beaker, Palette, Wrench } from 'lucide-react';

/* ─── Data ─────────────────────────────────── */

const MATERIALS = [
  {
    id: 'pla',
    name: 'PLA Premium',
    tagline: 'Standard produkcji',
    tagColor: 'var(--accent)',
    icon: Atom,
    iconColor: 'var(--accent)',
    badge: 'NAJPOPULARNIEJSZY',
    badgeColor: 'var(--accent)',
    description: 'Złoty standard druku 3D. Ekologiczny polimer na bazie skrobi kukurydzianej — doskonała jakość wykończenia, ostra geometria, zero wypaczenia. Idealny do 95% projektów prototypowych i dekoracyjnych.',
    props: {
      wytrzymalosc: 3,
      elastycznosc: 1,
      temperatura: 1,
      precyzja: 5,
      cena: 5,
    },
    maxTemp: '60°C',
    gęstość: '1.24 g/cm³',
    zastosowania: ['Prototypy i modele koncepcyjne', 'Figurki i elementy dekoracyjne', 'Makiety architektoniczne', 'Gadżety i ozdoby', 'Edukacja i nauka'],
    nie_dla: 'Części narażonych na ciepło, kontakt z chemikaliami',
    color: '#ff6b00',
  },
  {
    id: 'petg',
    name: 'PETG',
    tagline: 'Wytrzymałość + trwałość',
    tagColor: 'var(--accent-2)',
    icon: Zap,
    iconColor: 'var(--accent-2)',
    badge: 'POLECAMY',
    badgeColor: 'var(--accent-2)',
    description: 'Trwalszy i bardziej odporny niż PLA, łatwiejszy w druku niż ABS. Doskonały kompromis między łatwością użycia a właściwościami mechanicznymi. Odporny na wilgoć i większość kwasów.',
    props: {
      wytrzymalosc: 4,
      elastycznosc: 2,
      temperatura: 3,
      precyzja: 4,
      cena: 3,
    },
    maxTemp: '80°C',
    gęstość: '1.27 g/cm³',
    zastosowania: ['Obudowy elektroniki', 'Elementy zewnętrzne', 'Pojemniki na żywność', 'Butelki i naczynia', 'Mechanizmy i przekładnie'],
    nie_dla: 'Środowisk o bardzo wysokiej temperaturze',
    color: '#ffb800',
  },
  {
    id: 'abs',
    name: 'ABS',
    tagline: 'Inżynieryjny',
    tagColor: '#f87171',
    icon: ShieldCheck,
    iconColor: '#f87171',
    badge: 'TECHNICZNY',
    badgeColor: '#f87171',
    description: 'Standard przemysłowy stosowany m.in. w motoryzacji i elektronice. Wytrzymały mechanicznie, odporny na temperaturę i szok. Wymaga kontrolowanych warunków druku — obudowanej drukarki i podgrzewanego stołu.',
    props: {
      wytrzymalosc: 5,
      elastycznosc: 2,
      temperatura: 5,
      precyzja: 3,
      cena: 3,
    },
    maxTemp: '105°C',
    gęstość: '1.05 g/cm³',
    zastosowania: ['Obudowy urządzeń elektrycznych', 'Elementy pod maską samochodu', 'Narzędzia i uchwyty', 'Elementy narażone na ciepło', 'Obróbka wtórna (szlifowanie, malowanie)'],
    nie_dla: 'Zastosowań wymagających elastyczności lub kontaktu z żywnością',
    color: '#f87171',
  },
  {
    id: 'tpu',
    name: 'TPU Flex',
    tagline: 'Elastyczny',
    tagColor: '#a855f7',
    icon: Layers,
    iconColor: '#a855f7',
    badge: 'ELASTYCZNY',
    badgeColor: '#a855f7',
    description: 'Termoplastyczny poliuretan — materiał gumopodobny o wyjątkowej elastyczności i odporności na ścieranie. Absorbuje wstrząsy, wodoodporny. Najtrudniejszy w druku — wymaga doświadczenia drukarza.',
    props: {
      wytrzymalosc: 3,
      elastycznosc: 5,
      temperatura: 3,
      precyzja: 2,
      cena: 2,
    },
    maxTemp: '80°C',
    gęstość: '1.20 g/cm³',
    zastosowania: ['Uszczelki i elementy gumowe', 'Etui na telefony', 'Buty i wkładki ortopedyczne', 'Absorbery wibracji', 'Węże i złącza elastyczne'],
    nie_dla: 'Detali wymagających ostrej geometrii i precyzji wymiarowej',
    color: '#a855f7',
  },
];

const COMPARISON = [
  { label: 'Wytrzymałość mech.',   icon: Dumbbell,   key: 'wytrzymalosc' as const,  desc: 'Odporność na naprężenia i uderzenia' },
  { label: 'Elastyczność',         icon: Layers,     key: 'elastycznosc' as const,   desc: 'Zdolność do gięcia bez pękania' },
  { label: 'Odp. na temperaturę',  icon: Thermometer, key: 'temperatura' as const,  desc: 'Maksymalna temperatura użytkowania' },
  { label: 'Precyzja wymiarowa',   icon: Beaker,     key: 'precyzja' as const,      desc: 'Dokładność odwzorowania geometrii' },
  { label: 'Stosunek jakości/ceny', icon: Palette,   key: 'cena' as const,          desc: 'Wartość za złotówkę' },
];

/* ─── Sub-components ────────────────────────── */

function PropBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            height: '6px',
            flex: 1,
            background: i <= value ? color : 'var(--border-light)',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  );
}

function MaterialCard({ mat, isActive, onClick }: {
  mat: typeof MATERIALS[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = mat.icon;
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? 'var(--bg-3)' : 'var(--bg-2)',
        border: `1px solid ${isActive ? mat.color : 'var(--border)'}`,
        padding: '1.5rem',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        transition: 'all 0.2s',
        position: 'relative',
      }}
    >
      {/* Badge */}
      <div style={{
        position: 'absolute', top: '-1px', right: '-1px',
        background: mat.badgeColor, color: '#000',
        fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
        fontWeight: 700, letterSpacing: '0.1em',
        padding: '0.25rem 0.625rem',
      }}>
        {mat.badge}
      </div>

      <Icon size={28} style={{ color: mat.iconColor }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{mat.name}</div>
        <div className="label-tag" style={{ color: mat.tagColor }}>{mat.tagline}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="label-tag">Maks. temp.</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: mat.iconColor }}>{mat.maxTemp}</span>
      </div>
    </button>
  );
}

/* ─── Main Component ────────────────────────── */

export default function MaterialsSection() {
  const [activeId, setActiveId] = useState('pla');
  const active = MATERIALS.find(m => m.id === activeId) || MATERIALS[0];
  const ActiveIcon = active.icon;

  return (
    <section id="materialy" className="materials-section">
      <div className="container" style={{ padding: 0 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
          <div>
            <div className="section-marker">
              <div className="section-marker-line" />
              <span className="label-tag">Baza produkcyjna</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Materiały,<br /><span className="text-gradient">którym ufamy</span>
            </h2>
          </div>
          <Link href="/wycena" className="btn btn-ghost" style={{ fontSize: '0.78rem' }}>
            Dobierz materiał <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* ══ PART 1: Interactive material explorer ══ */}
        <div style={{ border: '1px solid var(--border)', marginBottom: '1px' }}>
          <div style={{
            padding: '0.875rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: 'var(--bg-2)',
          }}>
            <Wrench size={14} style={{ color: 'var(--accent)' }} />
            <span className="label-tag">Eksploruj materiały — kliknij aby porównać</span>
          </div>

          {/* Selector grid — columns controlled by .mat-selector CSS class */}
          <div className="mat-selector">
            {MATERIALS.map(mat => (
              <MaterialCard
                key={mat.id}
                mat={mat}
                isActive={activeId === mat.id}
                onClick={() => setActiveId(mat.id)}
              />
            ))}
          </div>

          {/* Detail panel — 2-col on desktop, stacks on mobile via .mat-detail CSS class */}
          <div className="mat-detail">

            {/* Left: Description */}
            <div className="mat-detail-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <ActiveIcon size={36} style={{ color: active.iconColor }} />
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{active.name}</h3>
                  <div className="label-tag" style={{ color: active.tagColor }}>{active.tagline}</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                {active.description}
              </p>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div>
                  <div className="label-tag" style={{ marginBottom: '0.3rem' }}>Max temperatura</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.1rem', color: active.iconColor, fontWeight: 700 }}>{active.maxTemp}</div>
                </div>
                <div>
                  <div className="label-tag" style={{ marginBottom: '0.3rem' }}>Gęstość</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.1rem', color: 'var(--text)', fontWeight: 700 }}>{active.gęstość}</div>
                </div>
              </div>

              <div style={{ borderLeft: '2px solid var(--border-light)', paddingLeft: '1rem' }}>
                <div className="label-tag" style={{ marginBottom: '0.5rem' }}>⚠ Nie nadaje się do:</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{active.nie_dla}</p>
              </div>
            </div>

            {/* Right: Properties + Use cases */}
            <div style={{ padding: '2.5rem' }}>
              {/* Property bars */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div className="label-tag" style={{ marginBottom: '1.25rem' }}>Właściwości</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {COMPARISON.map(({ label, icon: CIcon, key }) => (
                    <div key={key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CIcon size={13} style={{ color: 'var(--text-muted)' }} />
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</span>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: active.iconColor }}>
                          {active.props[key]}/5
                        </span>
                      </div>
                      <PropBar value={active.props[key]} color={active.iconColor} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Use cases */}
              <div>
                <div className="label-tag" style={{ marginBottom: '1rem' }}>Zastosowania</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {active.zastosowania.map(z => (
                    <div key={z} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <div style={{ width: '5px', height: '5px', background: active.iconColor, flexShrink: 0 }} />
                      {z}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ PART 2: CTA Banner ══ */}
        <div className="materials-banner">
          <div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 700, color: '#000', marginBottom: '0.25rem' }}>
              Nadal nie wiesz, który materiał wybrać?
            </h3>
            <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>
              Kalkulator analizuje Twój model i sugeruje optymalny polimer dla danego zastosowania.
            </p>
          </div>
          <Link href="/wycena" style={{
            background: '#000', color: 'var(--accent)',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 1.75rem',
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none',
            textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            flexShrink: 0,
          }}>
            Otwórz kalkulator →
          </Link>
        </div>

      </div>
    </section>
  );
}
