---
title: アクセシビリティについて調べた事まとめ(4)
description: 
tags: accessibility note
updatedAt: 2021-07-26
published: true
---

# おわりに

この記事では、アクセシビリティ配慮の入り口に立つための基本的な情報や、個人的な考察について紹介させていただきました。最後に私が「アクセシビリティ配慮されている！」と特に感じたサイトを紹介して終わりにしたいと思います。

# 参考サイト

## [Google Web Fundamental](https://developers.google.com/web/fundamentals/accessibility/)

キーボード操作によるフォーカス設定が視覚的にも配慮されていてきれいです。

## [accessibe](https://accessibe.com/)

何らかの障害を持つ人向けのとてもリッチなアクセシビリティ配慮がなされています。ページ右下にあるアクセシビリティアイコンのボタンをクリックすると、目的に合わせてコンテンツ表示を切り替えできます。`Seizure Safe Profile` をオンにするとてんかん発作のある人に配慮した色合いに変わり、`ADHD Friendly Profile` をオンにすると一部だけにスポットライトを当てたような表示に切り替わります。

## [ics.media](https://ics.media/)

macOS の設定の「視覚効果を減らす」に応じてヘッダ画像やボタンのフォーカスのモーションが変わります。タブキー移動のサクサク動く感じがとても気持ち良いです。

## [GitHub](https://github.com/)

ボタンやテキストエリアなどインタラクティブな要素が多いため、やや複雑なWeb アプリを実装する際の一番身近なお手本となるのではないでしょうか。WAI-AREA が細かに設定されています。

## Chrome エクステンション

上記のようなサイトは Chrome エクステンションなどを使って、どのようなアクセシビリティ配慮をしているのか探ってみるとなかなか興味深いです。

- [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh/related?hl=ja)
  - アクセシビリティに関するレポートをビジュアライズ表示します。
- [Visual ARIA](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=ja)
  - WAI-AREA が使われている箇所をビジュアライズ表示します。
- [Landmarks](http://matatk.agrip.org.uk/landmarks/)
  - WAI-AREA のランドマークロールをビジュアライズ表示します。
