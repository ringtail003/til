# TypeScriptの流儀

https://speakerdeck.com/takefumiyoshii/typescript-falseliu-yi
このスライドがとても良かった。
何となく使っていた書き方の「なぜそうなのか」を知るって興味深くて納得感が得られる。

スライドを読むだけだと情報が右から左に流れてしまうので簡略化しながら写経。

## 型推論いろは

実装から型推論が得られる。

```typescript
const greet = () => 'hello';
const msg = greet(); // string
```

意図的なAssertion（宣言）がある場合は推論でなく宣言に従う。

```typescript
const greet = () => 'hello' as any;
const msg = greet(); // any
```

意図的なAssertionは実装を束縛する事ができる。

```typescript
const greet = (): void => 'hello'; // Error
```

const/letの型推論は同じ値であっても異なる。
constは再代入不可のためLiteral型と推論される。

```typescript
let msg = 'msg'; // string型
const msg2 = 'msg'; // msg型
```

TypeScriptではNullable型をUnion Typesで表現する。

```typescript
let user: string | null;
```

ガード節を通過したブロックでは型が絞り込まれる。
絞り込まれると、型を想定したアクセスが安全であると解釈される。

```typescript
function greet(name: string | null) {
  if (name === null) {
    return 'user';
  }
  return name.toUpperCase(); // string

  // 三項演算子でも有効
  return name === null ? 'user' : name.toUpperCase();
}
```

Liteal型で区別できるUnion TypeはDiscriminated Unions（タグ付き Union Types）と呼ぶ。

```typescript
type UserA = { gender: 'male'; name: string; };
type UserB = { gender: 'female'; age: number; };
type User = UserA | UserB;
```

タグ付きUnion Typesは分岐で型が絞り込まれる。
分岐した型へのアクセスは安全であると解釈される。

```typescript
function greet(user: User) {
  switch (user.gender) {
    case 'male':
      return user.name; // UserA.name -> string
    case 'female':
      return user.age; // UserB.age -> number;
    default:
      return user; // never
  }
}
```

## 攻防一体・型の策略

実装による型推論だけでは不十分。どのように利用されるのかプログラマしか知り得ない策略があるから。
型の付与はつまりコンパイラに策略を通達する事。

Annotation付与は「守りの策略」。
型を付与する事で要件を決める。

```typescript
const str1: string = []; // Error
const str2: 'str' = 'hoge'; // Error
```

オブジェクトプロパティを制約する型をインデックスシグネチャという。

```typescript
type Funcs = { [key: string]: Function };

const funcs: Funcs = {
  a: () => true,
  b: () => 'hoge', // Error
};
```

インデックスシグネチャは望まない推論結果になる事がある。

```typescript
const obj = {
  id: 0, // number
  items: [], // never（望まない推論結果）
};
```

そういうときはヒントを付与する。

```typescript
const obj = {
  id: 0, // number
  items: [] as string[], // string[]
};
```

互換性が成立する場合のヒントはアップキャスト・ダウンキャストに使う事ができる。

```typescript
const name = 'aaa';
const name1 = name as 'aaa'; // 許容する値が狭まる -> ダウンキャスト
const name2 = name as any; // 許容する値が広がる -> アップキャスト
```

互換性チェックは構造的部分型に基づくため、誤ったダウンキャストをしてもコンパイラに責任はない。

```typescript
const name = 'aaa';
const name1 = name as 'hoge'; // hoge型なのに値は'aaa'
```

アップキャスト > ダウンキャストするDouble Assertionという手法がある。
コンパイラよりプログラマのほうが利用方法の知識を持っている場合に使う苦肉の策。

```typescript
const a = new User() as any as UserA;
```