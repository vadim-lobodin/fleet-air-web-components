"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxesPage() {
  const [checked, setChecked] = React.useState(false)
  const [indeterminate, setIndeterminate] = React.useState(false)

  return (
    <div className="space-y-8">
      <Typography variant="header-1-semibold">Checkboxes</Typography>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">Basic Checkbox</Typography>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="basic-checkbox"
            checked={checked}
            onCheckedChange={(c) => setChecked(c as boolean)}
            label="Accept terms and conditions"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">Tri-State Checkbox</Typography>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="tri-state-checkbox"
            indeterminate={indeterminate}
            checked={checked}
            onCheckedChange={(c) => {
              if (c === "indeterminate") {
                setIndeterminate(true);
                setChecked(false);
              } else {
                setIndeterminate(false);
                setChecked(c as boolean);
              }
            }}
            label="Parent Checkbox (Tri-state)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">Disabled Checkbox</Typography>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="disabled-checkbox"
            checked
            disabled
            label="Disabled Checked"
          />
          <Checkbox
            id="disabled-unchecked-checkbox"
            disabled
            label="Disabled Unchecked"
          />
          <Checkbox
            id="disabled-indeterminate-checkbox"
            indeterminate
            disabled
            label="Disabled Indeterminate"
          />
        </div>
      </div>
    </div>
  )
}
