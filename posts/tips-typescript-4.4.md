---
title: TypeScript 4.4
description: null
tags: typescript, updates
updatedAt: 2021-12-16
published: true
---

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html

## Control Flow Analysis of Aliased Conditions and Discriminants

```ts

```

```ts
function foo(arg: unknown) {
  const argIsString = typeof arg === "string";
  if (argIsString) {
    console.log(arg.toUpperCase());
    //              ~~~~~~~~~~~
    // Error! Property 'toUpperCase' does not exist on type 'unknown'.
  }
}
```
