"use client";
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 2rem', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
        <div className="section-marker" style={{ justifyContent: 'center' }}>
          <div className="section-marker-line" />
          <span className="label-tag">Gotowy?</span>
          <div className="section-marker-line" />
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '1.5rem',
          marginTop: '1.5rem',
        }}>
          Twój projekt zasługuje<br />na <span className="text-gradient">precyzję przemysłową.</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 2vw, 1.125rem)', marginBottom: '3rem', maxWidth: '560px', margin: '0 auto 3rem' }}>
          Wgraj model teraz — wycena w sekundy, druk następnego dnia.
        </p>
        <Link href="/wycena" className="btn btn-primary" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', padding: '1.125rem 2.5rem' }}>
          Wyceń model 3D <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
