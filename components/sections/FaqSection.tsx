"use client";
import { useState } from 'react';
import { ChevronDown, Package, FileText, CreditCard, Settings, Truck, HelpCircle } from 'lucide-react';

/* ─── Data ─────────────────────────────────── */

const FAQ_CATEGORIES = [
  {
    id: 'pliki',
    label: 'Pliki i modele',
    icon: FileText,
    items: [
      {
        q: 'Jakie formaty plików obsługujecie?',
        a: 'Obsługujemy pliki STL (binarne i ASCII) — najpopularniejszy format w druku 3D. Planujemy wsparcie dla OBJ, 3MF i STEP w kolejnych wersjach platformy. Jeśli posiadasz model w innym formacie, skontaktuj się z nami — pomożemy go przekonwertować.',
      },
      {
        q: 'Jaki jest maksymalny rozmiar pliku?',
        a: 'Akceptujemy pliki do 50 MB. Jeśli Twój model jest większy, skontaktuj się z nami mailowo — przyjmiemy go jako załącznik i wycenimy ręcznie. Większość modeli STL mieści się w limicie po optymalizacji siatki.',
      },
      {
        q: 'Czy mój model jest gotowy do druku (manifold)?',
        a: 'Platforma automatycznie sprawdza, czy model jest zamkniętą bryłą (waterproof mesh). Jeśli wykryjemy błędy geometryczne — otwarty brzeg, odwrócone normalne lub punkty zdegenerowane — poinformujemy Cię z opisem problemu. W razie potrzeby możemy naprawić model za dodatkową opłatą.',
      },
      {
        q: 'Czy model 3D musi być zaprojektowany specjalnie pod druk FDM?',
        a: 'Nie jest to wymóg, ale modele zoptymalizowane pod FDM dają lepsze efekty. Zalecamy: unikanie nawisów powyżej 45°, minimalną grubość ścianki 1.2 mm oraz unikanie płynących przekrojów. Jeśli masz pytania o geometrię — napisz do nas przed złożeniem zamówienia.',
      },
    ],
  },
  {
    id: 'wycena',
    label: 'Wycena i cena',
    icon: CreditCard,
    items: [
      {
        q: 'Jak dokładna jest automatyczna wycena?',
        a: 'Algorytm oblicza objętość z siatki triangulacyjnej z dokładnością poniżej 1%. Cena uwzględnia zużycie materiału, czas maszyny, obciążenie serwisowe i przygotowanie do druku. Błąd względem wyceny ręcznej nie przekracza 3% — wystarczający do każdego zamówienia produkcyjnego.',
      },
      {
        q: 'Co wchodzi w cenę druku?',
        a: 'Cena zawiera: materiał (z uwzględnieniem wypełnienia i supportów), czas maszyny w przeliczeniu na stawkę godzinową, kontrolę jakości przed wysyłką oraz standardowe pakowanie. Opcje dodatkowe (obróbka powierzchni, malowanie, ekspresowe terminy) są wyceniane osobno.',
      },
      {
        q: 'Czy przy dużych seriach mogę liczyć na rabat?',
        a: 'Tak. Przy zamówieniach powyżej 10 sztuk identycznego modelu naliczamy rabat materiałowy od 8% wzwyż. Powyżej 50 sztuk — negocjujemy stawki indywidualnie. Skontaktuj się z nami przed złożeniem zamówienia na seryjną produkcję.',
      },
      {
        q: 'Czy cena obejmuje podatek VAT?',
        a: 'Wycena pokazuje zarówno kwotę netto jak i brutto (z 23% VAT). Wystawiamy fakturę VAT do każdego zamówienia. Dla klientów z UE posiadających numer VAT możliwe jest wystawienie faktury bez podatku w trybie odwrotnego obciążenia.',
      },
    ],
  },
  {
    id: 'produkcja',
    label: 'Produkcja i jakość',
    icon: Settings,
    items: [
      {
        q: 'Jaka jest tolerancja wymiarowa wydruków?',
        a: 'Dla standardowej jakości (0.2 mm warstwa) tolerancja wynosi ±0.2 mm. Dla jakości wysokiej (0.12 mm) — ±0.1 mm. W przypadku elementów pasowanych (łożyska, wały, złącza) zalecamy drukowanie na jakości wysokiej i testowanie fitów na prototypie przed serią.',
      },
      {
        q: 'Jaki jest maksymalny rozmiar wydruku?',
        a: 'Nasze drukarki FDM obsługują modele do 300 × 300 × 400 mm. Większe elementy możemy dzielić na części i sklejać (za dodatkową opłatą). Dla zamówień wymagających wydruku na urządzeniach SLA/SLS — skontaktuj się z nami bezpośrednio.',
      },
      {
        q: 'Czy mogę zamówić wiele sztuk tego samego modelu?',
        a: 'Tak. Kalkulator uwzględnia ilość sztuk przy przeliczaniu ceny — druk seryjny jest proporcjonalnie tańszy. Możesz zamówić od 1 do 9999 sztuk w jednym zleceniu. Przy seriach powyżej 50 szt. preferujemy kontakt mailowy dla uzgodnienia logistyki.',
      },
      {
        q: 'Czy oferujecie obróbkę powierzchni i wykończenie?',
        a: 'Tak. Dostępne opcje: wygładzanie acetonowe (ABS), szlifowanie papierem ściernym, lakierowanie, malowanie ProtoColor (wybór z palety RAL) oraz zatapianie żywicą epoksydową dla PLA. Opcje można wybrać w formularzu zamówienia po akceptacji wyceny.',
      },
      {
        q: 'Jaka technologia druku jest stosowana?',
        a: 'Nasza farma składa się z 15+ drukarek FDM klasy produkcyjnej. Realizujemy też zlecenia SLA (żywice fotopolimerowe) dla modeli wymagających bardzo wysokiej precyzji i gładkości. SLA wyceniamy wyłącznie indywidualnie — skontaktuj się z nami.',
      },
    ],
  },
  {
    id: 'dostawa',
    label: 'Dostawa i realizacja',
    icon: Truck,
    items: [
      {
        q: 'Ile trwa realizacja zamówienia?',
        a: 'Standardowe modele z PLA lub PETG: 24 h robocze. Bardziej złożone geometrie lub wiele kolorów: 48 h. Duże serie (powyżej 20 szt.) lub materiały specjalne (ABS, TPU): 48–72 h. Wszystkie terminy liczone od potwierdzenia płatności — informujemy o każdym kroku realizacji.',
      },
      {
        q: 'Jakie mają Państwo metody dostawy?',
        a: 'Realizujemy wysyłkę przez InPost (paczkomat i kurier), DHL i DPD. Do każdego zamówienia dodajemy ubezpieczenie transportowe. Możliwy jest też odbiór osobisty w Warszawie — po wcześniejszym umówieniu terminu. Koszt dostawy jest liczony osobno poza wyceną modelu.',
      },
      {
        q: 'Co jeśli mój wydruk dotrze uszkodzony?',
        a: 'Każde zamówienie jest pakowane przemysłowo z pianką ochronną. Jeśli mimo to dojdzie do uszkodzenia — zrobimy wydruk ponownie bezpłatnie po otrzymaniu zdjęć. Reklamacje rozpatrujemy w ciągu 24 h roboczych.',
      },
    ],
  },
  {
    id: 'inne',
    label: 'Inne pytania',
    icon: HelpCircle,
    items: [
      {
        q: 'Czy mój projekt jest objęty poufnością?',
        a: 'Tak. Przesłane pliki STL są przechowywane na szyfrowanych serwerach i nie są udostępniane stronom trzecim. Na życzenie podpisujemy umowę NDA przed przyjęciem zlecenia — szczególnie dla klientów business.',
      },
      {
        q: 'Czy mogę anulować lub zmienić zamówienie?',
        a: 'Zamówienie można anulować bezpłatnie do momentu rozpoczęcia druku (zwykle do 2 h po potwierdzeniu). Po rozpoczęciu produkcji — możliwy jest zwrot 50% kwoty. Zmiany parametrów (kolor, ilość) akceptujemy mailowo przed wejściem na maszynę.',
      },
      {
        q: 'Czy wystawiacie faktury VAT dla firm?',
        a: 'Tak. Wystawiamy fakturę VAT automatycznie do każdego zamówienia. Obsługujemy firmy z całej Unii Europejskiej — możliwe faktury w EUR z odwrotnym obciążeniem VAT. Dane do faktury można podać przy składaniu zamówienia.',
      },
      {
        q: 'Czy obsługujecie zamówienia poza Polską?',
        a: 'Obsługujemy klientów z całej Europy. Wysyłamy do 30 krajów UE. Ceny wyceny są w PLN — możemy wystawić fakturę w EUR lub GBP na życzenie. Czas dostawy poza Polskę: 3–5 dni roboczych.',
      },
    ],
  },
];

/* ─── Sub-components ────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', textAlign: 'left', gap: '1rem',
          transition: 'background 0.15s',
          minHeight: '56px',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      >
        <span style={{ fontWeight: 600, fontSize: 'clamp(0.875rem, 2vw, 0.95rem)', lineHeight: 1.5, paddingTop: '0.05rem' }}>{q}</span>
        <ChevronDown size={18} style={{
          color: 'var(--accent)', flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease',
          marginTop: '0.1rem',
        }} />
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>{a}</div>
    </div>
  );
}

/* ─── Main Component ────────────────────────── */

export default function FaqSection() {
  const [activeCat, setActiveCat] = useState('pliki');
  const category = FAQ_CATEGORIES.find(c => c.id === activeCat) || FAQ_CATEGORIES[0];
  const CatIcon = category.icon;

  return (
    <section id="faq" className="faq-section">
      <div className="container" style={{ padding: 0 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <div>
            <div className="section-marker">
              <div className="section-marker-line" />
              <span className="label-tag">Pytania i odpowiedzi</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Wszystko,<br /><span className="text-gradient">co chcesz wiedzieć</span>
            </h2>
          </div>
          <a href="mailto:kontakt@3dgen.pl" className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.75rem 1.25rem' }}>
            Napisz do nas →
          </a>
        </div>

        {/* ── Category Tabs ── zawsze widoczne nad akordeonem ── */}
        <div className="faq-tabs">
          {FAQ_CATEGORIES.map(cat => {
            const TabIcon = cat.icon;
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`faq-tab-btn${isActive ? ' active' : ''}`}
              >
                <TabIcon size={16} style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.15rem' }}>
                  <span className="faq-tab-label">{cat.label}</span>
                  <span className="faq-tab-count">{cat.items.length} pytań</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Accordion panel ── */}
        <div style={{ border: '1px solid var(--border)', borderTop: 'none' }}>
          <div style={{
            padding: '0.875rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-2)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <CatIcon size={14} style={{ color: 'var(--accent)' }} />
            <span className="label-tag">{category.label}</span>
            <span className="label-tag" style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}>
              {category.items.length} pytań
            </span>
          </div>
          {category.items.map(faq => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--bg-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
              <Package size={16} style={{ color: 'var(--accent)' }} />
              <span style={{ fontWeight: 600, fontSize: '1rem' }}>Masz inne pytanie?</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Odpowiadamy w ciągu godziny w dni robocze — mailowo lub telefonicznie.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <a href="mailto:kontakt@3dgen.pl" className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '0.75rem 1.5rem' }}>
              Email →
            </a>
            <a href="tel:+48123456789" className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '0.75rem 1.5rem' }}>
              Telefon
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
