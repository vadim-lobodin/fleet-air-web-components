"use client"

import React from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { 
  Typography
} from "@/components/ui/typography"
import { ExamplePageTemplate } from "@/components/ui"

export default function TypographyPage() {
  return (
    <ExamplePageTemplate
      title="Typography System"
      description="Complete Fleet typography system with all variants, weights, and sizes. This uses default-multiline for proper leading after H1."
    >
      <div className="space-y-12">
        
        {/* Headers Section */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Headers</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">All Header Variants</Typography>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-1">
                    <Typography variant="header-0-semibold">Header 0 Semibold</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-0-semibold&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-1-semibold">Header 1 Semibold</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-1-semibold&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-1">Header 1 Regular</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-1&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-2-semibold">Header 2 Semibold</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-2-semibold&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-2">Header 2 Regular</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-2&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-3-semibold">Header 3 Semibold</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-3-semibold&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-3">Header 3 Regular</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-3&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-4-semibold">Header 4 Semibold</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-4-semibold&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="header-5-semibold">HEADER 5 SEMIBOLD</Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;header-5-semibold&quot;
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Body Text</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Default Text Variants</Typography>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-1">
                    <Typography variant="default">
                      Default text variant - This is the standard body text used throughout Fleet applications.
                    </Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;default&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="default-italic">
                      Default italic text - Used for emphasis and special content.
                    </Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;default-italic&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="default-semibold">
                      Default semibold text - Used for stronger emphasis and important content.
                    </Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;default-semibold&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="default-semibold-italic">
                      Default semibold italic text - Used for strong emphasis with style.
                    </Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;default-semibold-italic&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="default-multiline">
                      Default multiline text - Optimized for longer content with proper line spacing.
                      This variant provides better readability for paragraphs and longer text blocks.
                    </Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;default-multiline&quot;
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <Typography variant="default-chat">
                      Default chat text - Optimized for chat interfaces and messaging.
                    </Typography>
                    <Typography variant="code" className="text-xs text-muted-foreground">
                      variant=&quot;default-chat&quot;
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Medium and Small Text</Typography>
              <div className="space-y-4 p-6 border border-border rounded-lg">
                <div className="space-y-1">
                  <Typography variant="medium">
                    Medium text variant - Used for secondary content and labels.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant=&quot;medium&quot;
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="medium-semibold">
                    Medium semibold text - Used for emphasized secondary content.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant=&quot;medium-semibold&quot;
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="small">
                    Small text variant - Used for captions, footnotes, and auxiliary information.
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant=&quot;small&quot;
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
                    const example = &quot;code text variant&quot;;
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant=&quot;code&quot;
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="code-italic">
                    const example = &quot;code italic variant&quot;;
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant=&quot;code-italic&quot;
                  </Typography>
                </div>
                
                <div className="space-y-1">
                  <Typography variant="code-bold">
                    const example = &quot;code bold variant&quot;;
                  </Typography>
                  <Typography variant="code" className="text-xs text-muted-foreground">
                    variant=&quot;code-bold&quot;
                  </Typography>
                </div>
              </div>
            </div>


          </div>
        </section>



      </div>
    </ExamplePageTemplate>
  )