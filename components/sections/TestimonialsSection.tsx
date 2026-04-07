"use client";
import { Star } from 'lucide-react';

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

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container" style={{ padding: 0 }}>

        <div style={{ marginBottom: '4rem' }}>
          <div className="section-marker">
            <div className="section-marker-line" />
            <span className="label-tag">Opinie klientów</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Co mówią<br /><span className="text-gradient">o nas klienci</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
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
  );
}
