"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface AuroraTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  as?: React.ElementType
  color?: string
  colorWeight?: string
  duration?: number
  blur?: number
  offset?: number
}

export function AuroraText({
  children,
  className,
  size = "md",
  as: Component = "div",
  color = "purple",
  colorWeight = "600",
  duration = 10,
  blur = 100,
  offset = 50,
  ...props
}: AuroraTextProps) {
  const sizes = {
    sm: "text-xl sm:text-2xl md:text-3xl",
    md: "text-2xl sm:text-3xl md:text-4xl",
    lg: "text-3xl sm:text-4xl md:text-5xl",
    xl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  }

  return (
    <Component
      className={cn(
        "relative z-10 mx-auto max-w-4xl bg-transparent text-center font-bold tracking-tight text-white",
        sizes[size],
        className,
      )}
      {...props}
    >
      <span className="inline-block">{children}</span>
      <div
        className="absolute left-0 top-0 z-[-1] h-full w-full"
        style={{
          filter: `blur(${blur}px)`,
          transform: `translateY(${offset}px)`,
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            animation: `aurora-text ${duration}s linear infinite alternate`,
            background: `linear-gradient(to right, ${color}-${colorWeight}, white, ${color}-${colorWeight})`,
            backgroundSize: "200% 100%",
          }}
        />
      </div>
      <style jsx global>{`
        @keyframes aurora-text {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </Component>
  )
}
