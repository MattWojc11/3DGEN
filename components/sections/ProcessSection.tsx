"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Box, Cpu, Settings, Printer } from 'lucide-react';

const STEPS = [
  { num: '01', icon: Box,      title: 'Import Modelu',     desc: 'Przeciągnij plik .STL na platformę. Akceptujemy modele do 50 MB.' },
  { num: '02', icon: Cpu,      title: 'Analiza Geometrii', desc: 'Algorytm oblicza objętość, wymiary i powierzchnię w czasie rzeczywistym.' },
  { num: '03', icon: Settings, title: 'Konfiguracja',       desc: 'Dobierz materiał, jakość warstwy i procent wypełnienia.' },
  { num: '04', icon: Printer,  title: 'Druk i Dostawa',    desc: 'Zatwierdzasz wycenę — realizacja w 24–48 h.' },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header    = section.querySelector('.process-header') as HTMLElement;
    const cards     = section.querySelectorAll<HTMLElement>('.process-card-anim');
    const connector = section.querySelector('.process-connector') as HTMLElement;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (header) {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
          }
          if (connector) {
            setTimeout(() => { connector.style.transform = 'scaleX(1)'; }, 200);
          }
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 300 + i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="proces" ref={sectionRef} className="process-section">
      <div className="container" style={{ padding: 0 }}>

        {/* Header */}
        <div
          className="process-header"
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem',
            opacity: 0, transform: 'translateY(24px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
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

        {/* Connector line */}
        <div style={{ position: 'relative', marginBottom: '-1px' }}>
          <div
            className="process-connector"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          />
        </div>

        {/* Step cards */}
        <div className="process-cards">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="process-card-item process-card-anim"
                style={{
                  opacity: 0,
                  transform: 'translateY(32px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
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
  );
}
