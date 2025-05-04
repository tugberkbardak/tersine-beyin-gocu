"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface FlipTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  duration?: number
  delay?: number
  threshold?: number
  staggerChildren?: number
  once?: boolean
}

export function FlipText({
  children,
  className,
  as: Component = "div",
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  staggerChildren = 0.05,
  once = true,
  ...props
}: FlipTextProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  })

  const words = React.useMemo(() => {
    if (typeof children !== "string") {
      return React.Children.toArray(children)
    }
    return children.split(" ")
  }, [children])

  return (
    <Component ref={ref} className={cn("inline-block", className)} {...props}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {typeof word === "string" ? (
            word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "rotateX(0deg)" : "rotateX(-90deg)",
                  transformOrigin: "bottom",
                  transition: `opacity ${duration}s ease-out ${
                    delay + wordIndex * staggerChildren + charIndex * staggerChildren
                  }s, transform ${duration}s ease-out ${
                    delay + wordIndex * staggerChildren + charIndex * staggerChildren
                  }s`,
                }}
              >
                {char}
              </span>
            ))
          ) : (
            <span
              className="inline-block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "rotateX(0deg)" : "rotateX(-90deg)",
                transformOrigin: "bottom",
                transition: `opacity ${duration}s ease-out ${
                  delay + wordIndex * staggerChildren
                }s, transform ${duration}s ease-out ${delay + wordIndex * staggerChildren}s`,
              }}
            >
              {word}
            </span>
          )}
          {/* Add more explicit spacing between words */}
          {wordIndex !== words.length - 1 && <span className="inline-block" style={{ width: "0.35em" }}></span>}
        </span>
      ))}
    </Component>
  )
}
