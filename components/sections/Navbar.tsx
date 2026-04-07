"use client";
import Link from 'next/link';
import { Box } from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  ['#proces',       'Proces'],
  ['#materialy',    'Materiały'],
  ['#specyfikacja', 'Spec'],
  ['#faq',          'FAQ'],
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close drawer on outside click / scroll
  useEffect(() => {
    const close = () => setMenuOpen(false);
    if (menuOpen) {
      document.addEventListener('click', close, { once: true });
    }
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)',
            flexShrink: 0,
          }}>
            <Box size={16} color="#000" />
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--text)' }}>
            3D<span style={{ color: 'var(--accent)' }}>GEN</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} style={{
              color: 'var(--text-muted)', textDecoration: 'none',
              fontFamily: "'Space Mono', monospace", fontSize: '0.72rem',
              padding: '0.5rem 0.875rem', textTransform: 'uppercase',
              letterSpacing: '0.08em', transition: 'color 0.15s',
              minHeight: '44px', display: 'flex', alignItems: 'center',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
              {label}
            </a>
          ))}
          <Link href="/wycena" className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '0.6rem 1.25rem', marginLeft: '0.75rem' }}>
            Wycena →
          </Link>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`nav-drawer${menuOpen ? ' open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {NAV_LINKS.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="nav-drawer-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <Link
          href="/wycena"
          className="nav-drawer-cta"
          onClick={() => setMenuOpen(false)}
        >
          Wycena →
        </Link>
      </div>
    </>
  );
}
