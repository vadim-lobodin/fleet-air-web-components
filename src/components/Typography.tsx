import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Fleet Typography System - Exact mirror of Fleet's Typography.kt
// Uses Inter Variable for UI text and JetBrains Mono for code
// Supports both light and dark theme variations with different font weights

const fleetTypographyVariants = cva(
  '', // No base classes, each variant defines everything
  {
    variants: {
      variant: {
        // Header variants - Fleet's header system
        'header-0-semibold': [
          'font-inter text-[26px] leading-[32px]',
          'font-[600] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0px]',
        ],
        'header-1-semibold': [
          'font-inter text-[23px] leading-[28px]',
          'font-[640] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0px]',
        ],
        'header-1': [
          'font-inter text-[23px] leading-[28px]',
          'font-[440] dark:font-[400]', // 440 light, 400 dark
          'tracking-[0px]',
        ],
        'header-2-semibold': [
          'font-inter text-[19px] leading-[24px]',
          'font-[640] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0px]',
        ],
        'header-2': [
          'font-inter text-[19px] leading-[24px]',
          'font-[440] dark:font-[400]', // 440 light, 400 dark
          'tracking-[0px]',
        ],
        'header-3-semibold': [
          'font-inter text-[15px] leading-[20px]',
          'font-[640] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0.1px]',
        ],
        'header-3': [
          'font-inter text-[15px] leading-[20px]',
          'font-[490] dark:font-[450]', // 490 light, 450 dark
          'tracking-[0.1px]',
        ],
        'header-4-semibold': [
          'font-inter text-[13px] leading-[18px]',
          'font-[640] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0.4px]',
        ],
        'header-5-semibold': [
          'font-inter text-[10px] leading-[14px]',
          'font-[740] dark:font-[700]', // 740 light, 700 dark
          'tracking-[1px]', // 10% of 10px = 1px
          'uppercase',
        ],
        
        // Default text variants - Fleet's main text system
        'default': [
          'font-inter text-[13px] leading-[16px]',
          'font-[520] dark:font-[480]', // 520 light, 480 dark
          'tracking-[0px] dark:tracking-[0.4px]', // 0 light, 0.4px dark
        ],
        'default-italic': [
          'font-inter text-[13px] leading-[16px]',
          'font-[520] dark:font-[480]', // 520 light, 480 dark
          'tracking-[0px] dark:tracking-[0.4px]', // 0 light, 0.4px dark
          'italic',
        ],
        'default-semibold': [
          'font-inter text-[13px] leading-[16px]',
          'font-[640] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0px] dark:tracking-[0.4px]', // 0 light, 0.4px dark
        ],
        'default-semibold-italic': [
          'font-inter text-[13px] leading-[16px]',
          'font-[640] dark:font-[600]', // 640 light, 600 dark
          'tracking-[0px] dark:tracking-[0.4px]', // 0 light, 0.4px dark
          'italic',
        ],
        'default-multiline': [
          'font-inter text-[13px] leading-[18px]',
          'font-[520] dark:font-[480]', // 520 light, 480 dark
          'tracking-[0px] dark:tracking-[0.4px]', // 0 light, 0.4px dark
        ],
        'default-chat': [
          'font-inter text-[13px] leading-[20px]',
          'font-[520] dark:font-[480]', // 520 light, 480 dark
          'tracking-[0px] dark:tracking-[0.4px]', // 0 light, 0.4px dark
        ],
        
        // Medium text variants
        'medium': [
          'font-inter text-[12px] leading-[16px]',
          'font-[540] dark:font-[500]', // 540 light, 500 dark
          'tracking-[0.1px] dark:tracking-[0.5px]', // 0.1px light, 0.5px dark
        ],
        'medium-semibold': [
          'font-inter text-[12px] leading-[16px]',
          'font-[665] dark:font-[625]', // 665 light, 625 dark
          'tracking-[0.1px] dark:tracking-[0.5px]', // 0.1px light, 0.5px dark
        ],
        
        // Small text variant
        'small': [
          'font-inter text-[10px] leading-[14px]',
          'font-[540] dark:font-[500]', // 540 light, 500 dark
          'tracking-[0.2px] dark:tracking-[0.6px]', // 0.2px light, 0.6px dark
        ],
        
        // Code variants - JetBrains Mono
        'code': [
          'font-mono text-[13px] leading-[22px]',
          'font-[420] dark:font-[400]', // 420 light, 400 dark
          'tracking-[0px]',
        ],
        'code-italic': [
          'font-mono text-[13px] leading-[22px]',
          'font-[420] dark:font-[400]', // 420 light, 400 dark
          'tracking-[0px]',
          'italic',
        ],
        'code-bold': [
          'font-mono text-[13px] leading-[22px]',
          'font-[720] dark:font-[700]', // 720 light, 700 dark
          'tracking-[0px]',
        ],
      },
      color: {
        primary: 'text-[var(--color-text-primary)]',
        secondary: 'text-[var(--color-text-secondary)]',
        tertiary: 'text-[var(--color-text-tertiary)]',
        accent: 'text-[var(--color-accent)]',
        success: 'text-[var(--color-positive)]',
        warning: 'text-[var(--color-warning)]',
        danger: 'text-[var(--color-dangerous)]',
        muted: 'text-[var(--color-text-muted)]',
        inverted: 'text-[var(--color-text-inverted)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
    },
  }
);

// Legacy heading variants for backward compatibility
const headingVariants = cva(
  'font-inter leading-tight',
  {
    variants: {
      level: {
        1: 'text-[26px] leading-[32px] font-[640] dark:font-[600] tracking-[0px]', // header-0-semibold
        2: 'text-[23px] leading-[28px] font-[640] dark:font-[600] tracking-[0px]', // header-1-semibold
        3: 'text-[19px] leading-[24px] font-[640] dark:font-[600] tracking-[0px]', // header-2-semibold
        4: 'text-[15px] leading-[20px] font-[640] dark:font-[600] tracking-[0.1px]', // header-3-semibold
        5: 'text-[13px] leading-[18px] font-[640] dark:font-[600] tracking-[0.4px]', // header-4-semibold
        6: 'text-[10px] leading-[14px] font-[740] dark:font-[700] tracking-[1px] uppercase', // header-5-semibold
      },
      variant: {
        primary: 'text-[var(--color-text-primary)]',
        secondary: 'text-[var(--color-text-secondary)]',
        default: '',
      },
    },
    defaultVariants: {
      level: 1,
      variant: 'primary',
    },
  }
);

// Legacy text variants for backward compatibility
const textVariants = cva(
  'font-inter',
  {
    variants: {
      size: {
        xs: 'text-[10px] leading-[14px] font-[540] dark:font-[500] tracking-[0.2px] dark:tracking-[0.6px]', // small
        sm: 'text-[12px] leading-[16px] font-[540] dark:font-[500] tracking-[0.1px] dark:tracking-[0.5px]', // medium
        base: 'text-[13px] leading-[16px] font-[520] dark:font-[480] tracking-[0px] dark:tracking-[0.4px]', // default
        lg: 'text-[15px] leading-[20px] font-[490] dark:font-[450] tracking-[0.1px]', // header-3
        xl: 'text-[19px] leading-[24px] font-[440] dark:font-[400] tracking-[0px]', // header-2
      },
      variant: {
        primary: 'text-[var(--color-text-primary)]',
        secondary: 'text-[var(--color-text-secondary)]',
        tertiary: 'text-[var(--color-text-tertiary)]',
        accent: 'text-[var(--color-accent)]',
        success: 'text-[var(--color-positive)]',
        warning: 'text-[var(--color-warning)]',
        danger: 'text-[var(--color-dangerous)]',
        default: '',
      },
      weight: {
        normal: '', // Weight handled by size variant
        medium: 'font-[540] dark:font-[500]',
        semibold: 'font-[640] dark:font-[600]',
        bold: 'font-[740] dark:font-[700]',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'primary',
      weight: 'normal',
    },
  }
);

// Main Typography component based on Fleet's exact system
export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof fleetTypographyVariants> {
  asChild?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code' | 'label' | 'pre';
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, asChild = false, as, ...props }, ref) => {
    // Determine the appropriate HTML element based on variant
    const getDefaultElement = (variant: string | null | undefined) => {
      if (!variant) return 'p';
      
      if (variant.startsWith('header-0')) return 'h1';
      if (variant.startsWith('header-1')) return 'h2';
      if (variant.startsWith('header-2')) return 'h3';
      if (variant.startsWith('header-3')) return 'h4';
      if (variant.startsWith('header-4')) return 'h5';
      if (variant.startsWith('header-5')) return 'h6';
      if (variant.startsWith('code')) return 'code';
      if (['medium', 'small'].includes(variant)) return 'span';
      
      return 'p'; // default variants
    };

    if (asChild) {
      return (
        <Slot
          className={cn(fleetTypographyVariants({ variant, color }), className)}
          ref={ref}
          {...props}
        />
      );
    }

    const Element = as || getDefaultElement(variant);
    
    return React.createElement(Element, {
      className: cn(fleetTypographyVariants({ variant, color }), className),
      ref,
      ...props,
    });
  }
);
Typography.displayName = 'Typography';

// Legacy components for backward compatibility
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
  variant?: 'code' | 'code-italic' | 'code-bold';
  inline?: boolean;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = 'code', inline = true, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : (inline ? 'code' : 'pre');
    
    return React.createElement(
      Comp,
      {
        className: cn(
          fleetTypographyVariants({ variant: variant as any }),
          inline ? 'px-1.5 py-0.5 rounded bg-[var(--color-code-background)] text-[var(--color-code-foreground)] border border-[var(--color-code-border)]' : '',
          className
        ),
        ref,
        ...props,
      }
    );
  }
);
Code.displayName = 'Code'; 