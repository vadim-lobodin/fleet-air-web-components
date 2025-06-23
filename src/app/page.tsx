"use client"

import { Typography } from "@/components/ui/typography"
import React from "react"

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="space-y-6 border-t border-border pt-8 first:border-t-0 first:pt-0">
    <Typography variant="header-2-semibold" as="h2">
      {title}
    </Typography>
    <div className="rounded-lg border border-border bg-card p-6">
      {children}
    </div>
  </section>
)

const HeadersExample = () => (
  <div className="space-y-4">
    <Typography variant="header-0-semibold">Header 0 - Main Title</Typography>
    <Typography variant="header-1-semibold">Header 1 - Page Title</Typography>
    <Typography variant="header-2-semibold">Header 2 - Section Title</Typography>
    <Typography variant="header-3-semibold">Header 3 - Subsection</Typography>
    <Typography variant="header-4-semibold">Header 4 - Component Title</Typography>
    <Typography variant="header-5-semibold">Header 5 - Small Heading</Typography>
  </div>
)

const BodyTextExample = () => (
  <div className="space-y-4">
    <Typography variant="default">
      This is the default body text used for most content. It provides excellent readability
      and follows Fleet Air&apos;s typography guidelines.
    </Typography>
    <Typography variant="default-italic">
      This is italic body text for emphasis or special content.
    </Typography>
    <Typography variant="default-semibold">
      This is semibold body text for important information.
    </Typography>
    <Typography variant="default-multiline">
      This is multiline body text that maintains proper line spacing and readability
      across multiple lines of content. It&apos;s optimized for longer passages of text.
    </Typography>
    <Typography variant="default-chat">
      This is chat-style body text designed for conversational interfaces.
    </Typography>
  </div>
)

const MediumSmallExample = () => (
  <div className="space-y-4">
    <Typography variant="medium">
      Medium text is used for secondary information and UI labels.
    </Typography>
    <Typography variant="small">
      Small text is perfect for captions, footnotes, and auxiliary information.
    </Typography>
  </div>
)

const CodeTextExample = () => (
  <div className="space-y-4">
    <Typography variant="code">Regular code text</Typography>
    <Typography variant="code-italic">Italic code text</Typography>
    <Typography variant="code-bold">Bold code text</Typography>
    <div className="space-y-2">
      <Typography variant="default">
        Inline code: <Typography variant="code" as="span">const value = &quot;example&quot;</Typography>
      </Typography>
      <div className="p-4 bg-muted rounded-lg">
        <Typography variant="code" as="pre">
{`function example() {
  return "Hello, Fleet Air!";
}`}
        </Typography>
      </div>
    </div>
  </div>
)

export default function Home() {
  return (
    <div className="space-y-12">
      <Typography variant="header-1-semibold" as="h1" className="mb-8 border-b pb-2">Typography</Typography>
      <div className="space-y-8">
        <Section title="Headers">
          <HeadersExample />
        </Section>
        <Section title="Body Text">
          <BodyTextExample />
        </Section>
        <Section title="Secondary Text">
          <MediumSmallExample />
        </Section>
        <Section title="Code Text">
          <CodeTextExample />
        </Section>
      </div>
    </div>
  )
}
