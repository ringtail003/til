---
layout: post
title: "zone.js"
---

# 資料

https://angular.jp/guide/zone

# zone.js の有効化

デフォルトで zone.js が有効化されている。
無効にする方法は下記の通り。

```typescript
// polyfills.ts
// zone をコメントアウト

// import 'zone.js/dist/zone';
```

```typescript
// main.ts
// noop zone を使用してブートストラップ

platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' })
  .catch(err => console.error(err));
```

# 手動の detectChaneges() が必要ない場所

zone.js が変更検知をカバーする場所では detectChanges() は不要。
https://github.com/angular/angular/blob/master/packages/zone.js/MODULE.md

- EventeTarget
- timer
- Promise
- XHR

# 手動の detectChanges() が必要な場所

サードパーティライブラリを使用した時に zone.js の変更検知が動かない時がある。
https://qiita.com/maechabin/items/a10811bbb470bc490b80

```typescript
foo.addListener('click', () => {
  this.ngZone.run(() => {
    bar.next();
  });
});
```
