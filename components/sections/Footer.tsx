"use client";
import { Box } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      paddingTop: 'clamp(3rem, 6vw, 5rem)',
      paddingBottom: '2rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
    }}>
      <div className="container" style={{ padding: 0 }}>

        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '28px', height: '28px', background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)',
              }}>
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

          {/* Link columns */}
          {[
            { title: 'Produkcja',   links: [['Kalkulator 3D', '/wycena'], ['Baza materiałów', '#materialy'], ['Dla biznesu', '#']] },
            { title: 'Informacje',  links: [['Specyfikacja', '#specyfikacja'], ['FAQ', '#faq'], ['Blog', '#']] },
            { title: 'Kontakt',     links: [['kontakt@3dgen.pl', 'mailto:kontakt@3dgen.pl'], ['+48 123 456 789', 'tel:+48123456789']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="label-tag" style={{ color: 'var(--text)', marginBottom: '1.25rem' }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {col.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} 3DGEN STUDIO — WSZELKIE PRAWA ZASTRZEŻONE
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Polityka Prywatności', 'Regulamin'].map(t => (
              <a
                key={t}
                href="#"
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.05em', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
