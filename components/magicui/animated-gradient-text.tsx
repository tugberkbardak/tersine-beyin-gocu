import React from "react";

export interface AnimatedGradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  children: React.ReactNode;
}

export function AnimatedGradientText({
  speed = 2,
  colorFrom = "#52227c",
  colorTo = "#391856",
  className = "",
  children,
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      className={`animated-gradient-text ${className}`}
      style={{
        background: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `gradient-move ${speed}s ease-in-out infinite alternate`,
        display: "inline-block",
      }}
      {...props}
    >
      {children}
      <style jsx>{`
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </span>
  );
}
