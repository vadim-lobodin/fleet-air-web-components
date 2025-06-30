"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { Editor } from "@/components/ui/editor"

export default function EditorPage() {
  const [code, setCode] = React.useState(
    `fun NoriaContext.TriStateCheckbox(
    state: CheckboxState,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    colors: CheckboxColors = with(CheckboxDefaults) { colors() },
    align: Alignment.Vertical = Alignment.CenterVertically,
    enabled: Boolean = true,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    labelContent: (@Composable NoriaContext.() -> Unit)? = null,
) {
    val toggleableState =
        when (state) {
            CheckboxState.Checked -> ToggleableState.On
            CheckboxState.Partial -> ToggleableState.Indeterminate
            CheckboxState.Unchecked -> ToggleableState.Off
        }
    var focusState by remember { mutableStateOf<FocusState?>(null) }
    Row(
        verticalAlignment = align,
        horizontalArrangement = Arrangement.spacedBy(CheckboxDefaults.ContentSpacing),
        // TODO[nr]: take [buttonInteractivity] into account e.g. add analytics
        modifier =
            modifier
                .pointerHoverIcon(if (enabled) PointerIcon.Hand else PointerIcon.Default, true)
                .let {
                    if (enabled) it.onFocusChanged { focusState = it }.focusTarget()
                    else it.nonFocusable()
                }
                .triStateToggleable(
                    state = toggleableState,
                    onClick = onClick,
                    enabled = enabled,
                    role = Role.Checkbox,
                    interactionSource = interactionSource,
                    indication = null,
                ),
    ) {
        val interactionState by interactionSource.collectInteractionStateAsState(this, enabled)
        val focusRingColor = with(colors) { focusRingColor(state) }
        val fillColor = with(colors) { boxColor(state, interactionState) }
        val isFocused = focusState?.isFocused == true
        val borderState =
            when (interactionState) {
                InteractionState.Disabled -> InteractionState.Disabled
                is InteractionState.Hovered -> InteractionState.Hovered(isFocused)
                is InteractionState.Idle -> InteractionState.Idle(isFocused)
                is InteractionState.Pressed -> InteractionState.Pressed(isFocused)
            }
        val borderColor = with(colors) { borderColor(state, borderState) }
        Box(contentAlignment = Alignment.Center) {
            Box(
                Modifier.padding(CheckboxDefaults.BoxPadding)
                    .size(CheckboxDefaults.Size)
                    .focusRing(isFocused, CheckboxDefaults.Shape, focusRingColor)
                    .surface(
                        fillColor,
                        Thickness.Regular,
                        borderColor,
                        shape = CheckboxDefaults.Shape,
                    )
            )
            val iconKey =
                when (state) {
                    CheckboxState.Checked -> ThemeKeys.CheckmarkIcon
                    CheckboxState.Partial -> ThemeKeys.PartialCheckmarkIcon
                    CheckboxState.Unchecked -> null
                }

            iconKey?.let {
                val iconColor = with(colors) { iconColor(state, interactionState) }
                Icon(it, palette = mapOf("icon" to iconColor))
            }
        }

        if (labelContent != null) {
            val contentColor = with(colors) { contentColor(state, interactionState) }
            CompositionLocalProvider(LocalContentColor provides contentColor) { labelContent() }
        }
    }
}
`
  )

  return (
    <div className="space-y-8">
      <Typography variant="header-1-semibold">Editor</Typography>

      <div className="space-y-4">
        <Typography variant="header-2-semibold">Code Editor Example</Typography>
        <Editor
          value={code}
          onChange={(value) => setCode(value)}
          language="kotlin"
          height="600px"
        />
      </div>
    </div>
  )
}
