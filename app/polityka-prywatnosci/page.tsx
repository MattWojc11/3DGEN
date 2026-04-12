"use client";
import React from 'react';
import Link from 'next/link';
import { Box, ChevronLeft, Shield } from 'lucide-react';

const LAST_UPDATED = '11 kwietnia 2026';

export default function PolitykaPrywatnosci() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ─── Header ─── */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
              <ChevronLeft size={14} /> Strona główna
            </Link>
            <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }}>
                <Box size={12} color="#000" />
              </div>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', fontWeight: 700 }}>
                3D<span style={{ color: 'var(--accent)' }}>GEN</span>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            <Shield size={12} />
            PRAWNE
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(3rem, 6vw, 5rem) 1.5rem clamp(2.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              RODO · GDPR
            </span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Polityka<br />
            <span style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Prywatności</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.05em' }}>
            Ostatnia aktualizacja: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* ─── Content ─── */}
      <main style={{ flex: 1, padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          <Section num="01" title="Administrator Danych">
            <P>Administratorem Twoich danych osobowych jest <strong>3DGEN Studio</strong> z siedzibą w Polsce (dalej: „Administrator", „my"). Prowadzimy platformę internetową dostępną pod adresem <strong>3dgen.pl</strong>, umożliwiającą automatyczną wycenę oraz zamawianie usług druku 3D.</P>
            <P>Kontakt z Administratorem w sprawach dotyczących danych osobowych:</P>
            <InfoBox>
              <InfoRow label="E-mail" value="kontakt@3dgen.pl" />
              <InfoRow label="Telefon" value="+48 123 456 789" />
              <InfoRow label="Adres" value="ul. Przykładowa 1, 00-000 Warszawa" />
            </InfoBox>
          </Section>

          <Section num="02" title="Jakie Dane Zbieramy">
            <P>W zależności od sposobu korzystania z platformy możemy przetwarzać następujące kategorie danych:</P>
            <BulletList items={[
              'Dane identyfikacyjne: imię, nazwisko, nazwa firmy (przy zamówieniach)',
              'Dane kontaktowe: adres e-mail, numer telefonu',
              'Dane rozliczeniowe: adres do faktury, NIP (dla firm)',
              'Dane techniczne: adres IP, typ przeglądarki, system operacyjny, cookies sesji',
              'Pliki modeli 3D: przesyłane przez Ciebie pliki STL w celu wyceny i realizacji zamówienia',
              'Historia zamówień i wycen: parametry druku, materiały, wygenerowane ceny',
            ]} />
            <P>Nie zbieramy wrażliwych kategorii danych, o których mowa w art. 9 RODO.</P>
          </Section>

          <Section num="03" title="Cele i Podstawy Prawne Przetwarzania">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <LegalBasis
                purpose="Realizacja i wycena zamówienia"
                basis="art. 6 ust. 1 lit. b RODO — wykonanie umowy"
                desc="Przetwarzamy Twoje dane, w tym pliki STL, aby obliczyć wycenę i zrealizować zamówienie druku 3D."
              />
              <LegalBasis
                purpose="Wystawianie faktur i obsługa płatności"
                basis="art. 6 ust. 1 lit. c RODO — obowiązek prawny"
                desc="Przepisy podatkowe nakładają na nas obowiązek przechowywania dokumentów księgowych przez 5 lat."
              />
              <LegalBasis
                purpose="Marketing i informacje o nowych usługach"
                basis="art. 6 ust. 1 lit. a RODO — zgoda"
                desc="Wyłącznie na podstawie Twojej dobrowolnej zgody, którą możesz wycofać w dowolnym momencie."
              />
              <LegalBasis
                purpose="Analityka i poprawa działania serwisu"
                basis="art. 6 ust. 1 lit. f RODO — uzasadniony interes"
                desc="Monitorujemy wydajność i błędy serwisu w celu ciągłego doskonalenia platformy."
              />
            </div>
          </Section>

          <Section num="04" title="Pliki Modeli 3D — Zasady Szczególne">
            <P>Pliki STL przesyłane na platformę są traktowane jako dane poufne:</P>
            <BulletList items={[
              'Pliki służą wyłącznie do wyceny i realizacji Twojego zamówienia',
              'Nie udostępniamy ich osobom trzecim bez Twojej zgody',
              'Pliki z nieukończonych wycen (bez złożenia zamówienia) są automatycznie usuwane po 30 dniach',
              'Pliki powiązane z zrealizowanymi zamówieniami przechowujemy przez okres 12 miesięcy dla celów reklamacyjnych',
              'Możesz w każdej chwili zażądać niezwłocznego usunięcia przesłanych plików',
            ]} />
          </Section>

          <Section num="05" title="Cookies i Technologie Śledzące">
            <P>Nasza platforma korzysta z następujących typów plików cookies:</P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '0.5rem 0' }}>
              <CookieRow type="Niezbędne" desc="Sesja użytkownika, koszyk, preferencje interfejsu. Wymagane do działania serwisu. Nie wymagają zgody." retention="Sesja / 1 rok" />
              <CookieRow type="Analityczne" desc="Google Analytics 4 — zliczanie odwiedzin, najpopularniejsze modele i materiały. IP jest anonimizowany." retention="26 miesięcy" />
              <CookieRow type="Marketingowe" desc="Tylko jeśli wyrazisz zgodę — śledzenie konwersji dla celów remarketingowych." retention="90 dni" />
            </div>
            <P>Możesz zarządzać cookies w ustawieniach przeglądarki lub za pomocą bannera widocznego przy pierwszej wizycie.</P>
          </Section>

          <Section num="06" title="Udostępnianie Danych Podmiotom Trzecim">
            <P>Twoje dane mogą być przekazywane wyłącznie do zaufanych partnerów w celu realizacji usług:</P>
            <BulletList items={[
              'Dostawcy płatności (Stripe, PayU) — w celu obsługi transakcji',
              'Dostawcy hostingu i infrastruktury chmurowej (Vercel, AWS) — dane są przechowywane na serwerach w UE',
              'Google LLC — usługi Analytics i reCAPTCHA (w ramach standardowych klauzul umownych z UE)',
              'Firmy kurierskie i spedycyjne — dane adresowe przy realizacji fizycznej dostawy',
              'Biuro rachunkowe — wyłącznie dane fakturowe, na podstawie umowy powierzenia',
            ]} />
            <InfoBox>
              Nie sprzedajemy Twoich danych osobowych. Nigdy.
            </InfoBox>
          </Section>

          <Section num="07" title="Twoje Prawa">
            <P>Na podstawie RODO przysługują Ci następujące prawa:</P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { right: 'Prawo dostępu', desc: 'Możesz zażądać kopii danych, które o Tobie przechowujemy.' },
                { right: 'Prawo do sprostowania', desc: 'Możesz poprawić nieprawdziwe lub niekompletne dane.' },
                { right: 'Prawo do usunięcia', desc: 'Możesz żądać usunięcia danych (tzw. „prawo do bycia zapomnianym").' },
                { right: 'Prawo do ograniczenia przetwarzania', desc: 'Możesz zażądać wstrzymania przetwarzania Twoich danych.' },
                { right: 'Prawo do przenoszenia danych', desc: 'Możesz otrzymać swoje dane w formacie nadającym się do odczytu maszynowego.' },
                { right: 'Prawo do sprzeciwu', desc: 'Możesz sprzeciwić się przetwarzaniu danych na podstawie uzasadnionego interesu.' },
                { right: 'Prawo do wycofania zgody', desc: 'Jeśli przetwarzanie odbywa się na podstawie zgody, możesz ją wycofać w dowolnym momencie.' },
                { right: 'Prawo do skargi', desc: 'Możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).' },
              ].map(({ right, desc }) => (
                <div key={right} style={{ borderLeft: '2px solid var(--border-light)', paddingLeft: '1.25rem' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>{right}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
            <P style={{ marginTop: '1rem' }}>Wnioski możesz składać na adres: <strong>kontakt@3dgen.pl</strong>. Odpowiemy w terminie 30 dni.</P>
          </Section>

          <Section num="08" title="Bezpieczeństwo Danych">
            <P>Stosujemy wielowarstwowe środki techniczne i organizacyjne w celu ochrony Twoich danych:</P>
            <BulletList items={[
              'Szyfrowanie transmisji danych (TLS 1.3 / HTTPS)',
              'Szyfrowanie danych w spoczynku (AES-256)',
              'Kontrola dostępu oparta na rolach — do Twoich danych mają dostęp wyłącznie uprawnione osoby',
              'Regularne kopie zapasowe i testy odtworzeniowe',
              'Monitoring bezpieczeństwa i system wykrywania anomalii',
              'Regularne szkolenia zespołu z zakresu ochrony danych',
            ]} />
          </Section>

          <Section num="09" title="Okres Przechowywania Danych">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <InfoRow label="Dane konta" value="Do czasu usunięcia konta + 30 dni bufor" />
              <InfoRow label="Zamówienia i faktury" value="5 lat (obowiązek podatkowy)" />
              <InfoRow label="Pliki STL — wyceny" value="30 dni od ostatniej aktywności" />
              <InfoRow label="Pliki STL — zamówienia" value="12 miesięcy od realizacji" />
              <InfoRow label="Logi serwera" value="90 dni" />
              <InfoRow label="Dane marketingowe" value="Do wycofania zgody" />
            </div>
          </Section>

          <Section num="10" title="Zmiany Polityki Prywatności">
            <P>Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki. O istotnych zmianach poinformujemy Cię za pośrednictwem e-mail lub komunikatu na stronie. Data ostatniej aktualizacji jest zawsze widoczna na górze dokumentu.</P>
          </Section>

        </div>
      </main>

      <LegalFooter />
    </div>
  );
}

/* ─── Shared sub-components ─────────────────────────────────── */

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>{num}</span>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{children}</div>
    </div>
  );
}

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.9375rem', ...style }}>{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: 0, listStyle: 'none' }}>
      {items.map((item) => (
        <li key={item} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
          <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.625rem 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--text)' }}>{value}</span>
    </div>
  );
}

function LegalBasis({ purpose, basis, desc }: { purpose: string; basis: string; desc: string }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '1.25rem' }}>
      <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{purpose}</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>{basis}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}

function CookieRow({ type, desc, retention }: { type: string; desc: string; retention: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px', gap: '1rem', padding: '0.875rem 1rem', background: 'var(--bg-2)', border: '1px solid var(--border)', alignItems: 'start' }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.05em', paddingTop: '2px' }}>{type.toUpperCase()}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right' }}>{retention}</div>
    </div>
  );
}

function LegalFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
        © {new Date().getFullYear()} 3DGEN STUDIO
      </span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/polityka-prywatnosci" style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.05em' }}>Polityka Prywatności</Link>
        <Link href="/regulamin" style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.15s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>Regulamin</Link>
      </div>
    </footer>
  );
}
