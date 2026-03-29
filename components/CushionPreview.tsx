import { MandalaSol } from './mandalas/MandalaSol';
import { MandalaLoto } from './mandalas/MandalaLoto';
import { MandalaGeometrico } from './mandalas/MandalaGeometrico';

type Props = {
  fabricColor: string;
  paintColor: string;
  mandalaId: string;
};

const mandalaMap = {
  sol:        MandalaSol,
  loto:       MandalaLoto,
  geometrico: MandalaGeometrico,
};

export function CushionPreview({ fabricColor, paintColor, mandalaId }: Props) {
  const MandalaComponent = mandalaMap[mandalaId as keyof typeof mandalaMap] ?? MandalaSol;

  return (
    <div className="flex items-center justify-center w-full">
      <svg
        viewBox="0 0 240 240"
        className="w-full max-w-[320px]"
        style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.22))' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient to simulate a convex cushion */}
          <radialGradient id="cushionLight" cx="36%" cy="32%" r="60%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.28" />
            <stop offset="55%"  stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.15" />
          </radialGradient>
          <clipPath id="cushionBounds">
            <circle cx="120" cy="120" r="108" />
          </clipPath>
        </defs>

        {/* Main cushion circle */}
        <circle cx="120" cy="120" r="108" fill={fabricColor} />

        {/* Depth/light gradient overlay */}
        <circle cx="120" cy="120" r="108" fill="url(#cushionLight)" />

        {/* Seam ring */}
        <circle
          cx="120" cy="120" r="105"
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="3"
        />

        {/* Mandala — designed in 200×200 space (center 100,100), shifted to cushion center (120,120) */}
        <g transform="translate(20, 20)" clipPath="url(#cushionBounds)">
          <MandalaComponent color={paintColor} />
        </g>
      </svg>
    </div>
  );
}
