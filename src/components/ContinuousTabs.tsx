import React, { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "motion/react";

/* ---------- Types ---------- */
export interface TabItem {
  id: string;
  label: string;
}

export interface ContinuousTabsProps {
  tabs?: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/* ---------- Defaults ---------- */
const DEFAULT_TABS: TabItem[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "services", label: "What I Do" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
  tabs = DEFAULT_TABS,
  defaultActiveId = "home",
  activeId,
  onChange,
  className = "",
}) => {
  const [active, setActive] = useState<string>(activeId || defaultActiveId);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  useEffect(() => {
    if (activeId !== undefined) {
      setActive(activeId);
    }
  }, [activeId]);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  if (!isMounted) return null;

  return (
    <LayoutGroup>
      <nav
        className={`
          relative flex items-center gap-1.5 sm:gap-2
          bg-transparent
          ${className}
        `}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              onMouseEnter={() => setHovered(tab.id)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xs outline-none cursor-pointer select-none
                font-sans text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]
                ${
                  isActive
                    ? "bg-[#FF5712] hover:bg-[#FF6A28] text-white font-extrabold shadow-[0_4px_16px_rgba(255,87,18,0.35)]"
                    : "bg-transparent hover:bg-white/[0.08] text-stone-300 hover:text-white font-semibold border border-white/20 hover:border-white/50 backdrop-blur-xs"
                }
              `}
            >
              <span className="relative z-10 leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
};
