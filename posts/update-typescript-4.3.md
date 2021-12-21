---
title: TypeScript 4.3
description: null
tags: typescript, updates
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

## [Always\-Truthy Promise Checks](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#always-truthy-promise-checks)

[このページ](https://zenn.dev/aumy/articles/typescript-430#%E6%9D%A1%E4%BB%B6%E5%BC%8F%E3%81%A7%E3%81%AE-promise-%E3%81%AE%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF) の解説を参照。

Promiseの戻り値を条件判定に突っ込んだ場合、エラーが得られるようになった。`strictNullChecks` オプションがONの場合にのみ有効。

```ts
declare function promisefy(): Promise<boolean>;

async function bar(): Promise<string> {
  const promise = promisefy();

  // @error: This condition will always return true since this 'Promise<boolean>' is always defined.(2801)
  if (promise) {
    return "true";
  }

  return "false";
}
```

awaitすればOK。

```ts
  // @noerror
  if (await promise) {
    return "true";
  }
```

## [static Index Signatures](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#static-index-signatures)

Index Signaturesがクラスのstaticメンバに展開できるようになった。

```ts
class Foo {
  static [propName: string]: string | number | undefined;

  static str = "hello" as const;
  static no = 1234;
}

const str = Foo["str"]; // str: "hello"
const no = Foo["no"]; // no: number;
```

型に沿わないメンバのコンパイルエラーが得られる。

```ts
class Foo {
  static [propName: string]: string | number | undefined;

  // @error: Property 'hoge' of type '{}' is not assignable to string index type 'string | number | undefined'.
  static hoge = {};
}
```

## [\.tsbuildinfo Size Improvements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#tsbuildinfo-size-improvements)

`.tsbuildinfo` のファイルサイズの改善が入った。

.tsbuildinfoとはコンパイル時のバージョン情報をSHAハッシュしてファイル保存したもの。次回、差分を検出してコンパイルされるため高速化できる。

試しにこのリポジトリでファイルを出力してみる。

```shell
./node_modules/.bin/tsc foo.ts 
  \--incremental 
  \--module commonjs 
  \--tsBuildInfoFile buildinfo 
```

こんなファイルが出力された。

```ts
// buildinfo
{
  "program": {
    "fileInfos": {
      "./node_modules/typescript/lib/lib.d.ts": {
        "version": "2dc8c927c9c162a773c6bb3cdc4f3286c23f10eedc67414028f9cb5951610f60",
        "signature": "2dc8c927c9c162a773c6bb3cdc4f3286c23f10eedc67414028f9cb5951610f60",
        "affectsGlobalScope": false
      },
      "./node_modules/typescript/lib/lib.es5.d.ts": {
        "version": "c9a1f03d6ba0fe3c871eb0dd81622e78fbb61ade70878b34d48a341a690c59e9",
        "signature": "c9a1f03d6ba0fe3c871eb0dd81622e78fbb61ade70878b34d48a341a690c59e9",
        "affectsGlobalScope": true
      },
    },
    "semanticDiagnosticsPerFile": [
      
      "./node_modules/typescript/lib/lib.scripthost.d.ts",
      "./node_modules/typescript/lib/lib.webworker.importscripts.d.ts"
    ]
  },
  "version": "4.0.5"
}
```

TS4.3で繰り返し同じパスを出力する部分を数値化する事でサイズを削減しビルド時間が短縮できたそう。

## [Lazier Calculations in \-\-incremental and \-\-watch Compilations](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#lazier-calculations-in---incremental-and---watch-compilations)

`--incremental` と `--watch` モードは最初のビルドでプロジェクトを分析し場合によって `.tsbuildinfo` への保存が走るため、初回のコンパイルが遅くなる。TS4.3でこのパフォーマンスが改善された。

## [Import Statement Completions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#import-statement-completions)

import文の補完が改善された。

```ts
// ここまでタイプすると
import { writeFile
```

```ts
// 残りの部分がサジェストされる。
import { writeFile } from "fs";
```

ただしエディタの対応も必要。VSCode Insiders versions（β版ぽいやつ）がこれに対応しているらしい。

## [Editor Support for @link Tags](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#editor-support-for-link-tags)

`@link` タグからコードジャンプできるようになった。

```ts
import { foo } from "foo";

/**
 * {@link foo}
 */
```

VSCode Insiders versionsで対応。

## [Go\-to\-Definition on Non\-JavaScript File Paths](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#go-to-definition-on-non-javascript-file-paths)

これまでJSでないファイルのimport文からコードジャンプする事ができなかったが、できるようになった。

```ts
import "./styles.css"
```

## Breaking Changes

### [lib\.d\.ts Changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#libdts-changes)

`MSPointerEvent` `WebAuthentication` などのAPIが `lib.d.ts` から削除された。

### [useDefineForClassFields now defaults to true on esnext and eventually on es2022](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#usedefineforclassfields-now-defaults-to-true-on-esnext-and-eventually-on-es2022)

ESとTSのクラスの振る舞いの差分を吸収するオプション `useDefineForClassFields` が追加された。 `ES2022` 以降ではtrue（ESの仕様に合わせる）がデフォルトになる。

### [Union Enums Cannot Be Compared to Arbitrary Numbers](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#union-enums-cannot-be-compared-to-arbitrary-numbers)

Enumの値が数値の場合、Enumに含まれない数値がコンパイルエラーで得られるようになった。

```ts
enum E {
  A = 0,
  B = 1,
}
function doSomething(x: E) {
  // @error: This condition will always return 'false' since the types 'E' and '-1' have no overlap.
  if (x === -1) {}
}
```

< 4.3でも文字列の場合はコンパイルエラーが得られていた。

```ts
enum E {
  A = "foo",
  B = "bar"
}

function doSomething(x: E) {
  if (x === "fooooooo") {}
}
```
