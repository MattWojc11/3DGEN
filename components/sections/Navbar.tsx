"use client";
import Link from 'next/link';
import { Box } from 'lucide-react';

export default function Navbar() {
  return (
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
  );
}
