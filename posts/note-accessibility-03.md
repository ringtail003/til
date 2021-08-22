---
title: アクセシビリティについて調べた事まとめ(3)
description: 
tags: accessibility note
updatedAt: 2021-07-26
published: true
---

# 3. WAI-AREA の属性の書き方

この章では WAI-AREA を使い始めるための基本的な属性の書き方について紹介します。

## できるだけ HTML 標準のタグを使う

WAI-AREA のドキュメントでは [ARIA無しのほうが、悪いARIAよりも良い](https://waic.jp/docs/2019/NOTE-wai-aria-practices-1.1-20190207/#no_aria_better_bad_aria) とされています。

CSS で装飾された視覚的な手がかりと同じように、スクリーンリーダーの利用者は WAI-ARIA を手がかりにサイトのコンテンツを辿ります。WAI-ARIA の間違いによって、視覚的に表現しているものとは全く異なる意味合いを提供してしまう事に注意が必要です。

HTML 標準のタグを利用した場合、暗黙のセマンティクスにより視覚的な表現と WAI-ARIA は一致します。代替可能なものはできるだけ HTML 標準のタグを使いましょう。

```html
<!-- HTML 標準のタグで代替可能 -->
<div role="checkbox" aria-checked="true"></div>

<!-- 😊 Good -->
<input type="checkbox">
```

```html
<!-- 😩 Bad: 視覚的な表現と WAI-AREA の表現がずれてしまう -->
<div role="checkbox"
  aria-checked="false"
  class="checkbox-check-on"
></div>
```

## 必須のステート・プロパティを必ず記述する

下記の例では `heading` ロールを使用しています。[ドキュメント](https://momdo.github.io/wai-aria-1.2/#heading) の「必要とされるステートおよびプロパティ」は必ず記述するようにします。

```html
<!-- 😊 Good -->
<div role="heading" aria-level="2">
```

```html
<!-- 😩 Bad: 必須のプロパティ指定がない -->
<div role="heading">
```

```html
<!-- 😩 Bad: 必須のプロパティの値の指定がない -->
<div role="heading" aria-level>
```

## 禁止されたステート・プロパティを記述しない

下記の例では `code` ロールを使用しています。[ドキュメント](https://momdo.github.io/wai-aria-1.2/#code) の「禁止のステートおよびプロパティ」を記述するのは誤りです。

```html
<!-- 😊 Good -->
<div role="code">
  console.log('Hello world!');
</div>
```

```html
<!-- 😩 Bad: aria-label の記述はできない -->
<div role="code" aria-label="プログラミングコードの例">
  console.log('Hello world!');
</div>
```

## 所有の関係を守る

下記の例では `list` `listitem` ロールを使用しています。[ドキュメント](https://momdo.github.io/wai-aria-1.2/#list) の「必要とされる所有される要素」「必要とされるコンテキストロール」を必ず記述するようにします。

```html
<!-- 😊 Good -->
<div role="list">
  <div role="listitem"></div>
  <div role="listitem"></div>
</div>
```

```html
<!-- 😩 Bad: listitem を所有していない -->
<div role="list">
</div>
```

```html
<!-- 😩 Bad: listitem 単体では存在できない -->
<div role="listitem"></div>
```

## ロールを上書きしない

本来の役割と異なるロールで上書きする事は誤りです。

```html
<!-- 😩 Bad: テーブルタグであるという情報が失われる -->
<table role="log"></table>
```

## 標準の HTML と同じ挙動にする

ロールの宣言は、役割とともにその要素がどのように振る舞うのかをユーザーに示しています。そのため `button` ロールを宣言した要素は HTML の `<button>` タグと同じインタラクションを持つ必要があります。

```html
<!-- 😩 Bad: tabindex 指定がなくタブキー移動ができない -->
<div role="button">
```

```html
<!-- 😩 Bad: クリックに反応するがスペースやエンターキーが考慮されていない -->
<div role="button" onclick="...">
```

## サンプルコード

WAI-AREA のドキュメントでロールごとのサンプルコードが紹介されています。キーボード操作なども記載されているため、実装する時は参考にしてみましょう。

- [Design Patterns and Widgets \| WAI-AREA 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/#aria_ex)
  - ウィジェットごとのデザインパターンを見る事ができます。
- [デザイン・パターンとウィジェット \| WAI-AREA 1.1](https://waic.jp/docs/2019/NOTE-wai-aria-practices-1.1-20190207/#aria_ex)
  - ひとつ前の仕様ですが日本語で記述されているため見やすいかもしれません。
