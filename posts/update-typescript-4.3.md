---
title: TypeScript 4.3
description: null
tags: typescript
updatedAt: 2021-11-11
published: true
---

## [Separate Write Types on Properties](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#separate-write-types-on-properties)

TL;DR ゲッター・セッターで別の型指定ができるようになった。

```ts
class Thing {
  #size = 0;

  // 複数の型を受け付ける
  set size(value: string | number | boolean) {
    // ...（例外・変換処理など）
    this.#size = num;
  }
 
  // 受け付けたうちひとつの型を返す
  get size(): number {
    return this.#size;
  }
}
```

interfaceはこのように宣言できる。

```ts
interface Thing {
    get size(): number
    set size(value: number | string | boolean);
}
```

## [override and the \-\-noImplicitOverride Flag](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag)

TL;DR override キーワードで明示的なオーバーライドが記述できるようになった。

```ts
class SpecializedComponent extends SomeComponent {
    override show() {
        // ...
    }
    override hide() {
        // ...
    }
}
```

これにより派生元のクラスで該当メソッドが削除された時にコンパイルエラーが得られる。

```ts
// tsconfig.json
{
  compilerOptions: {
    noImplicitOverride: true,
  }
}
```

noImplicitOverrideフラグをオンにするとoverrideキーワードを強制できる。

## [Template String Type Improvements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#template-string-type-improvements)

TL;DR Template Literal にstringを代入した時、stringとして型推論される居づが改善された。

```ts
declare let s1: `${number}-${number}-${number}`;
declare let s2: `1-2-3`;
declare let s3: `${number}-2-3`;
s1 = s2;

// < 4.3: Type '`${number}-2-3`' is not assignable to type '`${number}-${number}-${number}`'.
s1 = s3;
```

```ts
function bar(s: string): `hello ${string}` {
  // < 4.3: Type 'string' is not assignable to type '`hello ${string}`'.
  return `hello ${s}`;
}
```

stringを埋め込んでTemplate Literalを返す関数はこのように宣言する。

```ts
declare function foo<V extends string>(arg: `*${V}*`): V;
```

## [ECMAScript \#private Class Elements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#ecmascript-private-class-elements)

TL;DR privateメソッドが記述できるようになった。

```ts
class Foo {
  // < 4.3: A method cannot be named with a private identifier.
  #someMethod() {}
}
```

staticメソッドにも展開できる。

```ts
class Foo {
  // < 4.3: A method cannot be named with a private identifier.
  static #someMethod() {}
}
```

## [ConstructorParameters Works on Abstract Classes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#constructorparameters-works-on-abstract-classes)

Abstract class のコンストラクタパラメータが型で取得できるようになった。

```ts
abstract class C {
  constructor(a:string, b: number) {}
}

type Params = ConstructorParameters<typeof C>;
```

## [Contextual Narrowing for Generics](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#contextual-narrowing-for-generics)

分からなかったので [このページ](https://zenn.dev/aumy/articles/typescript-430#%E5%9E%8B%E5%BC%95%E6%95%B0%E3%81%8C%E5%88%B6%E5%BE%A1%E3%83%95%E3%83%AD%E3%83%BC%E8%A7%A3%E6%9E%90%E3%81%A7%E7%B5%9E%E3%82%8A%E8%BE%BC%E3%81%BE%E3%82%8C%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB) を見た。

Tの制約がunionの時に、extends string なのか undefined が絞り込まれるようになった。

```ts
function f1<T extends string | undefined>(x: T): string {
  if (x) {
    // < 4.2: ype 'T' is not assignable to type 'string'.
    //  Type 'string | undefined' is not assignable to type 'string'.
    //    Type 'undefined' is not assignable to type 'string'.(2322)
    return x;
  }
  return "";
}
```

この挙動はTagged Unionでも同じ。

```ts
interface Square {
  type: "square";
  size: number;
}
interface Rectangle {
  type: "rectangle";
  width: number;
  height: number;
}

function f2<T extends Square | Rectangle>(t: T) {
  switch (t.type) {
    // < 4.2: Property 'size' does not exist on type 'T'.(2339)
    case "square": return t.size * 2;
    // < 4.2: Property 'width' does not exist on type 'T'.(2339)
    case "rectangle": return t.width * t.height;
  }
}
```

// WIP
