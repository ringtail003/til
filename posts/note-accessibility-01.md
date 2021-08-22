---
title: アクセシビリティについて調べた事まとめ(1)
description: 
tags: accessibility note
updatedAt: 2021-07-26
published: true
---

# 1. 基本的な実践方法

この章では、日常的に開発に取り入れる事ができるいくつかの簡易な実践方法を紹介します。

## 文章構造のメタデータを設定する

HTML の `head` は文章構造のメタデータの集まりです。表立って見えないものが多いですが、サイトをマシンリーダブルなものにするために重要な要素と言えます。簡単なサンプルコードで例を見てみましょう。

```html
<!-- 😩 Bad -->
<html>
  <head>
  </head>
</html>
```

- 何も設定されていない。

```html
<!-- 😩 Bad -->
<html>
  <head>
    <title>お得な＼(^o^)／通販サイト★彡</title>
  </head>
</html>
```

- 顔文字など視覚的効果に依存した記号が使われている。

```html
<!-- 😩 Bad -->
<html>
  <head>
    <title>株式会社ほげ</title>
  </head>
</html>
```

- サイトの利用用途が不明。

```html
<!-- 😊 Good -->
<html lang="ja">
  <head>
    <title>エンジニア採用情報 | 株式会社ほげ</title>
  </head>
</html>
```

- `lang` がサイト内の言語を示している。
- `title` がサイトの利用用途を示している。

`lang` 属性はサイトの言語を明示的にする事でスクリーンリーダーの発音に影響します。`title` はサイトのページの目的をユーザーに伝える他、ブックマークのタイトル設定にも使われます。

- [H25: title 要素を用いて、ページタイトルを提供する](https://waic.jp/docs/WCAG-TECHS/H25.html)
- [H57: html 要素の言語属性を使用する](https://waic.jp/docs/WCAG-TECHS/H57.html)
- [H58: 自然言語の変更を指定するために、言語属性を使用する](https://waic.jp/docs/WCAG-TECHS/H58.html)
- [G88: ウェブページに説明的なタイトルを提供する](https://waic.jp/docs/WCAG-TECHS/G88.html)

また、アクセシビリティのガイドラインには登場しませんが Google 検索などの結果表示に使われる `description` もサイトの目的を伝えるマシンリーダブルな情報であると言えます。このようにメタデータを正しく設定する事はサイトを訪れるユーザーに有益なものとなります。

```html
<html>
  <head>
    <title>カメラ屋トップページ</title>
    <meta name="description" content="写真のデジタルデータを販売するショップです。">
  </head>
</html>
```

## 基準となるフォントサイズを決める

`rem` は html タグのフォントサイズを基準とした相対指定です。html タグにフォントサイズの指定がなければブラウザで設定されたフォントサイズが適用されます。

Chrome の設定ではデフォルトで「フォントサイズ（中）」となっており、この設定では 16px が適用されます。`font-size: 2rem` は 32px、`font-size: 0.5rem` は 8px となります。

```html
<h1>ページ見出し</h1>
<p>テキスト</p>
<button>ボタン</button>

<style>
  /* フォントサイズ中の場合 16px が適用される */
  html { }

  /* 基準の 2 倍 ===> 32px */
  h1 { font-size: 2rem; }

  /* 基準と同じ ===> 16px */
  p { }

  /* 基準の半分 ===> 8px */
  button { font-size: 0.5rem; }
</style>
```

基準となるフォントサイズを変更するには html タグにフォントサイズを指定します。

```css
/* 基準を 20px に設定 */
html { font-size: 20px; }
  
/* 基準の 2 倍 ===> 40px */
h1 { font-size: 2rem; }

/* 基準と同じ ===> 20px */
p { }

/* 基準の半分 ===> 10px */
button { font-size: 0.5rem; }
```

デバイスにより基準となるフォントサイズを変更したい場合はメディアクエリを使います。

```css
/* タブレット */
@media (min-width: 768px) {
  html { font-size: 16px; }
  h1 { font-size: 2rem; } /* 32px */
}

/* PC */
@media (min-width: 1280px) {
  html { font-size: 18px; }
  h1 { font-size: 2rem; } /* 36px */
}
```

親要素のフォントサイズを起点とする場合は `em` や `%` を使用します。

```html
<div>
  <p>テキスト</p>
  <span>テキスト</span>
</div>

<style>
  div { font-size: 30px; }
  div > p { font-size: 50%; } /* 15px */
  div > span { font-size: 0.5em; } /* 15px */
</style>
```

`rem` `em` `%` の相対指定によるメリットは、ユーザーが任意に設定したフォントサイズに応じて変化する事です。絶対指定の `px` `pt` はブラウザの設定に関わらず全てのユーザーに対して同じフォントサイズが適用されます。

```css
/* ブラウザの設定によりフォントサイズが決まる */
html { }

/* 【相対指定】 ブラウザの設定に応じて変化する */
div { font-size: 1rem; }

/* 【絶対指定】 ブラウザの設定に関わらず 10px が適用される */
p { font-size: 10px; }
```

相対指定のデメリットは、思わぬレイアウト崩れを引き落こす可能性がある事です。フォントサイズの拡大縮小によりレイアウトが著しく崩れる場合は `...` を使った省略表記や、文字数に影響しないグリッドレイアウト、絶対指定のフォントサイズを検討したほうが良いかもしれません。

```css
/* フォントサイズによりレイアウトが変わってしまう */
.sidebar { width: 10rem; }

/* 親要素が固定幅の場合、フォントサイズが大きすぎると見切れてしまう */
.icon { font-size: 0.5rem; }
```

[MDN](https://developer.mozilla.org/ja/docs/Web/CSS/font-size) を始めガイドライン準拠を促す解説としては相対指定を推奨するほうが多いように思います。ただ、ガイドラインに準拠したルールの徹底よりも見やすいサイトやサービスを提供する事のほうがユーザーにとって有益であり「よりストレスが少ない」という視点で基準となるフォントを決定する事が重要だと考察します。

- [C12: フォントサイズにパーセントを使用する](https://waic.jp/docs/WCAG-TECHS/C12.html)
- [C14: フォントサイズに em 単位を使用する](https://waic.jp/docs/WCAG-TECHS/C14.html)
- [C24: コンテナのサイズに CSS のパーセント値を使用する](https://waic.jp/docs/WCAG-TECHS/C24.html)
- [G204: 閲覧画面の幅を狭めたときに、ユーザエージェントによるテキストのリフローを妨げない](https://waic.jp/docs/WCAG-TECHS/G204.html)

## 背景色と比較してはっきり見える文字色を使う

ソフトな印象を与えるために同系色でまとめた色合いは、色の識別が困難なユーザーにストレスを与える事があります。

```html
<!-- 😩 Bad -->
<div style="background: white;">
  <p style="color: lightgray;">...</p>
</div>
```

- コントラストが低く文字が背景色に埋もれて見える。
- アクセシビリティのガイドラインでは `4.5:1` 以上のコントラストが必要とされる。

```html
<!-- 😊 Good -->
<div style="background: white;">
  <p style="color: black;">...</p>
</div>
```

- コントラストが上がり文字がはっきり見える。
- 色を識別できないユーザーに情報が伝わる。

また、背景と比較してはっきり見える色を使っていても色の識別が困難な場合もあります。例えば、下記の緑・青・赤はグレースケールにおいて同じような色合いに見えてしまいます。

```html
<p style="background:#1ea6a1;">green</p>
<p style="background:#4287f5;">blue</p>
<p style="background:#eb684b;">red</p>
```

色だけに頼った表現は一部のユーザーには伝わりません。

```html
<p style="background:#1ea6a1;">商品 A</p>
<p style="background:#4287f5;">商品 B</p>
<p style="background:#eb684b;">商品 C</p>
```

このような場合は色に加えて視覚的な手がかりを提供します。

```html
<ul>
  <li><p style="background:#1ea6a1;">在庫多数</p>商品 A</li>
  <li><p style="background:#4287f5;">在庫あり</p>商品 B</li>
  <li><p style="background:#eb684b;">在庫切れ</p>商品 C</li>
</ul>
```

コントラストの基準は、標準より大きいフォントサイズを使用した場合は `4.5:1` よりも緩和されます。人間がルールを覚えているのは大変なので Chrome エクステンションの [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ja) などを利用してガイドライン準拠をチェックすると便利です。また Chrome エクステンションの [Grayscale Tool](https://chrome.google.com/webstore/detail/grayscale-tool/odolflphhameojgliipcnahnipmogigo) などが利用してグレースケールでどのように見えるのかをチェックするのも良いでしょう。

- [G18: テキスト \(及び文字画像\) とその背景の間に、少なくとも 4\.5:1 のコントラスト比を確保する](https://waic.jp/docs/WCAG-TECHS/G18.html)
- [G14: 色の違いで伝えている情報をテキストでも入手可能にする](https://waic.jp/docs/WCAG-TECHS/G14.html)
- [G111: 色とパターンを併用する](https://waic.jp/docs/WCAG-TECHS/G111.html)
- [G138: 色の手がかりを用いるときは必ず、セマンティックなマークアップを使用する](https://waic.jp/docs/WCAG-TECHS/G138.html)
- [G145: テキスト \(及び文字画像\) とその背景の間に、少なくとも 3:1 のコントラスト比を確保する](https://waic.jp/docs/WCAG-TECHS/G145.html)
- [G148: 背景色及び文字色を指定せず、その初期設定を変更するウェブコンテンツ技術の機能を使用しない](https://waic.jp/docs/WCAG-TECHS/G148.html)
- [G156: テキストのブロックの前景及び背景を変更できる、一般に入手可能なユーザエージェントが備えるウェブコンテンツ技術を使用する](https://waic.jp/docs/WCAG-TECHS/G156.html)
- [G174: 利用者が十分なコントラストのある提示に切り替えられるように、十分なコントラスト比のあるコントロールを提供する](https://waic.jp/docs/WCAG-TECHS/G174.html)
- [G175: 背景色及び前景色のための複数色選択ツールをページ上で提供する](https://waic.jp/docs/WCAG-TECHS/G175.html)
- [G182: 文字色の違いが情報を伝えるために使用される場合に、利用可能な追加の視覚的な手がかりを確保する](https://waic.jp/docs/WCAG-TECHS/G182.html)
- [G183: 色が単独でリンク又はコントロールを特定する場所で、周囲のテキストと一緒に 3:1 のコントラスト比を使用し、そのリンク又はコントロールのフォーカスに追加の視覚的な手がかりを提供する](https://waic.jp/docs/WCAG-TECHS/G183.html)
- [G205: 色のついたフォームコントロールのラベルに対して、テキストによる手がかりを含める](https://waic.jp/docs/WCAG-TECHS/G205.html)

## 要素にフォーカスしている事が分かるようにする

`input` `textarea` などの HTML の要素はクリックやタブキー移動でフォーカスを持つ事ができます。フォーカスを持った状態ではブラウザ標準のフォーカスリングが表示されますが、見栄えを悪くするという理由で開発者が意図的にフォーカスリングを見えなくしてしまう事があります。

```html
<!-- 😩 Bad -->
<button style="outline:none">...</button>
```

- キーボード操作でボタンにフォーカスした時、状態が視覚的に伝わらない。
- マウスなどポインティングデバイスを利用できないユーザーが現在位置を見失ってしまう。

キーボード操作のみでブラウザと対話するユーザーは現在位置を知るためにフォーカスリングが重要な手がかりとなります。体裁を保つには CSS でフォーカスリングの外観を整えるほうが得策です。

```html
<!-- 😊 Good -->
<button>...</button>

<style>
button:focus {
  box-shadow: 0 0 2px 1px green;
}
</style>
```

また複雑な UI や装飾のために `<div>` を使うようなケースでは、タブキーによる移動ができません。インタラクティブな要素であればタブキー移動を考慮し `tabindex` を 0 以上の値に設定します。

```html
<!-- 😩 Bad -->
<div class="menu-item">...</div>
```

- 装飾のために `<div>` タグを使うような例。
- キーボード操作でクリックする事ができない。

```html
<!-- 😊 Good -->
<div class="menu-item" tabindex="0">...</div>
```

- キーボード操作で `<div>` にフォーカスできるようになる。

参考サイトとして [Focusable Elements](https://allyjs.io/data-tables/focusable.html) にデバイスと HTML 要素のフォーカスの関連がまとめられています。いろいろなデバイスでどのようにフォーカスを受け付けるのか参考にしてみても良いかもしれません。

- [G149: フォーカスを受け取るときに、ユーザエージェントによって強調されるユーザインタフェース コンポーネントを使用する](https://waic.jp/docs/WCAG-TECHS/G149.html)
- [G165: 視認性の高いデフォルトのフォーカスインジケータが引き継がれるように、プラットフォームデフォルトのフォーカスインジケータを使用する](https://waic.jp/docs/WCAG-TECHS/G165.html)
- [G195: コンテンツ制作者が提供する視認性に優れたフォーカスインジケータを使用する](https://waic.jp/docs/WCAG-TECHS/G195.html)
- [G202: すべての機能に対してキーボード制御を確保する](https://waic.jp/docs/WCAG-TECHS/G202.html)

## HTML 標準のタグを使用する

複雑な UI パーツの実現のために HTML 標準のタグを使わず `<div>` や `<span>` を使って装飾を施すようなケースがあります。このような場合、本来使うべきタグの排除によってその意味合いまで失う事に注意が必要です。

```html
<!-- 😩 Bad -->
<div class="entry-form">
  <div class="form-group">
    <span>メール</span>
    <input class="email-address">
  </div>
  <div class="submit-button">登録</div>
</div>
```

- 視覚効果のみに依存しておりマシンリーダブルでない。
- スクリーンリーダーの利用ユーザーが全く操作できない。

```html
<!-- 😊 Good -->
<form method="POST" action="...">
  <fieldset>
    <legend>メール</legend>
    <input type="email">
  </fieldset>
  <button type="submit">登録</button>
</form>

<style>
  legend { color: blue; }
  form button { padding: 5px; }
</style>
```

- HTML の要素の役割が明確でマシンリーダブルになる。
- Enter キーによる submit などキーボードで操作可能になる。
- Enter キーと submit はフォームに共通した挙動でユーザーが操作を推測しやすい。

HTML 標準のタグを使用する事により、そのタグの意味合いとキーボード操作が暗黙的に付随するメリットがあります。この事により要素にフォーカスした時、それがどのような目的を持ちどのような操作ができるのかをスクリーンリーダーの利用ユーザーに伝える事ができるようになります。

- [H88: 仕様に準じて HTML を使用する](https://waic.jp/docs/WCAG-TECHS/H88.html)
- [G108: 名前 \(name\) 及び役割 \(role\) を公開し、利用者が設定可能なプロパティを直接設定可能にして、変化の通知を提供するために、マークアップを用いる](https://waic.jp/docs/WCAG-TECHS/G108.html)
- [G115: 構造をマークアップするために、セマンティックな要素を使用する](https://waic.jp/docs/WCAG-TECHS/G115.html)

## ページの構造をアウトライン化する

HTML 標準のタグは入力コントロールだけでなく、ページの構造に関するものも存在します。これらは `input` や `button` など入力コントロールと同様に、タグそのものに意味合いを持ちます。

```html
<!-- 😩 Bad -->
<div class="page-title">エンジニアブログ</div>
<div class="page-navigation">
  <a>サイトトップ</a>
  <a>採用サイト</a>
</div>
<div class="main-contents">
  <div>2021/01/01<br>...</div>
  <div>2021/01/02<br>...</div>
</div>
```

- 視覚効果のみに依存しておりマシンリーダブルでない。

```html
<!-- 😊 Good -->
<h1>エンジニアブログ</h1>
<header>
  <nav>
    <a>サイトトップ</a>
    <a>採用サイト</a>
  </nav>
</header>
<main>
  <article><h2>2021/01/01</h2>...</article>
  <article><h2>2021/01/02</h2>...</article>
</main>
```

- DOM の要素の役割が明確でマシンリーダブルになる。

表立って見えないものでも HTML 標準のタグは積極的に取り入れていきましょう。ページ構造に関するタグは MDN で [コンテンツ区分](https://developer.mozilla.org/ja/docs/Web/HTML/Element#content_sectioning) として紹介されています。また `<h1>` 〜 `<h6>` の [見出し要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/Heading_Elements) も次の見出しが現れるまでの範囲において暗黙的にアウトラインを生成するため、ページ構造において重要な役割を果たします。

参考として、Chrome エクステンションの [HTML Visual Validation](https://chrome.google.com/webstore/detail/html-visual-validation/hicjdabjhdmaaabgackleegipabmeack/related) を利用するとアウトラインを形成する主要なタグを可視化する事ができます。

- [H42: 見出しを特定するために、h1 要素～ h6 要素を使用する](https://waic.jp/docs/WCAG-TECHS/H42.html)
- [H69: コンテンツの各セクションの開始位置に見出し要素を提供する](https://waic.jp/docs/WCAG-TECHS/H69.html)
- [G140: 異なる提示を可能にするために、情報と構造を表現から分離する](https://waic.jp/docs/WCAG-TECHS/G140.html)
- [G141: 見出しを用いてウェブページを構造化する](https://waic.jp/docs/WCAG-TECHS/G141.html)

## 入力項目をラベル付けする

`input` など HTML 標準のタグを使った場合、それがテキスト入力を受け付ける入力コントロールである事はユーザーに伝わります。ただし「何のための入力であるか」は伝わらないため、ラベルを使って補足します。

```html
<!-- 😩 Bad -->
<span>ユーザー名</span>
<input type="text">
```

- 何のための入力要素なのか、スクリーンリーダーの利用ユーザーに伝わらない。

```html
<!-- 😊 Good -->
<label for="username">ユーザー名</label>
<input type="text" id="username">
```

- `<input>` にフォーカスした時スクリーンリーダーがラベルを読み上げる。

`<label>` を使った場合、ラベルのクリックによって `<input>` がアクティブになります。ヒット領域領域を拡大する事で小さなデバイスでも操作しやすくなり、操作性も向上します。

- [H44: テキストラベルとフォームコントロールを関連付けるために、label 要素を使用する](https://waic.jp/docs/WCAG-TECHS/H44.html)
- [G131: 説明的なラベルを提供する](https://waic.jp/docs/WCAG-TECHS/G131.html)
- [G162: 関係性を最大限に予測できるようにするためにラベルを配置する](https://waic.jp/docs/WCAG-TECHS/G162.html)
- [G167: テキストフィールドの目的をラベル付けするために隣接するボタンを用いる](https://waic.jp/docs/WCAG-TECHS/G167.html)

## 意味の通るテキストラベルを用いる

`<a>` はその要素のテキストがラベルの役割を果たす特性を持っていますが、テキストだけでは説明が不十分な場合があります。

```html
<!-- 😩 Bad -->
このサイトについては <a href="...">ここをクリック</a> してください。
もっと詳しく知りたい方は <a href="...">こちら</a>
```

- リンクテキストが前後の文脈に依存している。
- リンクテキストをスクリーンリーダーが単独で読み上げた時、ユーザーに意図が伝わらない。

```html
<!-- 😊 Good -->
<a href="...">このサイトについての情報</a>
<a href="...">関連情報</a>
```

- リンクテキスト単独で意図が伝わるものになる。

ガイドラインでは、リストや見出しが `<a>` を内包する事で短いリンクテキストでも目的が特定できるテクニックが紹介されています。テキストが長くなる事を避けたい場合はこのような方法も検討できます。

- [G13: コンテキストの変化を引き起こすフォームコントロールへの変更が行われる前に、何が起こるのかを説明する](https://waic.jp/docs/WCAG-TECHS/G13.html)
- [H77: リンクテキストとそれが含まれているリスト項目とを組み合わせて、リンクの目的を特定する](https://waic.jp/docs/WCAG-TECHS/H77.html)
- [H80: リンクテキストと先行する見出し要素とを組み合わせて、リンクの目的を特定する](https://waic.jp/docs/WCAG-TECHS/H80.html)
- [G91: リンクの目的を説明したリンクテキストを提供する](https://waic.jp/docs/WCAG-TECHS/G91.html)

## 画像の意味を補足する

画像は用途をイメージしやすくするための補足表現として使われる他に、主目的を説明するための表現としても使われます。画像を使う場合は `alt` 属性でその意味を補足します。

```html
<!-- 😩 Bad: 画像で大きさの比較を提示するような例 -->
<img src="ボルボックス.png">
<img src="ナベカムリ.png">
<img src="ツリガネムシ.png">
```

- スクリーンリーダーの利用ユーザーに伝わらない。

```html
<!-- 😊 Good -->
<img src="ボルボックス.png" alt="0.4から0.9ミリ程度の大きさ">
<img src="ナベカムリ.png" alt="0.07から0.1ミリ程度の大きさ">
<img src="ツリガネムシ.png" alt="0.025から0.05ミリ程度の大きさ">
```

ガイドラインでは本文が画像の意図や説明を兼ねている場合は `alt` 属性を空として良いとされています。

```html
<section>
  <h2>ボルボックス</h2>
  <img src="ボルボックス.png" alt="">
  <p>0.4から0.9ミリ程度の大きさ</p>
</section>

<section>
  <h2>ナベカムリ</h2>
  <img src="ナベカムリ.png" alt="">
  <p>0.07から0.1ミリ程度の大きさ</p>
</section>

<section>
  <h2>ツリガネムシ</h2>
  <img src="ツリガネムシ.png" alt="">
  <p>0.025から0.05ミリ程度の大きさ</p>
</section>
```

- [H67: 支援技術が無視すべき画像に対して、img 要素の alt テキストを空にして、title 属性を付与しない](https://waic.jp/docs/WCAG-TECHS/H67.html)
- [G100: 非テキストコンテンツの一般に認められた名前 \(name\) 又は説明的な名前となる簡潔なテキストによる代替を提供する](https://waic.jp/docs/WCAG-TECHS/G100.html)
- [G143: CAPTCHA の目的を説明するために、テキストによる代替を提供する](https://waic.jp/docs/WCAG-TECHS/G143.html)
- [G144: 異なるモダリティを用いて同じ目的を果たす、もう一つの CAPTCHA がウェブページに含まれていることを確認する](https://waic.jp/docs/WCAG-TECHS/G144.html)
- [G196: 画像のグループにある一つの画像に、そのグループのすべての画像を説明するテキストによる代替を提供する](https://waic.jp/docs/WCAG-TECHS/G196.html)

## 視覚的な意味のみを持つテキストを避ける

例えばアルファベットの `X` というテキストをダイアログの閉じるボタンに適用した場合、バツ印を連想させるため視覚的な意味を持つといえます。ところがスクリーンリーダーの利用ユーザーには意味不明なアルファベットが読み上げられてしまいボタンの用途を伝える事ができなくなります。

```html
<!-- 😩 Bad -->
<dialog>
  <button>X</button>
</dialog>
```

このようなケースでは「閉じる」「戻る」「キャンセル」などのテキストのほうが適していると言えるでしょう。

```html
<!-- 😊 Good -->
<dialog>
  <button>閉じる</button>
</dialog>
```

- [G91: リンクの目的を説明したリンクテキストを提供する](https://waic.jp/docs/WCAG-TECHS/G91.html)

## OS の設定に応じてアニメーションを減らす

しばしば、ロゴ・写真・図形などに動きを加えたモーショングラフィックスや、写真のカルーセル表示など、リッチなビジュアル表現をするサイトを見かけます。一方で連続して動くアニメーションにめまいや不快感を感じるユーザーがいる事に配慮が必要です。

macOS では「視覚効果を減らす」Windows では「アニメーションを表示する」という OS の設定の切り替えによってモーションの表示方法を変更する事ができます。CSS や JavaScript を使ったアニメーションはこの設定に自動で連動しないため、設定に応じた切り替えを開発者が用意する必要があります。

```html
<!-- CSS のアニメーションを OS の設定に応じて切り替える例 -->
<div class="animation box">hello</div>

<style>
.box {
  width: 5rem;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: center;
}
  
@keyframes fadeIn {
  from { color:white; }
  to { background:black; color:white; }
}

/* OS の設定でモーションを無効化している時 */
@media (prefers-reduced-motion: reduce) {
  .animation { animation: none; }
}
/* OS の設定でモーションを有効化している時 */
@media (prefers-reduced-motion: no-preference) {
  .animation {
    animation: 3s linear 2s infinite alternate fadeIn;
  }
}
</style>
```

同じ CSS を利用して、カルーセル表示でも OS の設定に応じて自動再生とユーザーによる手動再生を切り替える事ができます。

```html
<div class="carousel">
  <img src="...">
  <img src="...">
  <img src="...">
  
  <div class="carousel-control">
    <button>開始</button>
    <button>終了</button>
  </div>
</div>

<style>
  /* OS の設定でモーションを無効化している時は操作パネルを表示 */
  @media (prefers-reduced-motion: no-preference) {
    .carousel-control { display:none; }
  }
</style>
```

- [G4: コンテンツを一時停止させて、一時停止させたところから再開できるようにする](https://waic.jp/docs/WCAG-TECHS/G4.html)
- [G11: 5 秒未満で点滅するコンテンツを制作する](https://waic.jp/docs/WCAG-TECHS/G11.html)
- [G176: 閃光を放つ領域を十分に小さくする](https://waic.jp/docs/WCAG-TECHS/G176.html)
- [G186: 動きのあるコンテンツ、点滅するコンテンツ、又は自動更新するコンテンツを停止させるコントロールを使用する](https://waic.jp/docs/WCAG-TECHS/G186.html)
- [G187: ユーザエージェントによって点滅するコンテンツを停止できるウェブコンテンツ技術を使用する](https://waic.jp/docs/WCAG-TECHS/G187.html)
- [G191: 点滅するコンテンツのないページを再読み込みするリンク、ボタン、又はその他のメカニズムを提供する](https://waic.jp/docs/WCAG-TECHS/G191.html)

## 解像度の異なるデバイスからのアクセスを考慮する

「レスポンシブ」という言葉が Web サイトのデファクトの手法になりつつある昨今ですが、アクセシビリティ配慮としても大事な視点です。

```css
/* 😩 Bad */
ul { width: 300px; }
main { font-size: 14pt; }
img { width: 500px; }
```

- スマホなど解像度の低いデバイスでフォントサイズが小さく読みづらい。
- スマホなど解像度の低いデバイスで画像が見切れてしまう。

```css
/* 😊 Good */

/* タブレット */
@media (min-width: 768px) {
  ul { display: none; }
  main { width: 100vw; }
  img { width: 80%; }
}
/* デスクトップ PC */
@media (min-width: 992px) {
  ul { width: 30vw; }
  main { width: 70vw; }
  img { width: 500px; }
}
```

- デバイスごとに表示が最適化される。

どのようなデバイスを使ってサイトを訪れるのかはユーザーに委ねられています。開発環境と異なる解像度のデバイスをエミュレートし、操作性を損なう事がないかチェックする必要があります。

メジャーなブラウザであればデバイスのエミュレートは標準の機能として提供されています。また異なるデバイスを一度にエミュレートするツールとして [Responsively](https://responsively.app/) がとても便利でおすすめです。

- [達成基準 1\.3\.4 の失敗例 － デバイスの向きを変更するように促すメッセージが表示される](https://waic.jp/docs/WCAG21/Techniques/failures/F100)
- [達成基準 2\.5\.6 の失敗例 － タッチスクリーンデバイスにおいてインタラクションがタッチのみに限定されている](https://waic.jp/docs/WCAG21/Techniques/failures/F98)

---

中には、さまざまなグラフと多数の入力コントロールを一度に表示するなど、レスポンシブの実現が難しいサイトがあるかもしれません。スマホ表示のための特別なサイトを数ヶ月かけて作ったとして、結果的に利用ユーザーが一人もいないのであれば悲しい自己満足になってしまいます。また、レイアウト崩れを考慮して特定のデバイスで画面全体を縮小表示するような場合、フォントサイズやボタンが小さくなりすぎる事で操作性との兼ね合いの問題が出てきます。

私が **まずは Web サイト（サービス）をどのように利用して欲しいのかという原点に立ち戻る** 事を重要と考えているのは、世界中のユーザーと利用シーンを網羅した Web サイト構築の難しさが根底にあるからです。アクセシビリティ配慮に傾倒するあまり本来のユーザーを見失う事は、開発者・ユーザーどちらにとっても嬉しい事ではありません。

このページで紹介した実践方法も、ご自身のサイトに適用する際に「誰に対してメリットがあるのか？」をご一考いただければと思います。
