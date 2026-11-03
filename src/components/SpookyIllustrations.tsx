import React from 'react';

/**
 * Bespoke inline SVG Title Lockup for Cover Screen
 */
export const TitleEmblemSvg: React.FC = () => (
  <svg
    viewBox="0 0 760 185"
    className="w-full max-w-[660px] mx-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
    role="img"
    aria-label="HALLOWEEN ESCAPE"
  >
    <defs>
      <filter id="titleGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="0" floodColor="#0D161E" />
        <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#F26B21" floodOpacity="0.55" />
      </filter>
    </defs>

    {/* Decorative spooky bat wings & cobweb flourish behind title */}
    <path
      d="M70,95 Q35,55 12,72 Q35,92 22,115 Q52,108 70,122 Z"
      fill="#0D161E"
      stroke="#FDF6E2"
      strokeWidth="2.5"
    />
    <path
      d="M690,95 Q725,55 748,72 Q725,92 738,115 Q708,108 690,122 Z"
      fill="#0D161E"
      stroke="#FDF6E2"
      strokeWidth="2.5"
    />

    {/* Main Title Text in Creepster */}
    <text
      x="380"
      y="98"
      textAnchor="middle"
      className="font-creepster"
      fontSize="82"
      fill="#F26B21"
      stroke="#FDF6E2"
      strokeWidth="4"
       style={{ paintOrder: 'stroke fill' }}
      filter="url(#titleGlow)"
    >
      HALLOWEEN ESCAPE
    </text>

    {/* Ribbon / Banner for Tagline */}
    <g transform="translate(210, 122)">
      <rect
        x="0"
        y="0"
        width="340"
        height="48"
        rx="24"
        fill="#0D161E"
        stroke="#FDF6E2"
        strokeWidth="3"
      />
      <circle cx="24" cy="24" r="6" fill="#F26B21" />
      <circle cx="316" cy="24" r="6" fill="#F26B21" />
      <text
        x="170"
        y="32"
        textAnchor="middle"
        className="font-storybook"
        fontSize="26"
        fill="#FDF6E2"
      >
        Get all the candy!
      </text>
    </g>
  </svg>
);

/**
 * Kid in a skeleton costume holding a glowing pumpkin candy bucket
 */
export const SkeletonKidIllustration: React.FC<{
  className?: string;
  celebrating?: boolean;
}> = ({ className = 'w-52 h-64', celebrating = false }) => (
  <svg
    viewBox="0 0 240 300"
    className={`${className} drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]`}
    role="img"
    aria-label="Kid in a skeleton costume holding a pumpkin candy bucket"
  >
    {/* Ground shadow */}
    <ellipse cx="120" cy="282" rx="64" ry="12" fill="#091016" opacity="0.65" />

    {/* Cape / hoodie back */}
    <path
      d="M78,125 Q55,195 62,245 L178,245 Q185,195 162,125 Z"
      fill="#0D161E"
      stroke="#FDF6E2"
      strokeWidth="3"
    />

    {/* Legs */}
    <rect x="88" y="215" width="22" height="58" rx="10" fill="#0D161E" stroke="#FDF6E2" strokeWidth="3" />
    <rect x="130" y="215" width="22" height="58" rx="10" fill="#0D161E" stroke="#FDF6E2" strokeWidth="3" />
    {/* Painted leg bones */}
    <line x1="99" y1="225" x2="99" y2="262" stroke="#FDF6E2" strokeWidth="6" strokeLinecap="round" />
    <line x1="141" y1="225" x2="141" y2="262" stroke="#FDF6E2" strokeWidth="6" strokeLinecap="round" />

    {/* Boots */}
    <path d="M78,268 Q88,255 112,268 L112,278 L78,278 Z" fill="#F26B21" stroke="#FDF6E2" strokeWidth="2.5" />
    <path d="M128,268 Q152,255 162,268 L162,278 L128,278 Z" fill="#F26B21" stroke="#FDF6E2" strokeWidth="2.5" />

    {/* Torso suit */}
    <rect x="76" y="122" width="88" height="102" rx="28" fill="#0D161E" stroke="#FDF6E2" strokeWidth="3.5" />

    {/* Cute Painted Ribcage */}
    <line x1="120" y1="136" x2="120" y2="204" stroke="#FDF6E2" strokeWidth="6" strokeLinecap="round" />
    <path d="M94,148 Q120,158 146,148" fill="none" stroke="#FDF6E2" strokeWidth="6" strokeLinecap="round" />
    <path d="M92,168 Q120,178 148,168" fill="none" stroke="#FDF6E2" strokeWidth="6" strokeLinecap="round" />
    <path d="M98,188 Q120,196 142,188" fill="none" stroke="#FDF6E2" strokeWidth="6" strokeLinecap="round" />

    {/* Left Arm */}
    <g transform={celebrating ? 'rotate(-35 80 140)' : 'rotate(0 80 140)'}>
      <path
        d="M78,136 Q42,162 52,198"
        fill="none"
        stroke="#0D161E"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M78,136 Q42,162 52,198"
        fill="none"
        stroke="#FDF6E2"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="52" cy="202" r="10" fill="#FDF6E2" stroke="#0D161E" strokeWidth="2.5" />
    </g>

    {/* Right Arm holding the Pumpkin Bucket */}
    <g transform={celebrating ? 'translate(0, -12)' : ''}>
      <path
        d="M162,136 Q198,158 190,192"
        fill="none"
        stroke="#0D161E"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M162,136 Q198,158 190,192"
        fill="none"
        stroke="#FDF6E2"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="190" cy="195" r="10" fill="#FDF6E2" stroke="#0D161E" strokeWidth="2.5" />

      {/* Pumpkin Candy Bucket */}
      <g transform="translate(152, 188)">
        <path
          d="M10,12 Q38,-14 66,12"
          fill="none"
          stroke="#FDF6E2"
          strokeWidth="3.5"
        />
        {/* Candies poking out */}
        <circle cx="26" cy="12" r="7" fill="#A855F7" stroke="#FDF6E2" strokeWidth="2" />
        <circle cx="48" cy="10" r="8" fill="#10B981" stroke="#FDF6E2" strokeWidth="2" />
        <circle cx="38" cy="8" r="7" fill="#F59E0B" stroke="#FDF6E2" strokeWidth="2" />
        {/* Pumpkin body */}
        <ellipse cx="38" cy="34" rx="32" ry="25" fill="#F26B21" stroke="#FDF6E2" strokeWidth="3" />
        <path d="M26,10 Q18,34 26,58" fill="none" stroke="#9E3A06" strokeWidth="2.5" />
        <path d="M50,10 Q58,34 50,58" fill="none" stroke="#9E3A06" strokeWidth="2.5" />
        {/* Glowing bucket face */}
        <polygon points="24,28 32,28 28,20" fill="#FDF6E2" />
        <polygon points="44,28 52,28 48,20" fill="#FDF6E2" />
        <path d="M22,38 Q38,50 54,38 Q38,44 22,38 Z" fill="#FDF6E2" />
      </g>
    </g>

    {/* Kid Head in Skeleton Hood / Facepaint */}
    <circle cx="120" cy="76" r="46" fill="#0D161E" stroke="#FDF6E2" strokeWidth="4" />
    <circle cx="120" cy="78" r="37" fill="#FDF6E2" />

    {/* Cute dark eye patches & bright pupils */}
    <ellipse cx="104" cy="74" rx="11" ry="13" fill="#0D161E" />
    <ellipse cx="136" cy="74" rx="11" ry="13" fill="#0D161E" />
    <circle cx="106" cy="71" r="4.5" fill="#FDF6E2" />
    <circle cx="138" cy="71" r="4.5" fill="#FDF6E2" />

    {/* Little skeleton nose */}
    <polygon points="120,82 116,89 124,89" fill="#0D161E" />

    {/* Friendly stitched skeleton grin */}
    <path d="M100,97 Q120,110 140,97" fill="none" stroke="#0D161E" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="108" y1="96" x2="108" y2="104" stroke="#0D161E" strokeWidth="2.5" />
    <line x1="120" y1="98" x2="120" y2="106" stroke="#0D161E" strokeWidth="2.5" />
    <line x1="132" y1="96" x2="132" y2="104" stroke="#0D161E" strokeWidth="2.5" />
  </svg>
);

/**
 * Spooky-cute Witch / Monster Guardian at the Door
 */
export const WitchIllustration: React.FC<{
  houseId: number;
  mood: 'idle' | 'happy' | 'cackle';
  className?: string;
}> = ({ houseId, mood, className = 'w-56 h-72' }) => {
  const hatBandColors = ['#F26B21', '#A855F7', '#F59E0B', '#10B981', '#EC4899'];
  const cloakColors = ['#1F3A4D', '#2B193D', '#1B3344', '#232F3E', '#2A163B'];
  const accent = hatBandColors[(houseId - 1) % hatBandColors.length];
  const cloak = cloakColors[(houseId - 1) % cloakColors.length];

  return (
    <svg
      viewBox="0 0 260 320"
      className={`${className} drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)]`}
      role="img"
      aria-label={`House ${houseId} Guardian Witch`}
    >
      {/* Magical aura glow behind witch */}
      <circle
        cx="130"
        cy="170"
        r="95"
        fill={mood === 'cackle' ? '#EF4444' : mood === 'happy' ? '#10B981' : accent}
        opacity="0.18"
      />

      {/* Broomstick held on side */}
      <g transform={mood === 'cackle' ? 'rotate(-10 205 180)' : 'rotate(6 205 180)'}>
        <line x1="205" y1="75" x2="195" y2="265" stroke="#8B5A2B" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M175,255 L215,255 L228,302 Q195,312 162,302 Z"
          fill="#F26B21"
          stroke="#FDF6E2"
          strokeWidth="3"
        />
      </g>

      {/* Witch Cloak */}
      <path
        d="M68,155 Q130,135 192,155 L212,295 Q130,308 48,295 Z"
        fill={cloak}
        stroke="#FDF6E2"
        strokeWidth="3.5"
      />
      {/* Starry cloak pattern */}
      <circle cx="98" cy="225" r="4" fill="#FDF6E2" opacity="0.7" />
      <circle cx="156" cy="245" r="5" fill="#F26B21" opacity="0.8" />
      <circle cx="122" cy="268" r="3.5" fill="#FDF6E2" opacity="0.7" />

      {/* Wavy purple/silver witch hair */}
      <path
        d="M72,95 Q42,140 58,185 Q78,165 88,145 Z"
        fill="#2A4D66"
        stroke="#FDF6E2"
        strokeWidth="2.5"
      />
      <path
        d="M188,95 Q218,140 202,185 Q182,165 172,145 Z"
        fill="#2A4D66"
        stroke="#FDF6E2"
        strokeWidth="2.5"
      />

      {/* Friendly Greenish-Cream Witch Face */}
      <circle cx="130" cy="116" r="42" fill="#D9F2B4" stroke="#FDF6E2" strokeWidth="3.5" />

      {/* Eyes */}
      {mood === 'cackle' ? (
        <>
          <path d="M104,108 L120,116 L104,122" fill="none" stroke="#0D161E" strokeWidth="4" strokeLinecap="round" />
          <path d="M156,108 L140,116 L156,122" fill="none" stroke="#0D161E" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="112" cy="112" r="8" fill="#0D161E" />
          <circle cx="148" cy="112" r="8" fill="#0D161E" />
          <circle cx="114" cy="109" r="3" fill="#FDF6E2" />
          <circle cx="150" cy="109" r="3" fill="#FDF6E2" />
        </>
      )}

      {/* Cute crooked witch nose */}
      <path d="M128,114 Q146,122 132,130" fill="#B8E082" stroke="#0D161E" strokeWidth="2.5" strokeLinecap="round" />

      {/* Mouth */}
      {mood === 'cackle' ? (
        <path
          d="M106,136 Q130,162 154,136 Z"
          fill="#0D161E"
          stroke="#F26B21"
          strokeWidth="2.5"
        />
      ) : mood === 'happy' ? (
        <path
          d="M108,136 Q130,154 152,136"
          fill="none"
          stroke="#0D161E"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M112,138 Q130,148 148,136"
          fill="none"
          stroke="#0D161E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}

      {/* Crooked Pointed Witch Hat */}
      <g transform={mood === 'cackle' ? 'rotate(-5 130 75)' : ''}>
        <ellipse cx="130" cy="82" rx="76" ry="18" fill="#0D161E" stroke="#FDF6E2" strokeWidth="3.5" />
        <path
          d="M78,80 Q112,18 172,10 Q152,42 182,80 Z"
          fill="#0D161E"
          stroke="#FDF6E2"
          strokeWidth="3.5"
        />
        {/* Hat Band & Buckle */}
        <path d="M82,76 Q130,86 178,76 L174,62 Q130,72 86,62 Z" fill={accent} />
        <rect x="120" y="61" width="20" height="18" rx="3" fill="none" stroke="#FDF6E2" strokeWidth="3.5" />
      </g>
    </svg>
  );
};

/**
 * Crooked Haunted House SVG for the Map Screen
 */
export const CrookedHouseIllustration: React.FC<{
  houseId: number;
  isCurrent: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  justUnlocked?: boolean;
}> = ({ houseId, isCurrent, isCompleted, isLocked, justUnlocked = false }) => {
  const roofColors = ['#2B193D', '#1E2D3D', '#3B1E3D', '#1B2D3E', '#3A192E'];
  const wallColors = ['#1F3A4D', '#244258', '#1C3547', '#263D52', '#192F40'];
  const tilts = [-3, 2.5, -2.5, 3, -1.5];

  const roof = roofColors[(houseId - 1) % roofColors.length];
  const wall = wallColors[(houseId - 1) % wallColors.length];
  const tilt = tilts[(houseId - 1) % tilts.length];
  const windowsLit = isCurrent || isCompleted;

  return (
    <div className="relative flex flex-col items-center select-none">
      <svg
        viewBox="0 0 180 210"
        className={`w-28 h-32 md:w-36 md:h-40 transition-transform duration-300 ${
          isCurrent ? 'scale-110 drop-shadow-[0_0_24px_rgba(242,107,33,0.85)]' : 'opacity-90'
        }`}
        style={{ transform: `rotate(${tilt}deg)` }}
        role="img"
        aria-label={`Haunted House ${houseId}`}
      >
        {/* Chimney */}
        <polygon
          points="126,32 146,28 142,78 122,78"
          fill="#0D161E"
          stroke="#FDF6E2"
          strokeWidth="2.5"
        />
        {windowsLit && (
          <circle cx="138" cy="16" r="7" fill="#FDF6E2" opacity="0.45" />
        )}

        {/* Crooked House Body */}
        <polygon
          points="34,92 146,88 138,192 42,192"
          fill={wall}
          stroke="#FDF6E2"
          strokeWidth="3.5"
        />

        {/* Steep Witchy Roof */}
        <polygon
          points="16,96 90,18 164,92 146,94 90,38 34,98"
          fill={roof}
          stroke="#FDF6E2"
          strokeWidth="3.5"
        />
        <polygon points="30,94 90,26 150,90" fill={roof} />

        {/* Attic Round Window */}
        <circle
          cx="90"
          cy="68"
          r="13"
          fill={windowsLit ? '#F26B21' : '#0D161E'}
          stroke="#FDF6E2"
          strokeWidth="2.5"
        />

        {/* Upper Windows */}
        <rect
          x="52"
          y="108"
          width="24"
          height="28"
          rx="4"
          transform="rotate(-4 64 122)"
          fill={windowsLit ? '#FDF6E2' : '#0D161E'}
          stroke="#FDF6E2"
          strokeWidth="2.5"
        />
        <rect
          x="104"
          y="108"
          width="24"
          height="28"
          rx="4"
          transform="rotate(4 116 122)"
          fill={windowsLit ? '#FDF6E2' : '#0D161E'}
          stroke="#FDF6E2"
          strokeWidth="2.5"
        />

        {/* Arched Wooden Door */}
        <path
          d="M74,192 L74,154 Q90,138 106,154 L106,192 Z"
          fill={isCurrent ? '#F26B21' : '#8B4513'}
          stroke="#FDF6E2"
          strokeWidth="3"
        />
        <circle cx="99" cy="172" r="3.5" fill="#FDF6E2" />
      </svg>

      {/* Lock Icon for Locked Houses, or Cracking Lock Animation */}
      {(isLocked || justUnlocked) && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 bg-[#0D161E]/95 border-2 border-[#FDF6E2] rounded-full p-2.5 shadow-lg ${
            justUnlocked ? 'animate-lock-crack' : ''
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FDF6E2]" fill="currentColor">
            <path d="M17 9h-1V7a4 4 0 00-8 0v2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2zm-7-2a2 2 0 114 0v2h-4V7zm3 8.73V17a1 1 0 11-2 0v-1.27a2 2 0 112 0z" />
          </svg>
        </div>
      )}

      {/* Completed Checkmark Badge */}
      {isCompleted && (
        <div
          className="absolute top-2 right-2 bg-emerald-500 border-2 border-[#FDF6E2] text-[#0D161E] font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
          title="House Completed!"
        >
          ✓
        </div>
      )}
    </div>
  );
};

/**
 * Pumpkin Life Counter Icon (3 pumpkins at the top)
 */
export const PumpkinLifeIcon: React.FC<{
  alive: boolean;
  justLost?: boolean;
}> = ({ alive, justLost = false }) => (
  <svg
    viewBox="0 0 48 48"
    className={`w-9 h-9 md:w-10 md:h-10 transition-all duration-300 ${
      alive
        ? 'drop-shadow-[0_0_10px_rgba(242,107,33,0.85)] scale-100'
        : justLost
        ? 'animate-pumpkin-lost'
        : 'opacity-30 scale-75 grayscale'
    }`}
    role="img"
    aria-label={alive ? 'Active Pumpkin Life' : 'Lost Pumpkin Life'}
  >
    <path d="M22,6 Q24,2 28,5 L26,12 L22,12 Z" fill="#10B981" stroke="#FDF6E2" strokeWidth="2" />
    <ellipse cx="24" cy="27" rx="18" ry="15" fill="#F26B21" stroke="#FDF6E2" strokeWidth="2.5" />
    <polygon points="15,24 21,24 18,18" fill={alive ? '#FDF6E2' : '#0D161E'} />
    <polygon points="27,24 33,24 30,18" fill={alive ? '#FDF6E2' : '#0D161E'} />
    <path
      d="M15,31 Q24,38 33,31"
      fill="none"
      stroke={alive ? '#FDF6E2' : '#0D161E'}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Candy Icon for the "Candy obtained" tray (5 distinct spooky candies)
 */
export const CandyIcon: React.FC<{
  houseId: number;
  earned: boolean;
  sparkleBonus: boolean;
  justEarned?: boolean;
}> = ({ houseId, earned, sparkleBonus, justEarned = false }) => {
  const colors = ['#F26B21', '#A855F7', '#F59E0B', '#EC4899', '#10B981'];
  const mainColor = earned ? colors[(houseId - 1) % colors.length] : '#334155';

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl border-2 transition-all ${
        earned
          ? 'bg-[#0D161E] border-[#FDF6E2] shadow-[0_0_14px_rgba(242,107,33,0.65)]'
          : 'bg-[#0D161E]/50 border-[#FDF6E2]/25 opacity-45 grayscale'
      } ${justEarned ? 'animate-candy-drop' : ''}`}
      title={
        earned
          ? `House ${houseId} Candy${sparkleBonus ? ' (Flawless Bonus Sparkle!)' : ''}`
          : `House ${houseId} Candy (Locked)`
      }
    >
      <svg viewBox="0 0 40 40" className="w-7 h-7">
        {houseId === 1 && (
          <>
            {/* Swirly Lollipop */}
            <line x1="20" y1="22" x2="20" y2="37" stroke="#FDF6E2" strokeWidth="3" strokeLinecap="round" />
            <circle cx="20" cy="15" r="11" fill={mainColor} stroke="#FDF6E2" strokeWidth="2.2" />
            <path
              d="M20,15 m-6,0 a6,6 0 1,0 12,0 a4,4 0 1,0 -8,0"
              fill="none"
              stroke="#FDF6E2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        {houseId === 2 && (
          <>
            {/* Wrapped Taffy */}
            <polygon points="4,12 12,20 4,28" fill={mainColor} stroke="#FDF6E2" strokeWidth="2" />
            <polygon points="36,12 28,20 36,28" fill={mainColor} stroke="#FDF6E2" strokeWidth="2" />
            <circle cx="20" cy="20" r="9.5" fill={mainColor} stroke="#FDF6E2" strokeWidth="2.2" />
            <path d="M16,15 Q20,20 16,25" fill="none" stroke="#FDF6E2" strokeWidth="2" />
            <path d="M24,15 Q20,20 24,25" fill="none" stroke="#FDF6E2" strokeWidth="2" />
          </>
        )}
        {houseId === 3 && (
          <>
            {/* Candy Corn */}
            <path
              d="M20,5 L33,33 Q20,37 7,33 Z"
              fill={mainColor}
              stroke="#FDF6E2"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M14,19 L26,19" stroke="#FDF6E2" strokeWidth="2.5" />
            <path d="M10,27 L30,27" stroke="#F26B21" strokeWidth="3" />
          </>
        )}
        {houseId === 4 && (
          <>
            {/* Enchanted Chocolate Bar */}
            <rect
              x="7"
              y="9"
              width="26"
              height="22"
              rx="4"
              fill={mainColor}
              stroke="#FDF6E2"
              strokeWidth="2.2"
            />
            <line x1="7" y1="20" x2="33" y2="20" stroke="#FDF6E2" strokeWidth="1.8" />
            <line x1="20" y1="9" x2="20" y2="31" stroke="#FDF6E2" strokeWidth="1.8" />
          </>
        )}
        {houseId >= 5 && (
          <>
            {/* Glowing Star Gem Candy */}
            <polygon
              points="20,4 34,15 29,34 11,34 6,15"
              fill={mainColor}
              stroke="#FDF6E2"
              strokeWidth="2.2"
            />
            <polygon points="20,10 27,17 24,28 16,28 13,17" fill="#FDF6E2" opacity="0.35" />
          </>
        )}
      </svg>

      {earned && sparkleBonus && (
        <span
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-300 border border-[#0D161E] text-[#0D161E] text-[10px] font-bold flex items-center justify-center shadow"
          title="Flawless Stage Sparkle!"
        >
          ★
        </span>
      )}
    </div>
  );
};

/**
 * Spooky-cute Black Cat SVG for the "Ask the black cat" Hint Button
 */
export const BlackCatIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    {/* Pointed Cat Ears */}
    <polygon points="8,18 10,5 18,13" fill="#0D161E" stroke="#FDF6E2" strokeWidth="2.2" />
    <polygon points="32,18 30,5 22,13" fill="#0D161E" stroke="#FDF6E2" strokeWidth="2.2" />
    {/* Cat Head */}
    <circle cx="20" cy="22" r="13" fill="#0D161E" stroke="#FDF6E2" strokeWidth="2.5" />
    {/* Glowing Yellow Eyes */}
    <ellipse cx="15" cy="21" rx="3" ry="4" fill="#F59E0B" />
    <ellipse cx="25" cy="21" rx="3" ry="4" fill="#F59E0B" />
    <line x1="15" y1="19" x2="15" y2="23" stroke="#0D161E" strokeWidth="1.5" />
    <line x1="25" y1="19" x2="25" y2="23" stroke="#0D161E" strokeWidth="1.5" />
    {/* Nose & Whiskers */}
    <polygon points="20,25 18,27 22,27" fill="#F26B21" />
    <line x1="5" y1="24" x2="12" y2="25" stroke="#FDF6E2" strokeWidth="1.5" />
    <line x1="28" y1="25" x2="35" y2="24" stroke="#FDF6E2" strokeWidth="1.5" />
  </svg>
);
