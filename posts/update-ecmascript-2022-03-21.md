---
title: 
description: null
tags: null
updatedAt: 2022-03-21
published: true
---

2022/03/21 時点の Finished Proposals を集めたもの。

## Array.includes

https://github.com/tc39/proposal-Array.prototype.includes

```js
[1, 2].includes(1);
// > true
```

- https://caniuse.com/array-includes

## Exponentiation Operator

https://github.com/tc39/proposal-exponentiation-operator

べき乗演算子。

```js
Math.pow(2, 3);
// > 8

2 ** 3;
// > 8
```

- https://caniuse.com/mdn-javascript_operators_exponentiation

## Object.values/Object.entries

https://github.com/tc39/proposal-object-values-entries

```js
const obj = { a:1, b:"b" };

Object.entries(obj);
// > [ [ 'a', 1 ], [ 'b', 'b' ] ]

Object.values(obj);
// > [ 1, 'b' ]
```

- https://caniuse.com/object-values
- https://caniuse.com/object-entries

【参考】map を Object に変換したい時は Object.fromEntries が有効。

```js
const map = new Map();
map.set("a",1);
map.set("b",2);

map.entries().map();
// Uncaught TypeError: map.entries(...).map is not a function

Object.fromEntries(map.entries);
// > { a:1, b:2 }
```

## String.padStart/String.padEnd

https://github.com/tc39/proposal-string-pad-start-end

```js
"1".padStart(5, "0")
// > '00001'

"1".padEnd(5, "0")
// > '10000'
```

- https://caniuse.com/pad-start-end

## Object.getOwnPropertyDescriptors

https://github.com/tc39/proposal-object-getownpropertydescriptors

属性を記録する「プロパティ記述子」の列挙。

```js
Object.getOwnPropertyDescriptors(obj)
{
  a: { value: 1, writable: true, enumerable: true, configurable: true },
  b: { value: 'b', writable: true, enumerable: true, configurable: true }
}
```

- https://caniuse.com/mdn-javascript_builtins_object_getownpropertydescriptor

## trailing-function-commas

https://github.com/tc39/proposal-trailing-function-commas

おそらく関数の末尾の引数にカンマを付けることをデフォルトのシンタックスとするもの。

```js
function something(
  foo,
  bar,
) {}
```

## Async functions

https://github.com/tc39/proposal-async-await

詳細不明。

## Shared memory and atomics

https://github.com/tc39/proposal-ecmascript-sharedmem

詳細不明。
SharedArrayBuffer を使い Worker とメモリを共有する？

```js
var sab = new SharedArrayBuffer(1024);

var sab;
onmessage = function (ev) {
   sab = ev.data;  // 1KiB shared memory, the same memory as in the parent
}
```

- https://caniuse.com/sharedarraybuffer

## Lifting template literal restriction

https://github.com/tc39/proposal-template-literal-revision

詳細不明。

Unicode のリテラルは以下のように表記する。

```js
`\uD83C\uDF4E`;
// 🍎
```

CodePoint での表記は以下のとおり。

```js
"🍎".codePointAt(0)
// > 127822（16進数で1F34E）

`\u{1F34E}`
// 🍎
```

リポジトリを見ると `{\unicode}` がシンタックスエラーになるとあるが、使いどころがわからない。

JavaScript の Unicode の扱いについて [jsprimer](https://jsprimer.net/basic/string-unicode/) が詳しい。

## s (dotAll) flag for regular expressions

https://github.com/tc39/proposal-regexp-dotall-flag

正規表現の s フラグが追加された。

```js
/foo.bar/.test("foo\nbar");
// > false

/foo.bar/.test("foo\rbar");
// > false
```

s フラグを指定すると . は改行（\n）、キャリッジリターン（\r）、段落記号、ラインセパレーターに一致する。

```js
/foo.bar/s.test("foo\nbar");
// > true

/foo.bar/s.test("foo\rbar");
// > true
```

## RegExp named capture groups

https://github.com/tc39/proposal-regexp-named-groups

```js
/(\d{4})-(\d{2})-(\d{2})/u.exec("2000-02-03")

// [
//   '2000-02-03',
//   '2000',
//   '02',
//   '03',
//   index: 0,
//   input: '2000-02-03',
//   groups: undefined
// ]
```

`(?<name>)` とすると `groups.name` で取り出せる。

```js
/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u.exec("2000-02-03")

// [
//   '2000-02-03',
//   '2000',
//   '02',
//   '03',
//   index: 0,
//   input: '2000-02-03',
//   groups: [Object: null prototype] { year: '2000', month: '02', day: '03' }
// ]

// groups.year ===> 2000
// groups.month ===> 02
// groups.date ===> 03
```

## Rest/Spread Properties

https://github.com/tc39/proposal-object-rest-spread

spread operator で「残り要素」を取り出せる。

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

x // 1
y // 2
z // { a: 3, b: 4 }
```

## RegExp Lookbehind Assertions

https://github.com/tc39/proposal-regexp-lookbehind

正規表現で先読み/後読みがサポートされた。

先読み（Lookahead）

```js
"123 456€".match(/\d+(?=€)/)[0]

// 数値を先読みし、"€"が続く場合にマッチ
// 456
```

否定

```js
"123 abc 456€".match(/\d+(?!€)/)[0]

// 数値を先読みし、"€"が続かない場合にマッチ
// 123
```

後読み（Lookbehind）

```js
"123 abc $456".match(/(?<=\$)\d+/)[0]

// 数値を後よみし、"$"に続く場合にマッチ
// 456
```

否定

```js
"123 abc $456".match(/(?<!\$)\d+/)[0]

// 数値を後よみし、"$"に続かない場合にマッチ
// 123
```

このページが詳しい。
https://ja.javascript.info/regexp-lookahead-lookbehind#ref-1811

## RegExp Unicode Property Escapes

https://github.com/tc39/proposal-regexp-unicode-property-escapes

詳細不明。
正規表現で Unicode がエスケープされるようになった？

## Promise.prototype.finally

https://github.com/tc39/proposal-promise-finally

`finally` のサポート。

```js
Promise.reject().finally(() => {});
Promise.resolve().finally(() => {});
```

## https://github.com/tc39/proposal-async-iteration

https://github.com/tc39/proposal-async-iteration

`for-await-of` が書けるようになった。

```js
for await (const line of readLines(filePath)) {
  console.log(line);
}
```

## Optional catch binding

https://github.com/tc39/proposal-optional-catch-binding

従来は catch で引数を指定しないといけなかった。


```js
try {
  ...
} catch(e) {
  ...
}
```

これが省略できるようになった。
`()` ごと省略する必要がある。

```js
try {
  ...
} catch {
  ...
}
```

## JSON superset

https://github.com/tc39/proposal-json-superset

`\u2028（行区切り）` や `\u2029（段落区切り）` は json に含むことができたが、JavaScript で扱うことができなかった。
これができるようになった。

```js
JSON.parse('{"text":"\u2028hoge"}')
// > { text: ' hoge' }
```

## Symbol.prototype.description

https://github.com/tc39/proposal-Symbol-description

Symbol の description へのアクセスが可能になった。

```js
const s = Symbol("foobarhoge");

s;
// > Symbol(foobarhoge)

s.description;
// > foobarhoge
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description

## Function.prototype.toString revision

https://github.com/tc39/Function-prototype-toString-revision

詳細不明。
`function.toString()` の更新？

## Object.fromEntries

https://github.com/tc39/proposal-object-from-entries

`fromEntries` が策定された。

```js
Object.entries({ a: 1 })
// [ [ 'a', 1 ] ]

Object.fromEntries([["a",1]])
// { a: 1 }

Object.fromEntries(Object.entries({ a: 1 }))
// { a: 1 }
```

## Well-formed JSON.stringify

https://github.com/tc39/proposal-well-formed-stringify

不正なサロゲートペアが文字列で出力されるようになった。

```js
JSON.stringify("\uD867\uDE3D")
// '"𩸽"'

JSON.stringify("\uD867")
// サロゲートペアの先頭のみは不正とみなされる
// '"\\ud867"'
```

`JSON.stringify` を通さない場合は文字列で集つ力されない。

```js
"\uD867"
// ?（文字化け）
```

## String.prototype.{trimStart,trimEnd}

https://github.com/tc39/proposal-string-left-right-trim

`String.trimStart` `String.trimEnd` が使えるようになった。

```js
"  hoge  ".trim()
// 'hoge'

"  hoge  ".trimStart()
// 'hoge  '

"  hoge  ".trimEnd()
// '  hoge'
```

全角スペースもいける。

```js
"　hoge　".trim()
// "hoge"
```

タブ、改行記号、キャリッジリターンなんかもいけるらしい。

```js
"\nhoge\n".trim()
// 'hoge'
```

## Array.prototype.{flat,flatMap}

https://github.com/tc39/proposal-flatMap

`Array.flat` `Array.flatMap` の実装。

```js
[[1],[2],3].flat()
// [1, 2, 3]

[[[1]]].flat()
// [[1]]
```

第二引数には深さレベル（デフォルト: 1）を指定できる。

```js
// 3段階のネストまで展開
[[[1]], [[[2]]]].flat(3)
// [1, 2]
```

## String.prototype.matchAll

https://github.com/tc39/proposal-string-matchall

`String.match` では複数回の一致がフラットな配列で取り出され、グループで取り出すことができない。

```js
"test1 test2 test100".match(/(?<text>test)(?<number>\d{1,})/g)
// [ 'test1', 'test2', 'test100' ]
```

`String.matchAll` では複数回の一致をグループとして取り出すことができる。

```js
[..."test1 test2 test100".matchAll(/(?<text>test)(?<number>\d{1,})/g)]
// [
//   [
//     'test1',
//     ...
//     groups: [Object: null prototype] { text: 'test', number: '1' }
//   ],
//   [
//     'test2',
//     ...
//     groups: [Object: null prototype] { text: 'test', number: '2' }
//   ],
//   [
//     'test100',
//     ...
//     groups: [Object: null prototype] { text: 'test', number: '100' }
//   ]
// ]
```

## import()

https://github.com/tc39/proposal-dynamic-import

`import("パス").then().catch()` が使えるようになった。

```js
// test.js
export const foo = {
  text: "foo"
};

// index.js
import("./test.js").then((module) => {
  console.log(module);
  // { foo: { text: "foo" } }
});
```

`export default` もいける。

```js
// test.js
export default {
  text: "foo"
};

// index.js
import("./test.js").then((module) => {
  console.log(module);
  // { default: { text: "foo" } }
});
```

`module.exports = ` もいける。

```js
// test.js
module.exports = {
  text: "foo"
};

// index.js
import("./test.js").then((module) => {
  console.log(module);
  // { 
  //  text: "foo",
  //  default: { text: "foo" }
  // }
});
```

## BigInt

https://github.com/tc39/proposal-bigint

JavaScript の数値の範囲は `-2 **53` から `2 **53` まで。
これを超える場合、正しく計算されないことがある。

```js
Number.MAX_SAFE_INTEGER
// 9007199254740991（9007兆）

9007199254740992 === 9007199254740993
// true
```

後ろに `n` を付けると BigInt 扱いになる。

```js
9007199254740992n === 9007199254740993n
// false
```

コンストラクターは `BigInt` 。

```js
BigInt(1);
// 1n
```

## Promise.allSettled

https://github.com/tc39/proposal-promise-allSettled

`Promise.all` はすべての Promise が成功した時に実行される。
どれかひとつでも失敗するとコールバックは実行されない欠点があった。

`Promise.allSettled` はすべての Promise が成功または失敗した時に実行される。

```js
Promise.allSettled([Promise.reject(), Promise.resolve()])
  .then(results => {
    return results.map(result => result.status);
    // ['rejected', 'fulfilled]
  });
```

## globalThis

https://github.com/tc39/proposal-global

実行環境やコンテキストに影響を受けず、一貫してグローバルオブジェクトを提供する。

```js
// Node.js

globalThis === global;
// true
```

```js
// Browser

globalThis === window;
// true
```

iframe でグローバルオブジェクトが window ではなく Proxy になるなど、上記に示した例の限りではない。

## for-in mechanics

https://github.com/tc39/proposal-for-in-order

詳細不明。
`for-in` の列挙順は `EnumerableOwnPropertyNames` ひいては `EnumerateObjectProperties` に基づくものらしい。
JavaScript ではオブジェクトの列挙順は保証されないと見かけるが、この仕様が列挙順を担保するものか？

## Optional Chaining

https://github.com/tc39/proposal-optional-chaining

null または undefined の場合に右辺を実行しない。

```js
foo?.bar?.baz;
```

## Nullish coalescing Operator

https://github.com/tc39/proposal-nullish-coalescing

null または undefined の場合に右辺を代入する。

```js
foo ?? bar
```

## import.meta

https://github.com/tc39/proposal-import-meta

モジュールとして読み込まれたファイルから参照可能。
インポートに関するメタデータがセットされたオブジェクトと定められている。
ブラウザで実行されているのか Node.js なのか等、実行環境によりオブジェクトの中身は変化する。

codeSandbox で `import.meta` を参照すると `outside module` 扱いになってしまいエラーが発生するため検証できず。

## String.prototype.replaceAll

https://github.com/tc39/proposal-string-replaceall

replace の全置換バージョン。

```js
"?foo=1&bar=2&baz=3".replaceAll("&", "+")
// '?foo=1+bar=2+baz=3'
```

g フラグでも同じ。
`+` など正規表現の意味をもつ記号をエスケープしないといけないデメリットがあると記載されている。

```js
"?foo=1&bar=2&baz=3".replace(/&/g, "+")
// '?foo=1+bar=2+baz=3'
```

## Promise.any

https://github.com/tc39/proposal-promise-any

Promise の配列のうちひとつでも fulfilled になれば実行される。
すべて rejected ならば実行されない。

```js
Promise.any([
  Promise.reject(),
  Promise.resolve(),
])
  .then(() => console.log("any"))
;
```

## WeakRefs

https://github.com/tc39/proposal-weakrefs

参照が GC による破棄の対象になる、弱い参照をもつ。

```js
let obj = { a: 1 };

// obj への弱い参照を持つ
const ref = new WeakRef(obj);

// obj を参照している
ref.deref(); // { a: 1 }

// obj が null になる
obj = null;

// しばらく経過すると（=ガベージコレクションが実行されると）undefinedになる
ref.deref(); // undefined
```

WeakRef については [この記事](https://qiita.com/uhyo/items/5dc97667ba90ce3941cd) が詳しい。

## Logical Assignment Operators

https://github.com/tc39/proposal-logical-assignment

```js
if (a) {
  a = 100;
}

// true と評価できれば値を代入する
a &&= 100;
```

```js
if (!a) {
  a = 100;
}

// false と評価できれば値を代入する
a ||= 100;
```

```js
if (a === undefined || a === null) {
  a = 100;
}

a ??= 100;
```

## Numeric separators

https://github.com/tc39/proposal-numeric-separator

マジックナンバーに桁数の区切りを使用できる。

```js
const n = 123_456;
n;
// 123456
```

## Class Fields

クラス構文が private/public/static をサポート。

## RegExp Match Indices

https://github.com/tc39/proposal-regexp-match-indices

`d` フラグを付けて正規表現で検索した場合に、マッチした位置を `indices` から得られる。
以下のサンプルは先頭だけマッチしている。2 回以上マッチした時の取り方は不明。

```js
/(abc)/d.exec("abcabcabc")

// [
//   'abc',
//   'abc',
//   index: 0,
//   input: 'abcabcabc',
//   groups: undefined,
//   indices: [ [ 0, 3 ], [ 0, 3 ], groups: undefined ]
// ]
```

## Top-level await

https://github.com/tc39/proposal-top-level-await

トップレベルの await がサポートされた。

```js
const strings = await import("foo/bar");

const connection = await initialize();
```

## Ergonomic brand checks for Private Fields

https://github.com/tc39/proposal-private-fields-in-in

クラス構文でプライベート変数を示す `#` をサポート。

```js
class Foo {
  #value = 1;
  #method() {}
}
```

## .at()

https://github.com/tc39/proposal-relative-indexing-method

インデックス指定で値を取り出す `Array.at` `String.at` をサポート。

```js
const array = [1, 2, 3]
array.at(0); // 1
array.at(1); // 2
array.at(2); // 3

const string = "123";
string.at(0); // "1"
```

## Accessible Object.prototype.hasOwnProperty

https://github.com/tc39/proposal-accessible-object-hasownproperty

`hasOwn` `hasOwnProperty` をサポート。

```js

const obj = { a: 1 };
obj.hasOwnProperty("a");
// true

Object.hasOwn(obj, "a")
// true
```

## Class Static Block

https://github.com/tc39/proposal-class-static-block

クラス構文の static ブロックをサポート。

```js
class Foo {
  static x;
  static y;
  static {
    this.x = this.y;
  }
}
```

## Error Cause

https://github.com/tc39/proposal-error-cause

Error オブジェクトが `cause` をサポート。

```js
try {
  throw new Error('Error!', { cause: "foo" });
} catch (e) {
  console.log(e.cause);
  // foo
}
```
