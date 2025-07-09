"use client"

import { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { 
  ContextMenu, 
  RightClickContextMenu,
  buildMenu,
  type FleetMenuItem,
  type ActionMenuItem,
  type CheckboxMenuItem,
  type GroupMenuItem,
  Button,
  ExampleSectionCard,
  ExamplePageTemplate
} from "@/components/ui"

export default function ContextMenuPage() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)
  const [lastAction, setLastAction] = useState<string>("None")

  // Basic context menu items
  const basicMenuItems: FleetMenuItem[] = buildMenu(
    {
      type: 'action',
      name: 'Cut',
      shortcutText: '⌘X',
      icon: 'edit',
      callback: () => setLastAction('Cut executed')
    } as ActionMenuItem,
    {
      type: 'action', 
      name: 'Copy',
      shortcutText: '⌘C',
      icon: 'copy',
      callback: () => setLastAction('Copy executed')
    } as ActionMenuItem,
    {
      type: 'action',
      name: 'Paste',
      shortcutText: '⌘V', 
      icon: 'add',
      enabled: false,
      callback: () => setLastAction('Paste executed')
    } as ActionMenuItem,
    {
      type: 'separator'
    },
    {
      type: 'action',
      name: 'Select All',
      shortcutText: '⌘A',
      callback: () => setLastAction('Select All executed')
    } as ActionMenuItem
  )

  // Advanced context menu with submenus and checkboxes
  const advancedMenuItems: FleetMenuItem[] = buildMenu(
    {
      type: 'header',
      name: 'File Operations',
      rightIcon: 'file-types-text'
    },
    {
      type: 'action',
      name: 'New File',
      shortcutText: '⌘N',
      icon: 'new-file',
      callback: () => setLastAction('New File created')
    } as ActionMenuItem,
    {
      type: 'action',
      name: 'Open File',
      shortcutText: '⌘O', 
      icon: 'folder',
      callback: () => setLastAction('Open File dialog shown')
    } as ActionMenuItem,
    {
      type: 'separator'
    },
    {
      type: 'group',
      name: 'Recent Files',
      icon: 'vcs-history',
      children: [
        {
          type: 'action',
          name: 'document.txt',
          icon: 'file-types-text',
          shortcutText: '⌘1',
          callback: () => setLastAction('Opened document.txt')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'project.json',
          icon: 'file-types-json',
          shortcutText: '⌘2',
          callback: () => setLastAction('Opened project.json')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'image.png',
          icon: 'file-types-image',
          shortcutText: '⌘3',
          callback: () => setLastAction('Opened image.png')
        } as ActionMenuItem,
        { type: 'separator' },
        {
          type: 'action',
          name: 'Clear Recent Files',
          icon: 'delete',
          callback: () => setLastAction('Recent files cleared')
        } as ActionMenuItem
      ]
    } as GroupMenuItem,
    {
      type: 'separator'
    },
    {
      type: 'checkbox',
      name: 'Enable Notifications',
      checked: notifications,
      onChange: (checked) => {
        setNotifications(checked)
        setLastAction(`Notifications ${checked ? 'enabled' : 'disabled'}`)
      }
    } as CheckboxMenuItem,
    {
      type: 'checkbox',
      name: 'Auto Save',
      checked: autoSave,
      onChange: (checked) => {
        setAutoSave(checked)
        setLastAction(`Auto Save ${checked ? 'enabled' : 'disabled'}`)
      }
    } as CheckboxMenuItem
  )

  // Complete component showcase with all variants
  const allComponentsMenuItems: FleetMenuItem[] = buildMenu(
    // Headers
    {
      type: 'header',
      name: 'File Operations',
      rightIcon: 'file-types-text',
      tailText: '5 items'
    },
    
    // Basic actions
    {
      type: 'action',
      name: 'New File',
      shortcutText: '⌘N',
      icon: 'new-file',
      callback: () => setLastAction('New File created')
    } as ActionMenuItem,
    
    // Action with description
    {
      type: 'action',
      name: 'Open Recent',
      description: 'Browse recently opened files',
      icon: 'vcs-history',
      callback: () => setLastAction('Open Recent clicked')
    } as ActionMenuItem,
    
    // Multiline action
    {
      type: 'action',
      name: 'Import Large Dataset',
      description: 'Import data from external sources including CSV, JSON, XML, and database connections',
      multiline: true,
      icon: 'database',
      callback: () => setLastAction('Import started')
    } as ActionMenuItem,
    
    { type: 'separator' },
    
    // Toggle actions
    {
      type: 'action',
      name: 'Word Wrap',
      variant: 'toggle-on',
      indentItemsWithoutIcon: true,
      callback: () => setLastAction('Word Wrap toggled')
    } as ActionMenuItem,
    {
      type: 'action',
      name: 'Show Whitespace',
      variant: 'toggle-off',
      indentItemsWithoutIcon: true,
      callback: () => setLastAction('Show Whitespace toggled')
    } as ActionMenuItem,
    
    { type: 'separator' },
    
    // Action with custom right content
    {
      type: 'action',
      name: 'File Size',
      customRightContent: <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">2.4 MB</span>,
      icon: 'file-types-text',
      callback: () => setLastAction('File Size clicked')
    } as ActionMenuItem,
    
    // Destructive action
    {
      type: 'action',
      name: 'Delete File',
      variant: 'destructive',
      shortcutText: 'Del',
      icon: 'delete',
      callback: () => setLastAction('Delete File clicked')
    } as ActionMenuItem,
    
    { type: 'separator' },
    
    // Checkbox items
    {
      type: 'checkbox',
      name: 'Enable Auto Save',
      checked: autoSave,
      onChange: (checked) => {
        setAutoSave(checked)
        setLastAction(`Auto Save ${checked ? 'enabled' : 'disabled'}`)
      }
    } as CheckboxMenuItem,
    
    { type: 'separator' },
    
    // Text item (non-interactive)
    {
      type: 'text',
      name: 'Status: Ready',
      text: 'Status: Ready'
    },
    
    { type: 'separator' },
    
    // Group with submenu
    {
      type: 'group',
      name: 'Advanced Tools',
      icon: 'settings',
      searchable: true,
      children: [
        {
          type: 'header',
          name: 'Code Formatting',
          rightIcon: 'edit'
        },
        {
          type: 'action',
          name: 'Format Document',
          shortcutText: '⌘⇧I',
          icon: 'edit',
          callback: () => setLastAction('Document formatted')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'Format Selection',
          shortcutText: '⌘K ⌘F',
          icon: 'edit',
          callback: () => setLastAction('Selection formatted')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'Organize Imports',
          shortcutText: '⌘⇧O',
          icon: 'file-types-javascript',
          callback: () => setLastAction('Imports organized')
        } as ActionMenuItem,
        { type: 'separator' },
        {
          type: 'checkbox',
          name: 'Format on Save',
          checked: true,
          onChange: (checked) => setLastAction(`Format on Save ${checked ? 'enabled' : 'disabled'}`)
        } as CheckboxMenuItem,
        {
          type: 'checkbox',
          name: 'Enable Notifications',
          checked: false,
          onChange: (checked) => setLastAction(`Notifications ${checked ? 'enabled' : 'disabled'}`)
        } as CheckboxMenuItem,
        { type: 'separator' },
        {
          type: 'group',
          name: 'Refactoring',
          icon: 'tools',
          children: [
            {
              type: 'action',
              name: 'Extract Method',
              shortcutText: '⌘⌥M',
              icon: 'tools',
              callback: () => setLastAction('Extract Method')
            } as ActionMenuItem,
            {
              type: 'action',
              name: 'Extract Variable',
              shortcutText: '⌘⌥V',
              icon: 'tools',
              callback: () => setLastAction('Extract Variable')
            } as ActionMenuItem,
            {
              type: 'action',
              name: 'Rename Symbol',
              shortcutText: 'F2',
              icon: 'edit',
              callback: () => setLastAction('Rename Symbol')
            } as ActionMenuItem,
            { type: 'separator' },
            {
              type: 'action',
              name: 'Inline Variable',
              shortcutText: '⌘⌥N',
              icon: 'arrow-right',
              callback: () => setLastAction('Inline Variable')
            } as ActionMenuItem,
            {
              type: 'action',
              name: 'Move to File',
              icon: 'external-link',
              callback: () => setLastAction('Move to File')
            } as ActionMenuItem
          ]
        } as GroupMenuItem,
        { type: 'separator' },
        {
          type: 'action',
          name: 'Quick Fix',
          shortcutText: '⌘.',
          icon: 'success',
          callback: () => setLastAction('Quick Fix applied')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'Source Actions',
          shortcutText: '⌘⇧A',
          icon: 'more-horizontal',
          callback: () => setLastAction('Source Actions opened')
        } as ActionMenuItem
      ]
    } as GroupMenuItem
  )

  // Searchable menu with many items
  const searchableMenuItems: FleetMenuItem[] = buildMenu(
    {
      type: 'action',
      name: 'Find in Files',
      shortcutText: '⌘⇧F',
      icon: 'search',
      searchHint: 'search find locate',
      callback: () => setLastAction('Find in Files opened')
    } as ActionMenuItem,
    {
      type: 'action',
      name: 'Replace in Files',
      shortcutText: '⌘⇧H',
      icon: 'replace',
      searchHint: 'replace substitute',
      callback: () => setLastAction('Replace in Files opened')
    } as ActionMenuItem,
    {
      type: 'separator'
    },
    {
      type: 'action',
      name: 'Go to Line',
      shortcutText: '⌘G',
      icon: 'arrow-right',
      searchHint: 'goto navigation jump',
      callback: () => setLastAction('Go to Line opened')
    } as ActionMenuItem,
    {
      type: 'action',
      name: 'Go to Symbol',
      shortcutText: '⌘⇧O',
      icon: 'symbols',
      searchHint: 'symbol function class',
      callback: () => setLastAction('Go to Symbol opened')
    } as ActionMenuItem,
    {
      type: 'separator'
    },
    {
      type: 'group',
      name: 'Code Actions',
      icon: 'tools',
      children: [
        {
          type: 'action',
          name: 'Format Document',
          shortcutText: '⌘⇧I',
          icon: 'edit',
          callback: () => setLastAction('Document formatted')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'Organize Imports',
          shortcutText: '⌘⇧O',
          icon: 'file-types-javascript',
          callback: () => setLastAction('Imports organized')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'Quick Fix',
          shortcutText: '⌘.',
          icon: 'success',
          callback: () => setLastAction('Quick Fix applied')
        } as ActionMenuItem,
        { type: 'separator' },
        {
          type: 'action',
          name: 'Generate Code',
          shortcutText: '⌘N',
          icon: 'add',
          callback: () => setLastAction('Code generation started')
        } as ActionMenuItem,
        {
          type: 'action',
          name: 'Surround With',
          shortcutText: '⌘⌥T',
          icon: 'tools',
          callback: () => setLastAction('Surround With opened')
        } as ActionMenuItem
      ]
    } as GroupMenuItem
  )

  return (
    <ExamplePageTemplate
      title="Context Menu"
      description="Fleet-style context menus with right-click support, submenus, search, and full keyboard navigation. This uses default-multiline for proper leading after H1."
    >
      <div className="space-y-12">
        {/* Status */}
        <ExampleSectionCard title="Status">
          <div className="p-4 border border-border rounded-lg bg-muted/30">
            <Typography variant="default">
              <strong>Last Action:</strong> {lastAction}
            </Typography>
            <Typography variant="default" className="mt-2">
              <strong>Settings:</strong> Notifications: {notifications ? 'On' : 'Off'}, Auto Save: {autoSave ? 'On' : 'Off'}
            </Typography>
          </div>
        </ExampleSectionCard>

        {/* Button-triggered Context Menu */}
        <ExampleSectionCard title="Button-triggered Context Menu">
          <div className="space-y-4">
            <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
              Click the buttons below to open context menus programmatically.
            </Typography>
            <div className="flex gap-4 flex-wrap">
              <ContextMenu 
                items={basicMenuItems}
                trigger={
                  <Button variant="secondary">
                    Basic Menu
                  </Button>
                }
              />
              
              <ContextMenu 
                items={advancedMenuItems}
                trigger={
                  <Button variant="secondary">
                    Advanced Menu
                  </Button>
                }
              />
              
              <ContextMenu 
                items={searchableMenuItems}
                searchOptions={{ placeholderText: "Search actions..." }}
                trigger={
                  <Button variant="secondary">
                    Searchable Menu
                  </Button>
                }
              />
              
              <ContextMenu 
                items={allComponentsMenuItems}
                searchOptions={{ placeholderText: "Search components..." }}
                trigger={
                  <Button variant="primary">
                    All Components
                  </Button>
                }
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* Right-click Context Menu */}
        <ExampleSectionCard title="Right-click Context Menu">
          <div className="space-y-4">
            <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
              Right-click on the box below to see a context menu with all features: actions, submenus, checkboxes, and search.
            </Typography>
            <RightClickContextMenu 
              items={allComponentsMenuItems}
              searchOptions={{ placeholderText: "Search components..." }}
            >
              <div className="h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                <Typography variant="default" className="text-muted-foreground">
                  Right-click me for context menu
                </Typography>
              </div>
            </RightClickContextMenu>
          </div>
        </ExampleSectionCard>

        {/* Complete Component Reference */}
        <ExampleSectionCard title="Complete Component Reference" description="All available Fleet ContextMenu components and their variants, mirroring the original Fleet Compose implementation.">
          
          <div className="space-y-8">
            {/* Action Items */}
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Action Items</Typography>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Properties</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>name</code> - Display text</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>enabled</code> - Enable/disable state</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>description</code> - Secondary description text</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>shortcutText</code> - Keyboard shortcut display</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>tooltip</code> - Hover tooltip</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>secondaryText</code> - Additional text below</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>icon</code> - Left icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>rightIcon</code> - Right icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>customRightContent</code> - Custom right content</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>callback</code> - Click handler</Typography></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Variants</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>default</code> - Standard action</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>destructive</code> - Dangerous actions (red)</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>toggle-on</code> - Toggle state ON (checkmark)</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>toggle-off</code> - Toggle state OFF (indented)</Typography></li>
                  </ul>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }} className="mt-4">Layout Options</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>multiline</code> - Multi-line text layout</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>indentItemsWithoutIcon</code> - Icon alignment</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>textColor</code> - Custom text color</Typography></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Checkbox Items */}
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Checkbox Items</Typography>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Properties</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>name</code> - Display text</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>checked</code> - Current state</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>onChange</code> - State change handler</Typography></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Features</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Automatic checkmark display</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Fleet checkbox styling</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Hover and focus states</Typography></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Group Items (Submenus) */}
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Group Items (Submenus)</Typography>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Properties</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>name</code> - Display text</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>enabled</code> - Enable/disable state</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>icon</code> - Left icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>rightIcon</code> - Additional right icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>children</code> - Submenu items</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>searchable</code> - Enable search in submenu</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>dynamicWidth</code> - Dynamic width calculation</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>submenuDelayMs</code> - Hover delay</Typography></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Features</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Automatic chevron icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Hover delay activation</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Nested submenu support</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Smart positioning</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Search functionality</Typography></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Header Items */}
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Header Items</Typography>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Properties</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>name</code> - Header text</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>tooltip</code> - Hover tooltip</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>rightIcon</code> - Right-side icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>tailText</code> - Right-aligned text</Typography></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Features</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Secondary text color</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Non-interactive</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Section organization</Typography></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Separator and Text Items */}
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Separator & Text Items</Typography>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Separator</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Visual divider between sections</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Auto-cleanup (removes duplicates)</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Fleet border styling</Typography></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Text Items</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>text</code> - Display text</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Non-interactive display</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Status information</Typography></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Search Functionality */}
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Search Functionality</Typography>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Properties</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>placeholderText</code> - Search placeholder</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>searchValue</code> - Controlled search state</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• <code>onSearchChange</code> - Search change handler</Typography></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>Features</Typography>
                  <ul className="space-y-1">
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Real-time filtering</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Search prefix icon</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• &quot;Nothing found&quot; message</Typography></li>
                    <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Search hints for better matching</Typography></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Context Menu Features */}
        <ExampleSectionCard title="Context Menu Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Typography variant="header-3-semibold">Fleet Integration</Typography>
              <ul className="space-y-1">
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Fleet color system with theme awareness</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Fleet typography and spacing</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Fleet icon system integration</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Pixel-perfect Fleet styling</Typography></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Typography variant="header-3-semibold">Functionality</Typography>
              <ul className="space-y-1">
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Right-click context menus</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Button-triggered menus</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Searchable menu items</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Nested submenus</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Keyboard navigation</Typography></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Typography variant="header-3-semibold">Advanced Features</Typography>
              <ul className="space-y-1">
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Toggle state management</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Custom right content</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Multiline text support</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Destructive action styling</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Smart submenu positioning</Typography></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Typography variant="header-3-semibold">Accessibility</Typography>
              <ul className="space-y-1">
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Full keyboard navigation</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Screen reader support</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• Focus management</Typography></li>
                <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>• ARIA compliance</Typography></li>
              </ul>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Usage Example */}
        <ExampleSectionCard title="Usage Example">
          <div className="space-y-4">
            <Typography variant="default" className="text-muted-foreground">
              Here&apos;s how to create a context menu in your components:
            </Typography>
            <div className="p-4 border border-border rounded-lg bg-muted/30">
              <pre className="text-sm overflow-auto">
{`import { RightClickContextMenu, buildMenu } from "@/components/ui"

const menuItems = buildMenu(
  {
    type: 'action',
    name: 'Copy',
    shortcutText: '⌘C',
    icon: 'copy',
    callback: () => console.log('Copied!')
  },
  { type: 'separator' },
  {
    type: 'group',
    name: 'More Actions',
    children: [...]
  }
)

<RightClickContextMenu items={menuItems}>
  <div>Right-click me!</div>
</RightClickContextMenu>`}
              </pre>
            </div>
            
            <div className="mt-6 p-4 border border-border rounded-lg bg-muted/30">
              <Typography variant="default" className="font-medium mb-3">Available Fleet Icons</Typography>
              <Typography variant="default" className="text-muted-foreground text-sm mb-3">
                All icons use the Fleet icon system from public/icons/. Common examples:
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
                <div>• add</div>
                <div>• arrow-right</div>
                <div>• checkmark</div>
                <div>• chevron-right</div>
                <div>• close-small</div>
                <div>• copy</div>
                <div>• database</div>
                <div>• delete</div>
                <div>• edit</div>
                <div>• external-link</div>
                <div>• file-types-*</div>
                <div>• folder</div>
                <div>• new-file</div>
                <div>• replace</div>
                <div>• search</div>
                <div>• settings</div>
                <div>• success</div>
                <div>• symbols</div>
                <div>• tools</div>
                <div>• vcs-history</div>
              </div>
              <Typography variant="default" className="text-muted-foreground text-xs mt-3">
                See public/icons/ directory for the complete list of available icons.
              </Typography>
            </div>
          </div>
        </ExampleSectionCard>
      </div>
    </ExamplePageTemplate>
  );