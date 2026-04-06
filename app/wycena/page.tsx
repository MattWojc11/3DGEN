"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ModelViewer from '@/components/ModelViewer';
import { UploadCloud, Package, Settings, CreditCard, ChevronLeft, Box, Clock, Layers } from 'lucide-react';

type QuoteResult = {
  netPrice: number;
  grossPrice: number;
  breakdown: {
    materialUsedGrams: number;
    materialCost: number;
    timeCost: number;
    estimatedHours: number;
  };
};

const COLORS = ['#e2e8f0', '#ff6b00', '#ef4444', '#10b981', '#3b82f6', '#a855f7', '#111111'];
const MATERIALS = ['PLA', 'PETG', 'ABS', 'TPU'];
const QUALITIES = [
  { value: 'Low',    label: 'Robocza',   sub: '0.28 mm' },
  { value: 'Normal', label: 'Standardowa', sub: '0.20 mm' },
  { value: 'High',   label: 'Wysoka',    sub: '0.12 mm' },
];

export default function WycenaPage() {
  const [fileUrl, setFileUrl]       = useState<string | null>(null);
  const [fileName, setFileName]     = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [volume, setVolume]         = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{ x: number; y: number; z: number } | null>(null);

  const [material, setMaterial] = useState('PLA');
  const [quality, setQuality]   = useState('Normal');
  const [infill, setInfill]     = useState(20);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor]       = useState('#e2e8f0');

  const [quote, setQuote]       = useState<QuoteResult | null>(null);
  const [isQuoting, setIsQuoting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  /* ─── Upload handler ───────────────────── */
  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.stl')) {
      setErrorMsg('Obsługiwane formaty: .STL');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('Plik przekracza limit 50 MB.');
      return;
    }
    setFileName(file.name);
    setFileUrl(URL.createObjectURL(file));
    setErrorMsg('');
    setIsUploading(true);

    const fd = new FormData();
    fd.append('file', file);
    try {
      const res  = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setVolume(data.volumeCm3);
      setDimensions(data.dimensions);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Błąd analizy modelu.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  /* ─── Real-time quote ──────────────────── */
  useEffect(() => {
    if (!volume) return;
    const timer = setTimeout(async () => {
      setIsQuoting(true);
      try {
        const res  = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ volume, material, quality, infill, quantity }),
        });
        const data = await res.json();
        setQuote(data);
      } catch {
        /* silently fail */
      } finally {
        setIsQuoting(false);
      }
    }, 250); // debounce 250ms
    return () => clearTimeout(timer);
  }, [volume, material, quality, infill, quantity]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ─── Top Bar ─────────────────────────── */}
      <header style={{ borderBottom: '1px solid var(--border)', background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ padding: '0 2rem', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
              <ChevronLeft size={14} /> Powrót
            </Link>
            <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)' }}>
                <Box size={12} color="#000" />
              </div>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                3D<span style={{ color: 'var(--accent)' }}>GEN</span> <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ Wycena</span>
              </span>
            </div>
          </div>
          {volume && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="label-tag">Model załadowany</span>
              <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
            </div>
          )}
        </div>
      </header>

      {/* ─── Error ──────────────────────────────── */}
      {errorMsg && (
        <div style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid #7f1d1d', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '4px', height: '4px', background: '#ef4444', flexShrink: 0, borderRadius: '50%' }} />
          <span style={{ color: '#fca5a5', fontFamily: "'Space Mono', monospace", fontSize: '0.8rem' }}>{errorMsg}</span>
        </div>
      )}

      {/* ─── Main Layout ─────────────────────── */}
      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 420px', minHeight: 0 }}>

        {/* LEFT — 3D Viewer / Upload */}
        <div style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>

          {!fileUrl ? (
            /* Drop Zone */
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                background: isDragging ? 'var(--accent-muted)' : 'transparent',
                transition: 'background 0.2s',
                border: isDragging ? '1px solid var(--accent)' : 'none',
                gap: '1.5rem',
                padding: '4rem',
              }}>
              <input type="file" accept=".stl" onChange={handleInputChange}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />

              <div style={{ width: '72px', height: '72px', border: `2px solid ${isDragging ? 'var(--accent)' : 'var(--border-light)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>
                <UploadCloud size={32} style={{ color: isDragging ? 'var(--accent)' : 'var(--text-muted)' }} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Przeciągnij plik STL
                </div>
                <div className="label-tag">lub kliknij, aby wybrać z dysku · maks. 50 MB</div>
              </div>
            </div>

          ) : (
            /* 3D Viewer */
            <div style={{ flex: 1, position: 'relative' }}>
              <ModelViewer fileUrl={fileUrl} color={color} />

              {/* File badge */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', padding: '0.5rem 0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Box size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</span>
              </div>

              {isUploading && (
                <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,10,10,0.9)', border: '1px solid var(--accent)', padding: '0.625rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="spinner" />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--accent)' }}>АНАЛИЗИРУЮ ГЕОМЕТРИЮ…</span>
                </div>
              )}
            </div>
          )}

          {/* Dimensions bar */}
          {dimensions && (
            <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', gap: '2rem', background: 'var(--bg-2)' }}>
              {[
                { k: 'X', v: `${dimensions.x.toFixed(1)} cm` },
                { k: 'Y', v: `${dimensions.y.toFixed(1)} cm` },
                { k: 'Z', v: `${dimensions.z.toFixed(1)} cm` },
                { k: 'Objętość', v: `${volume?.toFixed(2)} cm³` },
              ].map(d => (
                <div key={d.k}>
                  <div className="label-tag" style={{ marginBottom: '0.25rem' }}>{d.k}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.875rem', color: 'var(--text)' }}>{d.v}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Config + Price */}
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

          {/* Section header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Settings size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Parametry druku</span>
          </div>

          {/* Config fields */}
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>

            {/* Material */}
            <div>
              <label>Materiał</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {MATERIALS.map(m => (
                  <button key={m} onClick={() => setMaterial(m)}
                    style={{
                      background: material === m ? 'var(--accent)' : 'var(--bg-3)',
                      color: material === m ? '#000' : 'var(--text-muted)',
                      border: '1px solid ' + (material === m ? 'var(--accent)' : 'var(--border)'),
                      padding: '0.625rem 0.25rem',
                      cursor: 'pointer',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      transition: 'all 0.15s',
                    }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div>
              <label>Jakość Wydruku</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {QUALITIES.map(q => (
                  <button key={q.value} onClick={() => setQuality(q.value)}
                    style={{
                      background: quality === q.value ? 'var(--accent-muted)' : 'var(--bg-3)',
                      color: quality === q.value ? 'var(--accent)' : 'var(--text-muted)',
                      border: '1px solid ' + (quality === q.value ? 'var(--accent)' : 'var(--border)'),
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.15s',
                      textAlign: 'left',
                    }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.875rem' }}>{q.label}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem' }}>{q.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Infill */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ marginBottom: 0 }}>Wypełnienie</label>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>{infill}%</span>
              </div>
              <input type="range" min="0" max="100" step="10" value={infill}
                onChange={e => setInfill(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
                <span className="label-tag">Lekkie</span>
                <span className="label-tag">Lite</span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label>Ilość sztuk</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ width: '36px', height: '36px', background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  −
                </button>
                <input type="number" min="1" max="9999" value={quantity}
                  onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                  style={{ textAlign: 'center', fontFamily: "'Space Mono', monospace" }} />
                <button onClick={() => setQuantity(q => q + 1)}
                  style={{ width: '36px', height: '36px', background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  +
                </button>
              </div>
            </div>

            {/* Color swatches */}
            <div>
              <label>Kolor filamentu</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {COLORS.map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    style={{
                      width: '28px', height: '28px',
                      background: c, cursor: 'pointer',
                      border: color === c ? '2px solid var(--accent)' : '2px solid transparent',
                      outline: color === c ? '1px solid var(--accent)' : '1px solid var(--border)',
                      transition: 'all 0.15s',
                    }} />
                ))}
              </div>
            </div>
          </div>

          {/* ─── Price Panel ─────────────────── */}
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>

            {/* Price header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CreditCard size={16} style={{ color: 'var(--accent)' }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Wycena</span>
              {isQuoting && <div className="spinner" style={{ marginLeft: 'auto' }} />}
            </div>

            {/* Price body */}
            <div style={{ padding: '1.5rem' }}>
              {!volume ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-dim)', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                  WGRAJ MODEL ABY UZYSKAĆ WYCENĘ
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div className="label-tag" style={{ marginBottom: '0.25rem' }}>Brutto (23% VAT)</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '2.5rem', fontWeight: 700, color: quote ? 'var(--accent)' : 'var(--text-dim)', lineHeight: 1, transition: 'color 0.3s' }}>
                      {quote ? `${quote.grossPrice.toFixed(2)} zł` : '---'}
                    </div>
                    {quote && (
                      <div className="label-tag" style={{ marginTop: '0.25rem' }}>
                        Netto: {quote.netPrice.toFixed(2)} zł
                      </div>
                    )}
                  </div>

                  {quote && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-3)', borderLeft: '2px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Package size={12} style={{ color: 'var(--text-muted)' }} />
                          <span className="label-tag" style={{ margin: 0 }}>Materiał</span>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem' }}>{quote.breakdown.materialUsedGrams}g / {quote.breakdown.materialCost.toFixed(2)} zł</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Clock size={12} style={{ color: 'var(--text-muted)' }} />
                          <span className="label-tag" style={{ margin: 0 }}>Czas maszyny</span>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem' }}>~{quote.breakdown.estimatedHours}h / {quote.breakdown.timeCost.toFixed(2)} zł</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Layers size={12} style={{ color: 'var(--text-muted)' }} />
                          <span className="label-tag" style={{ margin: 0 }}>Ilość</span>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem' }}>× {quantity} szt.</span>
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-primary w-full"
                    disabled={!quote || isUploading || isQuoting}
                    style={{ opacity: (!quote || isUploading || isQuoting) ? 0.4 : 1, fontSize: '0.8rem' }}>
                    <CreditCard size={16} /> Złóż Zamówienie
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
