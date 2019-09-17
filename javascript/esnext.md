# proposal3に入ってるやつ

https://github.com/tc39/proposal-top-level-await

## top-level await

`await` は function の中でしか使えなかった。

```javascript
!async function () {
  await ...
}()
```

トップレベルで書けるようになった。

```javascript
await(async() => { ... });
```

Chrom 62 から対応しているらしい。

## Nullish Coalescing for JavaScript

https://github.com/tc39/proposal-nullish-coalescing

この構文が使えるようになる。
null/undefinedでなければ前者が採用される。

```javascript
null ?? 'default' > 'default'
undefined ?? 'default' > 'default'
0 ?? 'default' > 0
false ?? 'default' > false
```

`||` は false であれば次の式を評価する。
`??` は null, undefined であれば次の式を評価するため '!== null' `!== undefined` と等価。

```javascript
null ?? 'default' > 'default'
undefined ?? 'default' > 'default'
0 ?? 'default' > 'default'
false ?? 'default' > 'default'
```
