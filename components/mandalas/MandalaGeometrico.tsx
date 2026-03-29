// Mandala "Celta" — bold geometric style with 6-fold symmetry, inspired by Celtic patterns
const MAIN = [0, 60, 120, 180, 240, 300];
const ALT  = [30, 90, 150, 210, 270, 330];

// Wide thick wedge (the dominant shape, extends r≈15 to r≈58)
const WEDGE =
  'M 94 84 C 91 67, 91 51, 95 45 C 97 40, 103 40, 105 45 C 109 51, 109 67, 106 84 C 103 88, 97 88, 94 84 Z';

// Angular arrow accent between wedges (r≈30 to r≈52)
const ARROW = 'M 100 68 L 107 54 L 100 48 L 93 54 Z';

// Small outer square accent (r≈80)
const SQUARE_Y = 14;

// 6-pointed star polygon: r_outer=20, r_inner=10, 12 points alternating
// x = 100 + r*sin(angle), y = 100 - r*cos(angle)
const STAR =
  '100,80 104.3,91.3 113.9,91.3 108.7,99 113.9,107 104.3,107 100,118 95.7,107 86.1,107 91.3,99 86.1,91.3 95.7,91.3';

export function MandalaGeometrico({ color }: { color: string }) {
  return (
    <g>
      {/* Outer decorative ring */}
      <circle cx="100" cy="100" r="79" fill="none" stroke={color} strokeWidth="2.5" />

      {/* Small square accents at outer ring (6 positions) */}
      {MAIN.map((angle) => (
        <rect
          key={`sq-${angle}`}
          x="97.5"
          y={SQUARE_Y}
          width="5"
          height="5"
          fill={color}
          transform={`rotate(${angle}, 100, 100)`}
        />
      ))}

      {/* 6 main thick wedges */}
      {MAIN.map((angle) => (
        <path key={`w-${angle}`} d={WEDGE} fill={color} transform={`rotate(${angle}, 100, 100)`} />
      ))}

      {/* 6 arrow accents between wedges */}
      {ALT.map((angle) => (
        <path key={`a-${angle}`} d={ARROW} fill={color} transform={`rotate(${angle}, 100, 100)`} />
      ))}

      {/* Inner concentric ring */}
      <circle cx="100" cy="100" r="42" fill="none" stroke={color} strokeWidth="2.5" />

      {/* Center 6-pointed star */}
      <polygon points={STAR} fill={color} />

      {/* Center dot */}
      <circle cx="100" cy="100" r="7" fill={color} />
    </g>
  );
}
