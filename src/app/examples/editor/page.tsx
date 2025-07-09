"use client"

import React from "react"
import { Typography } from "@/components/ui/typography"
import { Editor } from "@/components/ui/editor"
import { ExampleSectionCard, ExamplePageTemplate } from "@/components/ui"

export default function EditorPage() {
  const [code, setCode] = React.useState(
    `class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    return this;
  }

  subtract(num) {
    this.result -= num;
    return this;
  }

  multiply(num) {
    this.result *= num;
    return this;
  }

  divide(num) {
    if (num === 0) {
      throw new Error("Cannot divide by zero!");
    }
    this.result /= num;
    return this;
  }

  getResult() {
    return this.result;
  }
}

const calc = new Calculator();
calc.add(10).subtract(5).multiply(2).divide(3);
console.log("Result:", calc.getResult()); // Expected: 3.333...

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5)); // Expected: 120

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(num => num * 2);
console.log("Doubled numbers:", doubledNumbers); // Expected: [2, 4, 6, 8, 10]

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers); // Expected: [2, 4]

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of numbers:", sum); // Expected: 15
`
  )

  return (
    <ExamplePageTemplate
      title="Editor"
      description="A simple code editor component using Monaco Editor, mirroring Fleet's editor capabilities. This uses default-multiline for proper leading after H1."
    >

      <ExampleSectionCard title="Code Editor Example">
        <Editor
          value={code}
          onChange={(value) => setCode(value)}
          language="javascript"
          height="600px"
        />
      </ExampleSectionCard>
    </ExamplePageTemplate>
  )
