---
title: アクセシビリティについて調べた事まとめ
description: 
tags: html tips
updatedAt: 2021-07-26
published: true
---

アクセシビリティについて知らない人が Web サービスをどうやってアクセシブルなものにするか考えたまとめ。
MDN のドキュメントをベースに、自分なりの理解やサンプルを探してまとめたもの。

# 参考資料

- [アクセシビリティ \| MDN](https://developer.mozilla.org/ja/docs/Web/Accessibility)
- [Accessibility Developer Guide](https://www.accessibility-developer-guide.com/)

# アクセシビリティとは

誰でもがサイトのコンテンツをストレスなく閲覧・利用できるようにする事。

Web サイトはさまざまな人が訪れる。中には色弱やてんかんなど視覚的効果に敏感なユーザーがいるかもしれない。ぐわんぐわんするアニメーションや過度にソフトな色合いが彼らにストレスを与えていないだろうか？骨折など一時的にマウスを使えないユーザーはキーボード操作でいつもと同じようにサイトを利用する事ができるだろうか？

アクセシビリティは障害者への配慮のように取られがちだが、ストレスのないサイトを提供する事はパワーユーザーや開発者にもメリットをもたらす。

キーボード操作の網羅性は、操作に長けたパワーユーザーやスクリーンリーダーの利用者にとって便利なものになる。正しい HTML 構造とラベル付けはセマンティクスなコーディングの意識付けとなる。

2021年8月現在、W3C によるガイドラインは Ver2.1 が策定されている。
[Web Content Accessibility Guidelines (WCAG) 2.1](https://waic.jp/docs/WCAG21/)

# ルール

## ページのアウトラインをコンテンツ区分要素で構成する

`<header>` `<main>` `<nav>` といったコンテンツ区分要素を使ってページの大まかなアウトラインを作る。

[コンテンツ区分 \| MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element#content_sectioning)

## 操作可能


## WIP 

2021-07-25 MDNを読んでまとめた事
2021-01-01-5 Accessibility Developer Guideを読んで書いたメモ
tips-accessibility サンプルコード集
