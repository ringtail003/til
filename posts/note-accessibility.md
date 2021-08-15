---
title: アクセシビリティについて調べた事まとめ
description: 
tags: accessibility note
updatedAt: 2021-07-26
published: true
---

アクセシビリティについて知らない人が Web サービスをどうやってアクセシブルなものにするか考えたまとめ。
MDN のドキュメントをベースに、自分なりの理解やサンプルを探してまとめたもの。

# 参考資料

- [アクセシビリティ \| MDN](https://developer.mozilla.org/ja/docs/Web/Accessibility)
- [Accessibility Developer Guide](https://www.accessibility-developer-guide.com/)
- [WAI\-ARIA 再入門。](https://qiita.com/boseki/items/dd952e7dc1d7a8340898)

# アクセシビリティとは

誰でもがサイトのコンテンツをストレスなく閲覧・利用できるようにする事。

Web サイトはさまざまな人が訪れる。中には色弱やてんかんなど視覚的効果に敏感なユーザーがいるかもしれない。ぐわんぐわんするアニメーションや過度にソフトな色合いが彼らにストレスを与えていないだろうか？骨折など一時的にマウスを使えないユーザーはキーボード操作でいつもと同じようにサイトを利用する事ができるだろうか？

アクセシビリティは障害者への配慮のように取られがちだが、ストレスのないサイトを提供する事はパワーユーザーや開発者にもメリットをもたらす。

キーボード操作の網羅性は、操作に長けたパワーユーザーやスクリーンリーダーの利用者にとって便利なものになる。正しい HTML 構造とラベル付けはセマンティクスなコーディングの意識付けとなる。

2021年8月現在、W3C によるガイドラインは Ver2.1 が策定されている。
[Web Content Accessibility Guidelines (WCAG) 2.1](https://waic.jp/docs/WCAG21/)

# 参考になりそうな企業サイト

- apple https://www.apple.com/jp/
- キューピー https://www.kewpie.co.jp/
- 味の素 https://www.ajinomoto.co.jp/
- 日本ガイシ https://www.ngk.co.jp/
- パナソニック補聴器 https://panasonic.jp/hochouki/
- Stripe https://stripe.com/jp

# Chromeエクステンション

- [HTML Visual Validation](https://chrome.google.com/webstore/detail/html-visual-validation/hicjdabjhdmaaabgackleegipabmeack/related)
  - コンテンツ区分を可視化する
- [Landmark Navigation via Keyboard or Pop-up](https://chrome.google.com/webstore/detail/landmark-navigation-via-k/ddpokpbjopmeeiiolheejjpkonlkklgp/related?hl=ja)
  - ランドマークエリアを可視化する

# ルール

## ページのアウトラインをコンテンツ区分要素で構成する

`<header>` `<main>` `<nav>` といったコンテンツ区分要素を使ってページの大まかなアウトラインを作る。

区分要素 | 説明
--- | ---
`<header>` | 導入部やナビゲーション等のグループ
`<nav>` | ナビゲーション要素のグループ
`<main>` | 主要な内容
`<footer>` | コンテンツのフッタ情報を示すグループ
`<h1>〜<h5>` | 見出し
`<aside>` | サイトの本筋と分離しても問題のない要素
`<article>` | サイトの中で自己完結し配信や再利用を行う
`<section>` | 自立した一般のセクション

[コンテンツ区分 \| MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element#content_sectioning)

### header

ページのヘッダーとして使われる他、セクションや記事のヘッダーとして存在させる事もできる。 `<header>` は通常 `<h1>〜<h6>` の見出しを含む。

- 👍 ページのヘッダー
- 👍 セクションヘッダー

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | ○ | HTML5は不可<br>HTML5.1では区分要素で階層化されている場合に可能
ページ内の複数回の出現 | ○ | 

### nav

ナビゲーションリンクを含む区間を定義する。 サイトのナビゲーションメニューにのみ使用する。`<nav>` は入れ子にしてはいけない。

- 👍 サイトマップ
- 😩 SNS のプロフィール

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | × | 
ページ内の複数回の出現 | ○ | 

### main

`<body>` の主要な内容。文章の中心的な主題やアプリケーションの中心的な機能や直接関連するものなど。

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | × | 
ページ内の複数回の出現 | × | 

### footer

要素のフッターを表す。そのセクションの著作者・関連情報・著作権など。

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | × | 
ページ内の複数回の出現 | ○ | 

### aside

aside とは余談、雑談の意味。本筋に属さない区間を定義する。サイドバー・関連記事・広告・コラムなどに適用できる。

- 👍 サイドバー
- 👍 関連記事
- 👍 広告

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | × | 
ページ内の複数回の出現 | ○ | 

### article

自己完結するコンテンツを定義する。`<article>` 要素を除く他のすべての HTML を削除しても、そのコンテンツが読者にとって意味を持つもの。`<article>` の中に `<header>` や `<aside>` `<footer>` を持つことができる。

### section

意味の関連するグループ化を示すために、本筋である文章や構造のセクションを定義する。`<section>` と `<article>` は相互に自身の中に互いを含む事ができる。`<section>` は見出しを含める。

```html
<section>
  <h1></h1>
  <article>
    <header></header>
    <section></section>
    <footer></footer>
  </article>
<section>
```

- 👍 ページ内コンテンツの見出し

## WAI-AREA

リッチな Web ページが増えるにあたり、複雑な UI コントロールが開発者によって作られるようになった。これらは `<div>` のような構造上の意味をなさない HTML の要素によって構成される事が多い。 WAI-AREA はブラウザや支援技術が認識できる意味論を追加し、ユーザーを手助けする。

WAI-AREA には主にロール、プロパティ、ステートの 3 つの機能がある。

[WAI-AREA って何？ \| MDN](https://developer.mozilla.org/ja/docs/Learn/Accessibility/WAI-ARIA_basics)

### １）ロール

ウェブページの構成と構造を定義するもの。例えばセマンティクスを持たない `<div>` にロールを付与する事で、目印となる領域を示す。

```html
<div role="dialog" aria-label="...">
  <h2></h2>
  <button></button>
</div>
```

本来の HTML の意味論を上書きするロールの付与は避ける事。

```html
<!-- 😩 Bad -->
<details>
  <summary role="button"></summary>
</details>
```

また HTML の要素が持つ意味論と重複するロールの付与は避ける事。

```html
<!-- 😩 Bad -->
<button role="button"></button>
```

ロールは 6 つに分類される。

グループ | 役割
--- | ---
ウィジェットロール | UI の部品
複合ロール | 複数の部品が組み合わさった UI の部品
文章構造ロール | 記事や画像などの文章構造
ランドマークロール | 検索やフォームなどコンテンツをナビゲートする主要なグループ
ライブリージョンロール | コンテンツの動的な変化
ウインドウロール | ページ内でウインドウとして機能する部品

### ２）プロパティ

要素の性質を定義するもの。例えば `aria-required="true"` は値の入力をしなければいけない事を示す。

```html
<!-- HTML5 をサポートしていないブラウザでは aria-required がを役立てる事ができる -->
<input 
  type="text"
  aria-required="true"
/>
```

### ３）ステート

要素の状態を示すもの。プロパティはアプリのライフサイクルを通して変化しないのに対し、ステートは変化を伴う。

```html
<div role="toolbar">
  <button type="button" aria-pressed="true">Asc</button>
  <button type="button" aria-pressed="false">Desc</button>
</div>
```

### 参考ドキュメント

- [ARIA を使用する: ロール、ステート、プロパティ \| MDN](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/ARIA_Techniques)
  - ロール・ステート・プロパティの一覧。（一部リンク切れ）
- [Accessible Rich Internet Applications (WAI-ARIA) 1.1 - 5-4 \| W3C](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)
  - ロールの説明が網羅されている。
- [Accessible Rich Internet Applications (WAI-ARIA) 1.1 - 3 \| W3C](https://www.w3.org/TR/html-aria/#docconformance)
  - W3C のドキュメント。HTML 要素と暗黙裡に宣言されるロールの一覧。
- [WAI-ARIA Authoring Practices 1.1 \| W3C](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/)
  - ロール・プロパティ・ステートのサンプルコード。
- [DiGITAL A11Y](https://www.digitala11y.com/)
  - 検索ボックスにロールやプロパティ名を入力する事でロール・プロパティ・ステートのサンプルコードを探す事ができる。

## 操作可能


## WIP 

2021-07-25 MDNを読んでまとめた事
2021-01-01-5 Accessibility Developer Guideを読んで書いたメモ
tips-accessibility サンプルコード集
