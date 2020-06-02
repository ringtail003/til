https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html

## Promise.allの型推論の改善

## speed improvements

## // @ts-expect-error

// @ts-ignoreと似ている
// @ts-expect-errorは次の行にエラーがある事を示す？

```typescript
function doStuff(abc:string) {}

// @ts-expect-error
doStuff(123);

// error: Type 'number' is not assignable to type 'string'. <--- このエラーを抑制するっぽい
```

## Uncalled function checks in conditional expressions

```typescript
declare function isDirectory

if (isDirectory) // misuse
// This condition will always return true since the function is always defined. <--- このエラーを得られる
```

## Editor support

### CommonJS Auto-imports in JavaScript

```typescript
const { readFile } = require('fs'); // <--- こう書けるようになった
```

### Code actions preserve newlines

```typescript
for (let i = 0; i <= maxValue; i++) {
  // first get the squared value.
  let square = i ** 2;
  
  // print
  console.log(square);
}
```

右クリックメニュー？で `extract to function in global scope` する時、改行が維持されるように改善。

```typescript
// こうなってたみたい
for (let i = 0; i <= maxValue; i++) {
  // first get the squared value.
  let square = i ** 2;
  // print
  console.log(square);
}
```

### Quick fixes for missin return expressions

この変換が右クリックメニュー？の `Add a return statement` `Remove block body blace` でできるようになった。

```typescript
people.sort((a, b) => a.age - b.age);
```

```typescript
people.sort((a, b) => {
  return a.age - b.age;
});
```

### Support for "Solution Style" tsconfig.json Files

```javascript
// tsconfig.json
{
    "files": [],
    "references": [
        { "path": "./tsconfig.shared.json" },
        { "path": "./tsconfig.frontend.json" },
        { "path": "./tsconfig.backend.json" },
    ]
}
```

ファイル参照だけを持つこのファイルは「solution」と呼ばれる事がある。
エディタがこれを理解してくれるようになったらしい。

## Breaking changes

### Parsing differences in optional chaining and non-null assertions

トランスパイルの方法が変わった。

```typescript
foo?.bar!.baz

// old
(foo?.bar).baz

// new
(foo?.bar)!.baz
```

### } and > are Now invalid JSX text characters

スキップ

### Stricter checks on intersections and optional properties

```typescript
interface A {
    a: number; // notice this is 'number'
}

interface B {
    b: string;
}

interface C {
    a?: boolean; // notice this is 'boolean'
    b: string;
}

declare let x: A & B;
declare let y: C;

y = x;
```

これが通ってたらしい。
3.9から型を一度に評価するから互換性に関するエラーが得られるっぽい。

### Intersections reduced by discriminant properties

```typescript
declare function smushObjects<T, U>(x: T, y: U): T & U;

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

declare let x: Circle;
declare let y: Square;

let z = smushObjects(x, y);
console.log(z.kind);
```

kindが `"circle" & "square"` と評価されていたらしい。（=never）
3.9からエラーになる。

### Getters/Setters are no longer enumerable

get/set accessorが列挙可能にセットされていた。
ECMAScriptの仕様では列挙可能ではないので仕様に反していた。
これを直したっぽい。

### Type parameters that extend any no longer act as any

```typescript
function foo<T extends any>(arg: T) {
    arg.spfjgerijghoied; // no error!
}
```

エラーが出ないのは見落としだったので改善。

### export * is always retained

`export * from "foo"` でfooが何もexportしない場合、トランスパイル後のJavaScriptから消え去っていた。
これを保持するようになる。

### More libdom.d.ts refinements

domの型宣言に関する改善。HTMLVideoElementとか。
