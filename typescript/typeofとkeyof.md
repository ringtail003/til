# typeof

JavaScript の typeof とは別物。
宣言済み変数の型をキャプチャできる。

```typesctipt
let a: { a: string };
let a2: typeof a;

a2.a = 'string';
a2.b = 'string'; // エラー
```

# keyof

オブジェクトのプロパティ名称を String Literal Types で得る。

```typescript
type A = {
  a: string;
  b: number;
};

type Key = keyof A;
// 'a' | 'b'
```
