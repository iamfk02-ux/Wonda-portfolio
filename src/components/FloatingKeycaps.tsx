import React, { useState, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

interface FloatingKeycapsProps {
  onStartProject?: () => void;
  onViewPortfolio?: () => void;
  className?: string;
}

interface KeycapData {
  id: 'start' | 'portfolio';
  label: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
  baseRotate: number;
  floatDelay: string;
  floatDuration: string;
  positionClasses: string;
}

export const FloatingKeycaps: React.FC<FloatingKeycapsProps> = ({
  onStartProject,
  onViewPortfolio,
  className = '',
}) => {
  const keys: KeycapData[] = [
    {
      id: 'start',
      label: 'Start a project',
      icon: <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />,
      isPrimary: true,
      baseRotate: -5,
      floatDelay: '0s',
      floatDuration: '6.5s',
      positionClasses: 'left-0 sm:left-2 top-1 sm:top-2',
    },
    {
      id: 'portfolio',
      label: 'View portfolio',
      icon: <ArrowDown className="w-4 h-4 text-stone-300 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />,
      isPrimary: false,
      baseRotate: 6,
      floatDelay: '1.4s',
      floatDuration: '7.8s',
      positionClasses: 'left-4 sm:left-14 top-18 sm:top-20',
    },
  ];

  return (
    <div className={`relative w-full max-w-md h-36 sm:h-38 select-none pointer-events-none ${className}`}>
      {keys.map((key) => (
        <InteractiveKeycap
          key={key.id}
          data={key}
          onClick={key.id === 'start' ? onStartProject : onViewPortfolio}
        />
      ))}
    </div>
  );
};

interface InteractiveKeycapProps {
  data: KeycapData;
  onClick?: () => void;
}

const InteractiveKeycap: React.FC<InteractiveKeycapProps> = ({ data, onClick }) => {
  const keyRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!keyRef.current) return;
    const rect = keyRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setTilt({
      x: -normY * 20,
      y: normX * 20,
    });

    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={keyRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => {
        setIsPressed(false);
        onClick?.();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`absolute ${data.positionClasses} pointer-events-auto cursor-pointer select-none group z-30 touch-none`}
      style={{ perspective: '1200px' }}
      role="button"
      tabIndex={0}
      aria-label={data.label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Floating Oscillation Wrapper */}
      <div
        className="will-change-transform transition-transform duration-300"
        style={{
          transform: isHovered
            ? `rotate(${data.baseRotate}deg) scale(1.08)`
            : `rotate(${data.baseRotate}deg)`,
          animation: isHovered
            ? 'none'
            : `floating-keycap ${data.floatDuration} ease-in-out infinite alternate ${data.floatDelay}`,
        }}
      >
        {/* 3D Mechanical Keycap Body with Burnt Orange Theme */}
        <div
          className={`
            relative w-48 sm:w-56 h-12 sm:h-13
            rounded-lg
            transition-all duration-150 ease-out
            ${
              isPressed
                ? 'translate-y-2 shadow-[0_2px_6px_rgba(0,0,0,0.9),0_1px_0_#07080a]'
                : isHovered
                ? data.isPrimary
                  ? 'shadow-[0_22px_40px_-4px_rgba(255,87,18,0.45),0_7px_0_#9E2A00,0_0_30px_rgba(255,87,18,0.5)]'
                  : 'shadow-[0_22px_40px_-4px_rgba(0,0,0,0.95),0_7px_0_#0a0b0e,0_0_20px_rgba(255,87,18,0.2)]'
                : data.isPrimary
                ? 'shadow-[0_14px_28px_-4px_rgba(255,87,18,0.3),0_5px_0_#A83200,0_1px_0_rgba(255,255,255,0.4)_inset]'
                : 'shadow-[0_14px_28px_-4px_rgba(0,0,0,0.9),0_5px_0_#0d0e12,0_1px_0_rgba(255,255,255,0.18)_inset]'
            }
          `}
          style={{
            transform: isHovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`
              : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
            transformStyle: 'preserve-3d',
            backgroundColor: data.isPrimary ? '#FF5712' : '#111215',
          }}
        >
          {/* Beveled Plastic Chamfer Outer Wall */}
          <div
            className={`
              absolute inset-0 rounded-lg p-[2px] overflow-hidden
              ${
                data.isPrimary
                  ? 'bg-gradient-to-b from-[#FF7A3D] via-[#FF5712] to-[#B83000]'
                  : 'bg-gradient-to-b from-[#2e3038] via-[#1a1b1f] to-[#0c0d10]'
              }
            `}
          >
            {/* Top Concave Surface of the Keycap */}
            <div
              className={`
                relative w-full h-full rounded-[6px] flex items-center justify-between px-3.5 sm:px-4
                ${
                  data.isPrimary
                    ? 'bg-gradient-to-b from-[#FF6524] to-[#E64805] text-white border-t border-white/60 border-b border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.25)]'
                    : 'bg-gradient-to-b from-[#22242a] via-[#18191d] to-[#111215] text-white border-t border-white/25 border-b border-black/90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.06),inset_0_-2px_4px_rgba(0,0,0,0.6)]'
                }
              `}
            >
              {/* Dynamic Specular Reflection tracking mouse pointer */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-[6px] opacity-45 transition-opacity duration-150"
                  style={{
                    background: data.isPrimary
                      ? `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.85) 0%, rgba(255,160,102,0.4) 40%, transparent 70%)`
                      : `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.45) 0%, rgba(255,87,18,0.2) 35%, transparent 65%)`,
                  }}
                />
              )}

              {/* Clean Button Label + Icon */}
              <span
                className={`font-sans font-extrabold text-xs sm:text-[13px] tracking-wider uppercase z-10 select-none ${
                  data.isPrimary ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : 'text-stone-100 group-hover:text-white'
                }`}
              >
                {data.label}
              </span>
              <span className="leading-none z-10">{data.icon}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
