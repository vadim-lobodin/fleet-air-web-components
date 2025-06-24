"use client"

import React from "react"
import { 
  Typography, 
  Heading,
  H1, H2, H3, H4, H5,
  Text, Body, Caption,
  Code, InlineCode, CodeBlock
} from "@/components/ui/typography"

export default function TypographyPage() {
  return (
    <div className="space-y-12">
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Typography System
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Complete Fleet typography system with all variants, weights, and sizes
        </Typography>
      </div>

      <div className="space-y-12">
        
        {/* Headers Section */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Headers</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">All Header Variants</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <Typography variant="header-0-semibold">Header 0 Semibold</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-0-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-1-semibold">Header 1 Semibold</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-1-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-1">Header 1 Regular</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-1"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-2-semibold">Header 2 Semibold</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-2-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-2">Header 2 Regular</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-2"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-3-semibold">Header 3 Semibold</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-3-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-3">Header 3 Regular</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-3"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-4-semibold">Header 4 Semibold</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-4-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="header-5-semibold">HEADER 5 SEMIBOLD</Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="header-5-semibold"
                  </Typography>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Semantic Heading Components</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <H1>H1 Component (Semibold)</H1>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<H1>H1 Component</H1>"}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <H1 weight="regular">H1 Component (Regular)</H1>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'<H1 weight="regular">H1 Component</H1>'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <H2>H2 Component</H2>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<H2>H2 Component</H2>"}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <H3>H3 Component</H3>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<H3>H3 Component</H3>"}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <H4>H4 Component</H4>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<H4>H4 Component</H4>"}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <H5>H5 COMPONENT</H5>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<H5>H5 Component</H5>"}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Body Text</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Default Text Variants</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <Typography variant="default">
                    Default text variant - This is the standard body text used throughout Fleet applications.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="default"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="default-italic">
                    Default italic text - Used for emphasis and special content.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="default-italic"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="default-semibold">
                    Default semibold text - Used for stronger emphasis and important content.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="default-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="default-semibold-italic">
                    Default semibold italic text - Used for strong emphasis with style.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="default-semibold-italic"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="default-multiline">
                    Default multiline text - Optimized for longer content with proper line spacing.
                    This variant provides better readability for paragraphs and longer text blocks.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="default-multiline"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="default-chat">
                    Default chat text - Optimized for chat interfaces and messaging.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="default-chat"
                  </Typography>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Medium and Small Text</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <Typography variant="medium">
                    Medium text variant - Used for secondary content and labels.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="medium"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="medium-semibold">
                    Medium semibold text - Used for emphasized secondary content.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="medium-semibold"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="small">
                    Small text variant - Used for captions, footnotes, and auxiliary information.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="small"
                  </Typography>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Semantic Text Components</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <Text>Default Text component with regular weight</Text>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<Text>Default Text component</Text>"}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Text weight="semibold">Text component with semibold weight</Text>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'<Text weight="semibold">Text component</Text>'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Text fontStyle="italic">Text component with italic style</Text>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'<Text fontStyle="italic">Text component</Text>'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Text size="medium">Medium sized text component</Text>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'<Text size="medium">Medium sized text</Text>'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Text size="small">Small sized text component</Text>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'<Text size="small">Small sized text</Text>'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Body>
                    Body component - This is a paragraph-like component that defaults to using the p tag.
                    It's perfect for longer content and maintains proper spacing.
                  </Body>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<Body>Body component content</Body>"}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Caption>Caption component - Used for image captions and small annotations</Caption>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<Caption>Caption component</Caption>"}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Text Section */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Code Text</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Code Variants</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <Typography variant="code">
                    const example = "code text variant";
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="code"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="code-italic">
                    const example = "code italic variant";
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="code-italic"
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="code-bold">
                    const example = "code bold variant";
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant="code-bold"
                  </Typography>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Code Components</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <div>
                    Regular text with <InlineCode>inline code</InlineCode> element.
                  </div>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'Regular text with <InlineCode>inline code</InlineCode> element.'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <div>
                    Text with <Code weight="bold">bold inline code</Code> element.
                  </div>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'Text with <Code weight="bold">bold inline code</Code> element.'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <div>
                    Text with <Code fontStyle="italic">italic inline code</Code> element.
                  </div>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {'Text with <Code fontStyle="italic">italic inline code</Code> element.'}
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <CodeBlock>
{`function example() {
  const greeting = "Hello, Fleet!";
  console.log(greeting);
  return greeting;
}`}
                  </CodeBlock>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    {"<CodeBlock>...</CodeBlock>"}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Usage Examples</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Common Patterns</Typography>
              <div className="space-y-6 p-6 border border-border rounded-lg">
                
                {/* Article Pattern */}
                <div className="space-y-3">
                  <H2>Article Title Pattern</H2>
                  <Text size="medium" className="text-muted-foreground">
                    Published on December 15, 2024 by Fleet Team
                  </Text>
                  <Body variant="multiline">
                    This is an example of a typical article layout using Fleet typography components.
                    The heading uses the H2 component, followed by metadata in medium text with muted colors,
                    and then the main content in a Body component with multiline variant for optimal readability.
                  </Body>
                  <Body variant="multiline">
                    Code examples can be seamlessly integrated: <InlineCode>npm install fleet-ui</InlineCode>
                    or in blocks for larger snippets.
                  </Body>
                </div>

                {/* Card Pattern */}
                <div className="p-4 border border-border rounded-md space-y-2">
                  <H4>Card Title</H4>
                  <Text>Card description using the default Text component.</Text>
                  <Caption className="text-muted-foreground">
                    Additional details in caption text
                  </Caption>
                </div>

                {/* List Pattern */}
                <div className="space-y-2">
                  <H4>Feature List</H4>
                  <ul className="space-y-1 ml-4">
                    <li><Text>Complete typography system with <Text weight="semibold">semantic components</Text></Text></li>
                    <li><Text>Support for <Code>code highlighting</Code> and formatting</Text></li>
                    <li><Text size="small">Consistent spacing and line heights</Text></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
} 