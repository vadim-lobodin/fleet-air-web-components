import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--color-accent-9,#2563eb)] text-white hover:bg-[var(--blue-8,#1d4ed8)]',
        secondary: 'bg-[var(--color-panel-translucent,#f1f5f9)] text-[var(--color-text-primary,#0f172a)] border border-[var(--color-border-default,#e2e8f0)] hover:bg-[var(--gray-3,#e2e8f0)]',
        danger: 'bg-[var(--red-9,#dc2626)] text-white hover:bg-[var(--red-8,#b91c1c)]',
        success: 'bg-[var(--green-9,#16a34a)] text-white hover:bg-[var(--green-8,#15803d)]',
        warning: 'bg-[var(--yellow-9,#ca8a04)] text-white hover:bg-[var(--yellow-8,#a16207)]',
        ghost: 'bg-transparent text-[var(--color-text-primary,#0f172a)] hover:bg-[var(--gray-3,#f1f5f9)]',
        link: 'bg-transparent text-[var(--color-accent-11,#1e40af)] hover:underline underline-offset-4',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
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
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants }; 