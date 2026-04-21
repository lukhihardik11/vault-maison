// Source: shadcn/ui - Button
// Adapted: monochrome palette (#050505/#FFFFFF), sharp edges (rounded-none)

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#050505] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#050505] text-[#FFFFFF] hover:bg-[#050505]/90",
        destructive:
          "bg-red-600 text-[#FFFFFF] hover:bg-red-600/90",
        outline:
          "border border-[#050505] bg-[#FFFFFF] hover:bg-[#E5E5E5] hover:text-[#050505]",
        secondary:
          "bg-[#E5E5E5] text-[#050505] hover:bg-[#E5E5E5]/80",
        ghost: "hover:bg-[#E5E5E5] hover:text-[#050505]",
        link: "text-[#050505] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
