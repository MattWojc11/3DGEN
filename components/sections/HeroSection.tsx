"use client";
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ModelViewer from '../ModelViewer';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Text content */}
        <div>
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
            <span className="label-tag">Platforma wyceny druku 3D</span>
          </div>

          <h1 className="animate-fade-in delay-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Precyzyjna<br />wycena.<br />
            <span className="text-gradient">Natychmiastowo.</span>
          </h1>

          <p className="animate-fade-in delay-2" style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '480px',
          }}>
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

        {/* 3D Model Preview */}
        <div className="hero-model animate-fade-in delay-2">
          <ModelViewer fileUrl="/img-svg/Blisk.stl" color="#ff6b00" />
        </div>
      </div>
    </section>
  );
}
