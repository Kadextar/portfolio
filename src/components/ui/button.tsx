import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#ff7a1a] text-black hover:bg-[#ff9a4d] hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-white/20 bg-transparent hover:border-[#ff7a1a]/50 hover:text-[#ff7a1a] hover:bg-[#ff7a1a]/5",
        ghost: "hover:bg-white/5 hover:text-[#ff7a1a]",
        link: "text-[#ff7a1a] underline-offset-4 hover:underline",
        glass:
          "glass hover:border-[#ff7a1a]/30 hover:text-[#ff7a1a] hover:shadow-glow-orange",
      },
      size: {
        default: "h-11 px-8 py-4",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
