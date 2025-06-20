import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const headingVariants = cva(
  'font-semibold leading-tight',
  {
    variants: {
      level: {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-base',
      },
      variant: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        default: '',
      },
    },
    defaultVariants: {
      level: 1,
      variant: 'primary',
    },
  }
);

const textVariants = cva(
  'leading-relaxed',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      variant: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        accent: 'text-accent',
        success: 'text-success',
        warning: 'text-warning',
        danger: 'text-danger',
        default: '',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'primary',
      weight: 'normal',
    },
  }
);

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : `h${level}`;
    return React.createElement(
      Comp,
      {
        className: cn(headingVariants({ level, variant }), className),
        ref,
        ...props,
      }
    );
  }
);
Heading.displayName = 'Heading';

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, variant, weight, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return React.createElement(
      Comp,
      {
        className: cn(textVariants({ size, variant, weight }), className),
        ref,
        ...props,
      }
    );
  }
);
Text.displayName = 'Text';

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'code';
    return React.createElement(
      Comp,
      {
        className: cn(
          'font-mono text-sm px-2 py-1 rounded-md bg-code text-code-foreground',
          className
        ),
        ref,
        ...props,
      }
    );
  }
);
Code.displayName = 'Code'; 