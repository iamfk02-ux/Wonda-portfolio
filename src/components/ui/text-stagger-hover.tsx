import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface TextStaggerHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const TextStaggerHover = React.forwardRef<HTMLDivElement, TextStaggerHoverProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative inline-block overflow-hidden align-middle select-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TextStaggerHover.displayName = "TextStaggerHover";

interface TextStaggerHoverActiveProps {
  children: string | number;
  className?: string;
  animation?: "top" | "bottom" | "left" | "right";
  animate?: "initial" | "hovered";
  transition?: Transition;
}

export const TextStaggerHoverActive = ({
  children,
  className,
  animation = "top",
  animate = "initial",
  transition = { duration: 0.3, ease: "easeOut" },
}: TextStaggerHoverActiveProps) => {
  const text = String(children);
  const isHovered = animate === "hovered";

  const getExitY = () => {
    if (animation === "top") return "-100%";
    if (animation === "bottom") return "100%";
    return "-100%";
  };

  return (
    <div className={cn("inline-flex flex-nowrap items-baseline", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ y: "0%" }}
          animate={{ y: isHovered ? getExitY() : "0%" }}
          transition={{
            ...transition,
            delay: i * 0.012,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

interface TextStaggerHoverHiddenProps {
  children: string | number;
  className?: string;
  animation?: "top" | "bottom" | "left" | "right";
  animate?: "initial" | "hovered";
  transition?: Transition;
}

export const TextStaggerHoverHidden = ({
  children,
  className,
  animation = "bottom",
  animate = "initial",
  transition = { duration: 0.3, ease: "easeOut" },
}: TextStaggerHoverHiddenProps) => {
  const text = String(children);
  const isHovered = animate === "hovered";

  const getEntryY = () => {
    if (animation === "bottom") return "100%";
    if (animation === "top") return "-100%";
    return "100%";
  };

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 pointer-events-none inline-flex flex-nowrap items-baseline", className)}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ y: getEntryY() }}
          animate={{ y: isHovered ? "0%" : getEntryY() }}
          transition={{
            ...transition,
            delay: i * 0.012,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
