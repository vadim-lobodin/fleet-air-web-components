"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

interface FleetCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * The label content to display next to the checkbox.
   */
  label?: React.ReactNode;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  FleetCheckboxProps
>(({ className, label, children, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none",
          "border-[var(--fleet-checkbox-off-border-default)] bg-[var(--fleet-checkbox-off-background-default)]",
          "data-[state=checked]:bg-[var(--fleet-checkbox-on-background-default)] data-[state=checked]:border-[var(--fleet-checkbox-on-border-default)] data-[state=checked]:text-[var(--fleet-checkbox-icon-default)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--fleet-focusOutline)] focus-visible:ring-offset-0 focus-visible:border-[var(--fleet-checkbox-off-focusBorder)]",
          "data-[state=checked]:focus-visible:border-[var(--fleet-checkbox-on-focusBorder)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current transition-none")}
        >
          {props.checked === true && (
            <Icon fleet="checkbox-checked" size="sm" className="size-3.5" /> 
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={props.id} // Associate label with checkbox by id
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };