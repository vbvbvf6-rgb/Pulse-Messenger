export default function PulseLogo({ size = 40 }: { size?: number }) {
  const id = `nl_${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}_bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffb347"/>
          <stop offset="50%" stopColor="#ff6b35"/>
          <stop offset="100%" stopColor="#e63200"/>
        </linearGradient>
        <linearGradient id={`${id}_shine`} x1="15" y1="15" x2="55" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <filter id={`${id}_glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`${id}_shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#e63200" floodOpacity="0.35"/>
        </filter>
      </defs>

      {/* Background rounded square */}
      <rect x="4" y="4" width="92" height="92" rx="22" fill={`url(#${id}_bg)`} filter={`url(#${id}_shadow)`}/>

      {/* Nova 4-pointed star burst */}
      <path
        d="M50 15 C50 15 54 42 85 50 C54 58 50 85 50 85 C50 85 46 58 15 50 C46 42 50 15 50 15Z"
        fill="white"
        opacity="0.93"
        filter={`url(#${id}_glow)`}
      />

      {/* Shine on star */}
      <path
        d="M50 15 C50 15 54 42 85 50 C54 58 50 85 50 85 C50 85 46 58 15 50 C46 42 50 15 50 15Z"
        fill={`url(#${id}_shine)`}
      />

      {/* Center glow dot */}
      <circle cx="50" cy="50" r="5" fill="white" opacity="0.85"/>
    </svg>
  );
}
