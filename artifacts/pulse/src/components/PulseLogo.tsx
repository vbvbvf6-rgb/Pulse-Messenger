export default function PulseLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pl_petals" cx="50" cy="50" r="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ff3300" stopOpacity="0.05"/>
          <stop offset="40%"  stopColor="#ff5500" stopOpacity="0.6"/>
          <stop offset="80%"  stopColor="#ff8800" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="1"/>
        </radialGradient>
        <radialGradient id="pl_core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="35%"  stopColor="#ffe566"/>
          <stop offset="70%"  stopColor="#ff7700" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#ff3300" stopOpacity="0"/>
        </radialGradient>
        <filter id="pl_glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="pl_softglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 6 petals */}
      <g filter="url(#pl_glow)">
        <path d="M50,50 C43,42 40,26 50,15 C60,26 57,42 50,50Z" fill="url(#pl_petals)"/>
        <path d="M50,50 C43,42 40,26 50,15 C60,26 57,42 50,50Z" fill="url(#pl_petals)" transform="rotate(60,50,50)"/>
        <path d="M50,50 C43,42 40,26 50,15 C60,26 57,42 50,50Z" fill="url(#pl_petals)" transform="rotate(120,50,50)"/>
        <path d="M50,50 C43,42 40,26 50,15 C60,26 57,42 50,50Z" fill="url(#pl_petals)" transform="rotate(180,50,50)"/>
        <path d="M50,50 C43,42 40,26 50,15 C60,26 57,42 50,50Z" fill="url(#pl_petals)" transform="rotate(240,50,50)"/>
        <path d="M50,50 C43,42 40,26 50,15 C60,26 57,42 50,50Z" fill="url(#pl_petals)" transform="rotate(300,50,50)"/>
      </g>

      {/* Center soft halo */}
      <circle cx="50" cy="50" r="17" fill="url(#pl_core)" filter="url(#pl_softglow)" opacity="0.65"/>

      {/* Center bright core */}
      <circle cx="50" cy="50" r="8" fill="url(#pl_core)" filter="url(#pl_glow)"/>

      {/* White dot */}
      <circle cx="50" cy="50" r="3.5" fill="white" opacity="0.97"/>
    </svg>
  );
}
