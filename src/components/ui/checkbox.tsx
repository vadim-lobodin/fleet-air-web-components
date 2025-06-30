"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon" // Assuming Fleet icons are available via this component

interface FleetCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * If true, the checkbox will be in an indeterminate state.
   * This takes precedence over the `checked` prop.
   */
  indeterminate?: boolean;
  /**
   * The label content to display next to the checkbox.
   */
  label?: React.ReactNode;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  FleetCheckboxProps
>(({ className, indeterminate, label, children, ...props }, ref) => {
  const checkedState = indeterminate ? "indeterminate" : props.checked;

  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        checked={checkedState}
        className={cn(
          "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none",
          "border-[var(--fleet-checkbox-border-default)] bg-[var(--fleet-checkbox-background-default)]",
          "data-[state=checked]:bg-[var(--fleet-checkbox-background-checked)] data-[state=checked]:border-[var(--fleet-checkbox-border-checked)] data-[state=checked]:text-[var(--fleet-checkbox-icon-checked)]",
          "data-[state=indeterminate]:bg-[var(--fleet-checkbox-background-indeterminate)] data-[state=indeterminate]:border-[var(--fleet-checkbox-border-indeterminate)] data-[state=indeterminate]:text-[var(--fleet-checkbox-icon-indeterminate)]",
          "focus-visible:ring-[3px] focus-visible:ring-[var(--fleet-component-focusOutline-default)] focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current transition-none")}
        >
          {checkedState === "indeterminate" ? (
            <Icon fleet="minus" size="sm" className="size-3.5" /> // Assuming 'minus' for indeterminate
          ) : (
            <Icon fleet="check" size="sm" className="size-3.5" /> // Assuming 'check' for checked
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