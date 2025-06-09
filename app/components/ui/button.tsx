import * as React from "react"
import { cn } from "@utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
