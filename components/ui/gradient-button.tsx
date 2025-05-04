"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import type React from "react"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  icon?: React.ReactNode
  className?: string
}

export default function GradientButton({
  className,
  label = "Explore Components",
  icon = <ArrowUpRight className="w-3.5 h-3.5 text-white/90 dark:text-zinc-900/90" />,
  ...props
}: GradientButtonProps) {
  return (
    <Button
      className={cn(
        "relative h-10 px-4 overflow-hidden",
        "bg-zinc-900 dark:bg-zinc-100",
        "transition-all duration-200",
        "group",
        className,
      )}
      {...props}
    >
      {/* Gradient background effect */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-linear-to-r from-purple-500 via-purple-600 to-white",
          "opacity-40 group-hover:opacity-80",
          "blur-[2.5px] transition-opacity duration-500",
        )}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-white dark:text-zinc-900">{label}</span>
        {icon}
      </div>
    </Button>
  )
}
