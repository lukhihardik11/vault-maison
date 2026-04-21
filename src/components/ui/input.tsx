// Source: shadcn/ui - Input
// Adapted: monochrome palette, sharp edges (no rounded corners)

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-sm text-[#050505] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9B9B9B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#050505] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
