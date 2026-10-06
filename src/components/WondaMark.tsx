import React from 'react';

interface WondaMarkProps {
  className?: string;
  color?: string;
  slashColor?: string;
}

export const WondaMark: React.FC<WondaMarkProps> = ({
  className = 'h-5 w-auto',
  color = '#F05245',
  slashColor = '#F05245',
}) => {
  return (
    <svg
      viewBox="0 0 54 26"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Wonda Design Studios Logo"
    >
      {/* 
        Exact vector geometry of logo 'VDVDSVEDV 1.png':
        Two slanted slashes (forming 'W') in Brand Red (#F05245)
        + solid rounded 'D' semi-capsule in Brand Red (#F05245)
      */}
      {/* Stroke 1: Leftmost slanted slash (Brand Red) */}
      <path d="M 2 2 L 8 2 L 16 24 L 10 24 Z" fill={slashColor} />

      {/* Stroke 2: Middle slanted slash (Brand Red) */}
      <path d="M 11 2 L 17 2 L 25 24 L 19 24 Z" fill={slashColor} />

      {/* Stroke 3: D shape (Brand Red) */}
      <path d="M 20 2 L 41 2 A 11 11 0 0 1 41 24 L 28 24 Z" fill={color} />
    </svg>
  );
};
