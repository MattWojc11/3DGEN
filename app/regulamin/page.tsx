"use client";
import React from 'react';
import Link from 'next/link';
import { Box, ChevronLeft, FileText } from 'lucide-react';

const LAST_UPDATED = '11 kwietnia 2026';

export default function Regulamin() {
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
            <FileText size={12} />
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
              WARUNKI ŚWIADCZENIA USŁUG
            </span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Regulamin<br />
            <span style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Serwisu 3DGEN</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.05em' }}>
            Ostatnia aktualizacja: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* ─── Content ─── */}
      <main style={{ flex: 1, padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          <Section num="§1" title="Postanowienia Ogólne">
            <P>Niniejszy Regulamin określa zasady świadczenia usług drogą elektroniczną przez <strong>3DGEN Studio</strong> (dalej: „Usługodawca") na platformie dostępnej pod adresem <strong>3dgen.pl</strong>.</P>
            <P>Korzystanie z platformy jest równoznaczne z akceptacją niniejszego Regulaminu w całości. Jeśli nie zgadzasz się z którymkolwiek postanowieniem, prosimy o niekorzystanie z serwisu.</P>
            <InfoBox>
              Platforma 3DGEN umożliwia automatyczną wycenę modeli 3D na podstawie przesłanych plików STL oraz składanie zamówień na usługi druku 3D metodami FDM (PLA, PETG, ABS, TPU).
            </InfoBox>
          </Section>

          <Section num="§2" title="Definicje">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { term: 'Usługodawca', def: '3DGEN Studio — właściciel i operator platformy 3dgen.pl' },
                { term: 'Użytkownik', def: 'Osoba fizyczna lub prawna korzystająca z platformy' },
                { term: 'Klient', def: 'Użytkownik, który złożył zamówienie na usługę druku 3D' },
                { term: 'Plik STL', def: 'Plik cyfrowy opisujący geometrię modelu trójwymiarowego, przesyłany przez Użytkownika' },
                { term: 'Wycena', def: 'Automatycznie obliczona szacunkowa cena wydruku wygenerowana przez algorytm platformy' },
                { term: 'Zamówienie', def: 'Złożona przez Klienta dyspozycja realizacji wydruku 3D na podstawie zaakceptowanej wyceny' },
                { term: 'Usługa', def: 'Wydruk 3D zrealizowany przez Usługodawcę zgodnie z parametrami zamówienia' },
                { term: 'Konsument', def: 'Użytkownik będący osobą fizyczną zawierającą umowę niezwiązaną bezpośrednio z działalnością gospodarczą' },
              ].map(({ term, def }) => (
                <div key={term} style={{ display: 'flex', gap: '1.5rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', minWidth: '130px', flexShrink: 0, letterSpacing: '0.03em' }}>{term}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{def}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section num="§3" title="Wymagania Techniczne i Rejestracja">
            <P>Do korzystania z platformy wymagane są:</P>
            <BulletList items={[
              'Urządzenie z dostępem do Internetu i aktualną przeglądarką (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)',
              'Aktywny adres e-mail',
              'Przeglądarka z obsługą JavaScript i WebGL (wymagane do podglądu modeli 3D)',
            ]} />
            <P>Rejestracja konta nie jest wymagana do uzyskania wyceny. Złożenie zamówienia wymaga podania danych kontaktowych i adresowych.</P>
          </Section>

          <Section num="§4" title="Wymagania dot. Plików i Modeli 3D">
            <P>Użytkownik jest odpowiedzialny za jakość i poprawność przesłanego pliku. Akceptowane formaty i ograniczenia:</P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.5rem 0' }}>
              <InfoRow label="Obsługiwane formaty" value="STL (ASCII i Binary)" />
              <InfoRow label="Maks. rozmiar pliku" value="50 MB" />
              <InfoRow label="Maks. wymiary wydruku" value="220 × 220 × 250 mm (FDM)" />
              <InfoRow label="Minimalna grubość ścianki" value="0,8 mm" />
              <InfoRow label="Pliki na jedną wycenę" value="1 plik STL (jeden model)" />
            </div>
            <P>Usługodawca nie ponosi odpowiedzialności za błędy wyceny wynikające z wadliwej geometrii modelu (niepołączone powierzchnie, odwrócone normalne, otwarte siatki).</P>
            <P>Użytkownik oświadcza, że posiada pełne prawa do przesyłanego pliku i nie narusza on praw własności intelektualnej osób trzecich. Zakazane jest przesyłanie plików modeli broni, przedmiotów nielegalnych lub naruszających prawa autorskie.</P>
          </Section>

          <Section num="§5" title="Wycena i Ceny">
            <P>Wycena generowana jest automatycznie na podstawie następujących parametrów:</P>
            <BulletList items={[
              'Objętość i gabaryty modelu (obliczone z pliku STL)',
              'Wybrany materiał (PLA, PETG, ABS, TPU)',
              'Jakość wydruku (grubość warstwy: 0.12 / 0.20 / 0.28 mm)',
              'Stopień wypełnienia (0–100%)',
              'Liczba sztuk (rabaty progowe dla zamówień seryjnych)',
            ]} />
            <InfoBox>
              Wszystkie ceny prezentowane na platformie są cenami orientacyjnymi. Ostateczna cena usługi może różnić się od wyceny automatycznej w przypadku: modeli wymagających podpór, modeli o ekstremalnych proporcjach lub zamówień wymagających dodatkowego przygotowania. W takim przypadku Usługodawca skontaktuje się z Klientem przed realizacją.
            </InfoBox>
            <P>Ceny podawane są w złotych polskich (PLN). Kwoty brutto zawierają podatek VAT 23%. Dla firm zarejestrowanych jako czynny podatnik VAT możliwe jest wystawienie faktury z naliczonym VAT do odliczenia.</P>
          </Section>

          <Section num="§6" title="Składanie Zamówień">
            <P>Proces złożenia zamówienia przebiega następująco:</P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { step: '01', title: 'Wgraj plik STL', desc: 'Przeciągnij lub wybierz plik modelu 3D na stronie /wycena' },
                { step: '02', title: 'Skonfiguruj parametry', desc: 'Wybierz materiał, jakość, wypełnienie, kolor i ilość sztuk' },
                { step: '03', title: 'Zaakceptuj wycenę', desc: 'Sprawdź kalkulację i kliknij „Złóż Zamówienie"' },
                { step: '04', title: 'Podaj dane kontaktowe', desc: 'Wprowadź adres dostawy i dane do faktury (jeśli wymagane)' },
                { step: '05', title: 'Opłać zamówienie', desc: 'Dokonaj płatności online — zamówienie zostaje potwierdzone po zaksięgowaniu wpłaty' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '1rem', alignItems: 'start' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--accent-muted)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)', flexShrink: 0 }}>{step}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <P style={{ marginTop: '0.5rem' }}>Umowa zostaje zawarta z chwilą potwierdzenia przyjęcia zamówienia do realizacji, przesłanego na adres e-mail Klienta.</P>
          </Section>

          <Section num="§7" title="Płatności">
            <P>Akceptowane formy płatności:</P>
            <BulletList items={[
              'Przelew ekspresowy / BLIK (PayU)',
              'Karta płatnicza (Visa, Mastercard) — via Stripe',
              'Przelew tradycyjny (czas realizacji może być dłuższy)',
              'Płatność odroczona (dostępna dla firm po weryfikacji)',
            ]} />
            <P>Płatność powinna zostać dokonana w ciągu <strong>48 godzin</strong> od złożenia zamówienia. Po tym czasie zamówienie może zostać anulowane.</P>
          </Section>

          <Section num="§8" title="Realizacja i Czas Dostawy">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <InfoRow label="Czas produkcji (standardowy)" value="2–5 dni roboczych" />
              <InfoRow label="Czas produkcji (express)" value="1–2 dni robocze (+30% do ceny)" />
              <InfoRow label="Czas produkcji (seria)" value="Indywidualny — wycena na zapytanie" />
              <InfoRow label="Dostawa krajowa (kurier)" value="1–2 dni robocze" />
              <InfoRow label="Odbiór osobisty (Warszawa)" value="Po wcześniejszym uzgodnieniu" />
            </div>
            <P>Terminy są orientacyjne i mogą ulec zmianie w przypadku wyjątkowych okoliczności (np. awaria urządzeń, braki materiałowe). Usługodawca zobowiązuje się do niezwłocznego poinformowania Klienta o opóźnieniach.</P>
          </Section>

          <Section num="§9" title="Prawo Odstąpienia od Umowy">
            <P>Konsument ma prawo odstąpić od umowy zawartej na odległość w terminie <strong>14 dni</strong> bez podania przyczyny, zgodnie z art. 27 ustawy o prawach konsumenta.</P>
            <InfoBox>
              <strong>Ważne:</strong> Z uwagi na charakter usługi (produkcja towaru wg indywidualnej specyfikacji), prawo do odstąpienia nie przysługuje po rozpoczęciu druku, tj. po zaakceptowaniu przez Klienta wiadomości e-mail z potwierdzeniem startu produkcji. Klient jest informowany o tej okoliczności przed złożeniem zamówienia.
            </InfoBox>
            <P>Oświadczenie o odstąpieniu należy złożyć mailowo na adres <strong>kontakt@3dgen.pl</strong>. Zwrot płatności nastąpi w ciągu 14 dni od otrzymania oświadczenia, z zastrzeżeniem powyższego wyjątku.</P>
          </Section>

          <Section num="§10" title="Reklamacje i Gwarancja Jakości">
            <P>Usługodawca gwarantuje realizację zamówień zgodnie z parametrami przyjętymi przy składaniu zamówienia. W przypadku niezgodności wydruku z zamówieniem:</P>
            <BulletList items={[
              'Skontaktuj się z nami w ciągu 7 dni od dostawy na adres kontakt@3dgen.pl',
              'Dołącz zdjęcia dokumentujące niezgodność (min. 3 fotografie z różnych perspektyw)',
              'Podaj numer zamówienia i opis stwierdzonej wady',
              'Usługodawca rozpatrzy reklamację w ciągu 14 dni roboczych',
            ]} />
            <P>W przypadku uznanej reklamacji Usługodawca według wyboru Klienta: ponowi wydruk bezpłatnie lub zwróci całość albo część wynagrodzenia.</P>
            <P>Gwarancja nie obejmuje uszkodzeń powstałych po dostawie, wad wynikających z błędów w pliku STL przesłanym przez Klienta oraz normalnego zużycia materiału (szczególnie w przypadku TPU i ABS).</P>
          </Section>

          <Section num="§11" title="Własność Intelektualna">
            <P>Wszelkie prawa do platformy 3DGEN, w tym jej kodu, grafiki, tekstów i algorytmów wyceny, należą do Usługodawcy i są chronione przepisami prawa autorskiego.</P>
            <P>Użytkownik zachowuje pełne prawa do przesyłanych przez siebie plików STL i projektów. Usługodawca nie rości sobie żadnych praw do projektów Klientów.</P>
            <P>Usługodawca może wykorzystywać zdjęcia zrealizowanych wydruków do celów marketingowych wyłącznie za wyraźną zgodą Klienta.</P>
          </Section>

          <Section num="§12" title="Odpowiedzialność">
            <P>Usługodawca nie ponosi odpowiedzialności za:</P>
            <BulletList items={[
              'Szkody wynikające z nieprawidłowego przygotowania pliku STL przez Użytkownika',
              'Przerwy w działaniu serwisu spowodowane siłą wyższą lub pracami konserwacyjnymi',
              'Dokładność automatycznej wyceny w przypadku modeli o niestandardowej geometrii',
              'Treść i jakość modeli 3D przesyłanych przez Użytkowników',
              'Opóźnienia w dostawie niezależne od Usługodawcy (np. winy przewoźnika)',
            ]} />
            <P>Odpowiedzialność Usługodawcy z tytułu niewykonania lub nienależytego wykonania usługi ograniczona jest do wartości zamówienia, którego dotyczy roszczenie.</P>
          </Section>

          <Section num="§13" title="Postanowienia Końcowe">
            <P>Regulamin obowiązuje od dnia {LAST_UPDATED}. Usługodawca zastrzega sobie prawo do zmiany Regulaminu. O zmianach Użytkownicy posiadający konto zostaną poinformowani drogą elektroniczną z <strong>14-dniowym</strong> wyprzedzeniem.</P>
            <P>W sprawach nieuregulowanych niniejszym Regulaminem stosuje się przepisy polskiego prawa, w szczególności Kodeksu cywilnego, ustawy o prawach konsumenta oraz ustawy o świadczeniu usług drogą elektroniczną.</P>
            <P>Wszelkie spory będą rozstrzygane przez sąd właściwy dla siedziby Usługodawcy, z zastrzeżeniem przepisów chroniących Konsumenta. Konsument może skorzystać z pozasądowych metod rozwiązywania sporów, w tym platformy ODR: <strong>ec.europa.eu/consumers/odr</strong>.</P>
            <InfoBox>
              W przypadku pytań dotyczących Regulaminu prosimy o kontakt: <strong>kontakt@3dgen.pl</strong>
            </InfoBox>
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

function LegalFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
        © {new Date().getFullYear()} 3DGEN STUDIO
      </span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/polityka-prywatnosci" style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.15s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>Polityka Prywatności</Link>
        <Link href="/regulamin" style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.05em' }}>Regulamin</Link>
      </div>
    </footer>
  );
}
