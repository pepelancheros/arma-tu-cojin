'use client';

import { useState } from 'react';
import { fabricColors, paintColors, mandalas, type FabricColor, type PaintColor, type Mandala } from '@/lib/catalog';
import { CushionPreview } from './CushionPreview';
import { MandalaSol } from './mandalas/MandalaSol';
import { MandalaLoto } from './mandalas/MandalaLoto';
import { MandalaGeometrico } from './mandalas/MandalaGeometrico';

const mandalaComponents = {
  sol:        MandalaSol,
  loto:       MandalaLoto,
  geometrico: MandalaGeometrico,
};


function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
}

function Checkmark({ light }: { light: boolean }) {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
      <path
        d="M1 4.5L3.8 7.5L10 1"
        stroke={light ? '#2A2420' : '#FAFAF8'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ColorSwatch({
  color,
  selected,
  disabled,
  onClick,
}: {
  color: FabricColor | PaintColor;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      title={color.name}
      onClick={onClick}
      disabled={disabled}
      className="relative w-9 h-9 rounded-full focus:outline-none"
      style={{
        backgroundColor: color.hex,
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: selected
          ? '0 0 0 2.5px #F9F6F1, 0 0 0 4.5px #2A2420'
          : '0 0 0 1px rgba(0,0,0,0.12)',
      }}
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Checkmark light={isLightColor(color.hex)} />
        </span>
      )}
    </button>
  );
}

function MandalaCard({
  mandala,
  selected,
  onClick,
}: {
  mandala: Mandala;
  selected: boolean;
  onClick: () => void;
}) {
  const MandalaComp = mandalaComponents[mandala.id as keyof typeof mandalaComponents];

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 bg-white transition-all hover:scale-105 focus:outline-none ${
        selected ? 'border-[#2A2420] shadow-md' : 'border-[#E8DDD4] hover:border-[#C8B8A8]'
      }`}
    >
      <svg viewBox="0 0 200 200" className="w-14 h-14" aria-hidden="true">
        <circle cx="100" cy="100" r="95" fill="#F0E8DF" />
        <MandalaComp color="#2A2420" />
      </svg>
      <span className="text-xs font-medium tracking-wide text-[#2A2420]">{mandala.name}</span>
    </button>
  );
}

export function CushionCustomizer() {
  const [selectedFabric, setSelectedFabric] = useState<FabricColor>(fabricColors[0]);
  const [selectedPaint, setSelectedPaint]   = useState<PaintColor>(paintColors[0]);
  const [selectedMandala, setSelectedMandala] = useState<Mandala>(mandalas[0]);

  function handleFabricChange(fabric: FabricColor) {
    setSelectedFabric(fabric);
    // If the current paint has the same id as the new fabric, switch to the first different option
    if (selectedPaint.id === fabric.id) {
      const fallback = paintColors.find(p => p.id !== fabric.id);
      if (fallback) setSelectedPaint(fallback);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1] text-[#2A2420]">

      {/* Header */}
      <header className="px-6 py-8 text-center border-b border-[#E8DDD4]">
        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase">
          arma tu cojín
        </h1>
        <p className="mt-2 text-sm tracking-widest text-[#7A6E66]">
          cojines de meditación hechos a mano
        </p>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Cushion preview — sticky on desktop */}
          <div className="lg:sticky lg:top-10">
            <CushionPreview
              fabricColor={selectedFabric.hex}
              paintColor={selectedPaint.hex}
              mandalaId={selectedMandala.id}
            />
            <p className="mt-5 text-center text-sm text-[#7A6E66] tracking-wide">
              {selectedFabric.name} &middot; {selectedPaint.name} &middot; {selectedMandala.name}
            </p>
          </div>

          {/* Options panel */}
          <div className="space-y-10">

            {/* Fabric color */}
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A6E66] mb-4">
                Color de tela
              </h2>
              <div className="flex flex-wrap gap-3 mb-3">
                {fabricColors.map((color) => (
                  <ColorSwatch
                    key={color.id}
                    color={color}
                    selected={selectedFabric.id === color.id}
                    onClick={() => handleFabricChange(color)}
                  />
                ))}
              </div>
              <p className="text-sm text-[#2A2420]">{selectedFabric.name}</p>
            </section>

            {/* Paint color */}
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A6E66] mb-4">
                Color de pintura
              </h2>
              <div className="flex flex-wrap gap-3 mb-3">
                {paintColors.map((color) => (
                  <ColorSwatch
                    key={color.id}
                    color={color}
                    selected={selectedPaint.id === color.id}
                    disabled={color.id === selectedFabric.id}
                    onClick={() => setSelectedPaint(color)}
                  />
                ))}
              </div>
              <p className="text-sm text-[#2A2420]">{selectedPaint.name}</p>
            </section>

            {/* Mandala design */}
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A6E66] mb-4">
                Diseño de mandala
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {mandalas.map((mandala) => (
                  <MandalaCard
                    key={mandala.id}
                    mandala={mandala}
                    selected={selectedMandala.id === mandala.id}
                    onClick={() => setSelectedMandala(mandala)}
                  />
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="pt-2">
              <button className="w-full py-4 bg-[#2A2420] text-[#F9F6F1] text-sm font-medium tracking-[0.18em] uppercase rounded-full hover:bg-[#3D3535] active:scale-[0.98] transition-all">
                Hacer pedido
              </button>
              <p className="mt-3 text-center text-xs text-[#7A6E66]">
                Te contactaremos para confirmar tu pedido
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
