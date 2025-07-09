"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  VerticalTabs,
  FileTab,
  CounterTab,
  IconTab
} from "@/components/ui/tabs"
import { Icon } from "@/components/ui/icon"
import { ExampleSectionCard, ExamplePageTemplate } from "@/components/ui"

export default function TabsPage() {
  return (
    <ExamplePageTemplate
      title="Tabs"
      description="Fleet-inspired tab component with all variants, states, and keyboard navigation. This uses default-multiline for proper leading after H1."
    >

      <div className="space-y-12">
        
        {/* Basic Tabs */}
        <ExampleSectionCard title="Basic Tabs">
          
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-6">
                  <Typography variant="header-3-semibold">Account Settings</Typography>
                  <Typography variant="default" className="mt-2">
                    Make changes to your account here. Click save when you&apos;re done.
                  </Typography>
                </TabsContent>
                <TabsContent value="password" className="mt-6">
                  <Typography variant="header-3-semibold">Password Settings</Typography>
                  <Typography variant="default" className="mt-2">
                    Change your password here. After saving, you&apos;ll be logged out.
                  </Typography>
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                  <Typography variant="header-3-semibold">General Settings</Typography>
                  <Typography variant="default" className="mt-2">
                    Configure your application preferences.
                  </Typography>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Icon Tabs */}
        <ExampleSectionCard title="Icon Tabs">
          
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              <Tabs defaultValue="files" className="w-full">
                <TabsList>
                  <IconTab value="files" icon={<Icon fleet="file-types-text" size="sm" />}>
                    Files
                  </IconTab>
                  <IconTab value="terminal" icon={<Icon fleet="terminal" size="sm" />}>
                    Terminal
                  </IconTab>
                  <IconTab value="database" icon={<Icon fleet="database" size="sm" />}>
                    Database
                  </IconTab>
                </TabsList>
                <TabsContent value="files" className="mt-6">
                  <Typography variant="default">
                    Browse and manage your project files and folders.
                  </Typography>
                </TabsContent>
                <TabsContent value="terminal" className="mt-6">
                  <Typography variant="default">
                    Command line interface for development tasks.
                  </Typography>
                </TabsContent>
                <TabsContent value="database" className="mt-6">
                  <Typography variant="default">
                    Manage your database connections and queries.
                  </Typography>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ExampleSectionCard>

        {/* File Tabs */}
        <ExampleSectionCard title="File Tabs">
          
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              <Tabs defaultValue="app.tsx" className="w-full">
                <TabsList>
                  <FileTab
                    value="app.tsx"
                    filename="App.tsx"
                    fileIcon={<Icon fleet="file-types-typescript" size="sm" />}
                    onClose={() => console.log("Close App.tsx")}
                  />
                  <FileTab
                    value="main.java"
                    filename="Main.java"
                    fileIcon={<Icon fleet="file-types-java" size="sm" />}
                    isModified={true}
                    onClose={() => console.log("Close Main.java")}
                  />
                  <FileTab
                    value="package.json"
                    filename="package.json"
                    fileIcon={<Icon fleet="file-types-json" size="sm" />}
                    onClose={() => console.log("Close package.json")}
                  />
                </TabsList>
                <TabsContent value="app.tsx" className="mt-6">
                  <Typography variant="default">
                    App.tsx file content - TypeScript React component.
                  </Typography>
                </TabsContent>
                <TabsContent value="main.java" className="mt-6">
                  <Typography variant="default">
                    Main.java file content - Modified file with unsaved changes.
                  </Typography>
                </TabsContent>
                <TabsContent value="package.json" className="mt-6">
                  <Typography variant="default">
                    package.json file content - Project dependencies.
                  </Typography>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Counter Tabs */}
        <ExampleSectionCard title="Counter Tabs">
          
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              <Tabs defaultValue="issues" className="w-full">
                <TabsList>
                  <CounterTab value="issues" count={5}>Issues</CounterTab>
                  <CounterTab value="pull-requests" count={12}>Pull Requests</CounterTab>
                  <CounterTab value="notifications" count={3}>Notifications</CounterTab>
                  <CounterTab value="todos" count={0}>TODOs</CounterTab>
                </TabsList>
                <TabsContent value="issues" className="mt-6">
                  <Typography variant="default">
                    Issues panel - 5 open issues requiring attention.
                  </Typography>
                </TabsContent>
                <TabsContent value="pull-requests" className="mt-6">
                  <Typography variant="default">
                    Pull Requests panel - 12 open pull requests for review.
                  </Typography>
                </TabsContent>
                <TabsContent value="notifications" className="mt-6">
                  <Typography variant="default">
                    Notifications panel - 3 unread notifications.
                  </Typography>
                </TabsContent>
                <TabsContent value="todos" className="mt-6">
                  <Typography variant="default">
                    TODOs panel - All tasks completed!
                  </Typography>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Vertical Tabs */}
        <ExampleSectionCard title="Vertical Tabs">
          
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              <VerticalTabs defaultValue="general" className="w-full">
                <div className="flex gap-6">
                  <TabsList orientation="vertical" className="w-48">
                    <TabsTrigger value="general" className="w-full justify-start gap-2">
                      <Icon fleet="configure" size="sm" />
                      General
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="w-full justify-start gap-2">
                      <Icon fleet="theme" size="sm" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger value="editor" className="w-full justify-start gap-2">
                      <Icon fleet="editor-suspend" size="sm" />
                      Editor
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex-1">
                    <TabsContent value="general">
                      <Typography variant="header-3-semibold">General Settings</Typography>
                      <Typography variant="default" className="mt-2">
                        Configure general application preferences and behavior.
                      </Typography>
                    </TabsContent>
                    <TabsContent value="appearance">
                      <Typography variant="header-3-semibold">Appearance Settings</Typography>
                      <Typography variant="default" className="mt-2">
                        Customize the visual appearance and theme settings.
                      </Typography>
                    </TabsContent>
                    <TabsContent value="editor">
                      <Typography variant="header-3-semibold">Editor Settings</Typography>
                      <Typography variant="default" className="mt-2">
                        Configure editor behavior, formatting, and preferences.
                      </Typography>
                    </TabsContent>
                  </div>
                </div>
              </VerticalTabs>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Tab Sizes */}
        <ExampleSectionCard title="Tab Sizes">
          
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography variant="header-3-semibold">Small Tabs</Typography>
              <div className="p-6 border border-border rounded-lg">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1" size="sm">Overview</TabsTrigger>
                    <TabsTrigger value="tab2" size="sm">Details</TabsTrigger>
                    <TabsTrigger value="tab3" size="sm">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-6">
                    <Typography variant="default">Small tab content</Typography>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-6">
                    <Typography variant="default">Details content</Typography>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-6">
                    <Typography variant="default">History content</Typography>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="header-3-semibold">Large Tabs</Typography>
              <div className="p-6 border border-border rounded-lg">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1" size="lg">Overview</TabsTrigger>
                    <TabsTrigger value="tab2" size="lg">Details</TabsTrigger>
                    <TabsTrigger value="tab3" size="lg">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-6">
                    <Typography variant="default">Large tab content</Typography>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-6">
                    <Typography variant="default">Details content</Typography>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-6">
                    <Typography variant="default">History content</Typography>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </ExampleSectionCard>

      </div>
    </ExamplePageTemplate>
  )
}
