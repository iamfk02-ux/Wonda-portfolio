import React from 'react';

interface WondaLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
}

export const WondaLogo: React.FC<WondaLogoProps> = ({
  className = '',
  showText = false,
  size = 'md',
  textColor = 'text-white',
}) => {
  const iconSizes = {
    sm: 'h-8 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-20 w-auto',
  };

  const textSizes = {
    sm: 'text-lg leading-tight',
    md: 'text-2xl leading-tight',
    lg: 'text-3xl leading-tight',
    xl: 'text-5xl leading-tight',
  };

  const subTextSizes = {
    sm: 'text-[7.5px] tracking-[0.45em]',
    md: 'text-[9.5px] tracking-[0.48em]',
    lg: 'text-xs tracking-[0.52em]',
    xl: 'text-sm tracking-[0.55em]',
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Exact Vector recreation of the Wonda Design Studios yellow mark from reference image (transparent background) */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0`}
        aria-label="Wonda Design Studios Logo Mark"
      >
        {/* Top Dome: Round circular head with wave-contoured bottom cut */}
        <path
          d="M 40 52 C 40 23.3 63.3 0 92 0 C 120.7 0 144 23.3 144 52 C 144 53 144 54.5 143.8 55.8 C 137.5 54.2 127.8 51.5 116.2 50.4 C 104.2 49.3 97.5 54.5 92 54.5 C 86.5 54.5 79.8 49.3 67.8 50.4 C 56.2 51.5 46.5 54.2 40.2 55.8 C 40 54.5 40 53 40 52 Z"
          fill="#FF5712"
        />

        {/* Wavy Cutout / Horizon Gap separating the dome from tentacles */}
        {/* The 5 radiating tentacles / flippers matching reference image */}
        {/* Far Left Wing */}
        <path
          d="M 33 65 C 44 63 56 61 68 62 C 55 64 42 70 28 73 C 24 73.8 20 71 22 67 C 24 63.5 28 64.5 33 65 Z"
          fill="#FF5712"
        />

        {/* Combined Lower Tentacles & Arch Ribbons matching exact reference silhouette */}
        <path
          d="M 22 66 C 21 69 22 73 26 73 C 44 72 58 64 71 63 C 78 62.5 85 64.5 92 64.5 C 99 64.5 106 62.5 113 63 C 126 64 140 72 158 73 C 162 73 163 69 162 66 C 160 62 148 59 135 60 C 124 61 113 63 103 62 C 98 61.5 95 60.5 92 60.5 C 89 60.5 86 61.5 81 62 C 71 63 60 61 49 60 C 36 59 24 62 22 66 Z"
          fill="#FF5712"
        />

        {/* Tentacle 1: Far Left Drop Flipper */}
        <path
          d="M 23 66 C 30 67 40 72 48 80 C 49 81 48 83 46 84 C 42 86 32 84 22 75 C 20 73 21 68 23 66 Z"
          fill="#FF5712"
        />

        {/* Tentacle 2: Left Diagonal Leg */}
        <path
          d="M 54 75 L 43 108 C 42 111 44 114 48 114 C 54 114 62 111 67 106 L 73 75 C 67 74 60 74 54 75 Z"
          fill="#FF5712"
        />

        {/* Tentacle 3: Center Vertical Column Leg */}
        <path
          d="M 83 76 L 82 122 C 82 125.5 85 128 92 128 C 99 128 102 125.5 102 122 L 101 76 C 96 77 88 77 83 76 Z"
          fill="#FF5712"
        />

        {/* Tentacle 4: Right Diagonal Leg */}
        <path
          d="M 111 75 L 117 106 C 122 111 130 114 136 114 C 140 114 142 111 141 108 L 130 75 C 124 74 117 74 111 75 Z"
          fill="#FF5712"
        />

        {/* Tentacle 5: Far Right Drop Flipper */}
        <path
          d="M 161 66 C 154 67 144 72 136 80 C 135 81 136 83 138 84 C 142 86 152 84 162 75 C 164 73 163 68 161 66 Z"
          fill="#FF5712"
        />
      </svg>

      {/* Exact Logotype: Wonda / Design Studios matching reference typography with transparent background */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-display font-extrabold tracking-[-0.02em] leading-none ${textColor} ${textSizes[size]}`}
            style={{ fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)' }}
          >
            Wonda
          </span>
          <span
            className={`font-sans font-normal uppercase text-white/90 leading-none pt-1 sm:pt-1.5 ${subTextSizes[size]}`}
            style={{ letterSpacing: '0.42em' }}
          >
            Design Studios
          </span>
        </div>
      )}
    </div>
  );
};
