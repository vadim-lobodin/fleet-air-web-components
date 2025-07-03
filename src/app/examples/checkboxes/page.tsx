"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { Checkbox } from "@/components/ui/checkbox"
import { ExampleSectionCard } from "@/components/ui"

export default function CheckboxesPage() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="space-y-8">
      <Typography variant="header-1-semibold">Checkboxes</Typography>

      <ExampleSectionCard title="Basic Checkbox">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="basic-checkbox"
            checked={checked}
            onCheckedChange={(c) => setChecked(c as boolean)}
            label="Accept terms and conditions"
          />
        </div>
      </ExampleSectionCard>

      <ExampleSectionCard title="Disabled Checkbox">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="disabled-checked-checkbox"
            checked
            disabled
            label="Disabled Checked"
          />
          <Checkbox
            id="disabled-unchecked-checkbox"
            disabled
            label="Disabled Unchecked"
          />
        </div>
      </ExampleSectionCard>
    </div>
  )
}