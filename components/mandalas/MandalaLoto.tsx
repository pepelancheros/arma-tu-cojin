// Mandala "Mandala" — 8-fold lotus, hollow outer petals with teardrop cutouts
const ANGLES_8 = [0, 45, 90, 135, 180, 225, 270, 315];
const HALF_8   = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

// Outer petal with teardrop hole (fillRule="evenodd")
// Outer shell: concave petal base r=54 (y=46), tip r=83 (y=17)
// Inner cutout: smaller teardrop base r=59 (y=41), tip r=79 (y=21)
const OUTER_PETAL =
  'M 100 46 C 88 36, 87 21, 100 17 C 113 21, 112 36, 100 46 Z ' +
  'M 100 41 C 95 33, 94 24, 100 21 C 106 24, 105 33, 100 41 Z';

// Slender diamond between outer petals, at r≈62 (y=38 to y=20)
const OUTER_DIAMOND = 'M 100 20 L 104 31 L 100 42 L 96 31 Z';

// Thin separator ring: annulus r=50 to r=47
const OUTER_RING_D =
  'M 50 100 A 50 50 0 1 0 150 100 A 50 50 0 1 0 50 100 Z ' +
  'M 53 100 A 47 47 0 1 0 147 100 A 47 47 0 1 0 53 100 Z';

// Inner petal (solid, concave): base r=32 (y=68), tip r=46 (y=54)
const INNER_PETAL = 'M 100 68 C 93 63, 92 57, 100 54 C 108 57, 107 63, 100 68 Z';

// Small diamond between inner petals
const INNER_DIAMOND = 'M 100 54 L 103 61 L 100 68 L 97 61 Z';

// Center ring: annulus r=17 to r=13
const CENTER_RING_D =
  'M 83 100 A 17 17 0 1 0 117 100 A 17 17 0 1 0 83 100 Z ' +
  'M 87 100 A 13 13 0 1 0 113 100 A 13 13 0 1 0 87 100 Z';

export function MandalaLoto({ color }: { color: string }) {
  return (
    <g fill={color} stroke="none">
      {/* Thin separator ring */}
      <path fillRule="evenodd" d={OUTER_RING_D} />

      {/* 8 outer hollow petals */}
      {ANGLES_8.map(a => (
        <path key={`op-${a}`} fillRule="evenodd" d={OUTER_PETAL}
              transform={`rotate(${a}, 100, 100)`} />
      ))}

      {/* 8 slender diamond accents between outer petals */}
      {HALF_8.map(a => (
        <path key={`od-${a}`} d={OUTER_DIAMOND}
              transform={`rotate(${a}, 100, 100)`} />
      ))}

      {/* 8 inner solid petals */}
      {ANGLES_8.map(a => (
        <path key={`ip-${a}`} d={INNER_PETAL}
              transform={`rotate(${a}, 100, 100)`} />
      ))}

      {/* 8 small diamonds between inner petals */}
      {HALF_8.map(a => (
        <path key={`id-${a}`} d={INNER_DIAMOND}
              transform={`rotate(${a}, 100, 100)`} />
      ))}

      {/* Center ring */}
      <path fillRule="evenodd" d={CENTER_RING_D} />

      {/* Center dot */}
      <circle cx="100" cy="100" r="7" />
    </g>
  );
}
