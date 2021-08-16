---
title: アクセシビリティについて調べた事まとめ
description: 
tags: accessibility note
updatedAt: 2021-07-26
published: true
---

アクセシビリティについて知らない人が Web サービスをどうやってアクセシブルなものにするか考えたまとめ。
MDN のドキュメントをベースに、自分なりの理解やサンプルを探してまとめたもの。

# アクセシビリティとは

誰でもがサイトのコンテンツをストレスなく閲覧・利用できるようにする事。

Web サイトにはさまざまな人が訪れる。中には色弱やてんかんなど視覚的効果に敏感なユーザーがいるかもしれない。ぐわんぐわんするアニメーションや過度にビビッドな色合いが彼らにストレスを与えていないだろうか？骨折など一時的にマウスを使えないユーザーがキーボード操作だけでいつもと同じようにサイトを利用する事ができるだろうか？

アクセシビリティは障害者のみをターゲットにした特別な配慮のように取られがちだが、本質はそうではない。ストレス軽減に配慮したサイトを提供する事で、パワーユーザーや開発者を含めた **誰でもが快適にサイトを利用できる** よう品質を向上させる事にある。

キーボード操作の網羅性は、操作に長けたパワーユーザーやスクリーンリーダーの利用者にとって便利なものになる。正しい HTML 構造とラベル付けは、開発者にとってセマンティクスなコーディングの意識付けとなる。さらには余計なモーションを減らす事で、視覚的な気持ち悪さを感じてサイトを離脱するユーザーを減らす事ができるかもしれない。

アクセシビリティに関する全てのもの（ガイドラインやコーディング方法）を実践する事はとても難しいため、目的や手段を整理し、アクセシビリティへの配慮がエンジニアの日常的な習慣となるよう、まずはその入口に立ちたいと思う。

2021年8月現在、W3C によるガイドラインは Ver2.1 が策定されている。

[Web Content Accessibility Guidelines (WCAG) 2.1](https://waic.jp/docs/WCAG21/)

# 参考資料

- [アクセシビリティ \| MDN](https://developer.mozilla.org/ja/docs/Web/Accessibility)
- [MDN ラーニングエリアのサンプルコード例](https://github.com/mdn/learning-area)
- [Accessibility Developer Guide](https://www.accessibility-developer-guide.com/)
- [WAI\-ARIA 再入門。 \| Qiita](https://qiita.com/boseki/items/dd952e7dc1d7a8340898)
- [Web A A11y.jp](https://weba11y.jp/basics/)
- [情報バリアフリーポータルサイト](http://jis8341.net/index.html)

# アクセシビリティに配慮した企業サイト

## [apple](https://www.apple.com/jp/)

ナビゲーションやフッターなどのロールの使い方が単調でなく多彩。
macOS の設定で「視覚効果を減らす」に応じて、iPad や iPhone のページに遷移した時のモーションが変わる。

## [accessibe](https://accessibe.com/)

Webサイト構築のコンサルティング会社（たぶん）。
ページ右下にあるコンテンツ表示のカスタマイズボタンが特徴的。`Seizure Safe Profile` をオンにするとサイトがてんかん発作のある人に配慮した色合いに変わり、また `ADHD Friendly Profile` をオンにするとサイトの一部だけにスポットライトを当てたような表示に切り替える事ができる。
キーボード操作でもストレスなくコンテンツをナビゲートするよう配慮されている。

## [パナソニック補聴器](https://panasonic.jp/hochouki/)

`<main>` やランドマークロールのお手本になる。
カルーセル表示の画像切替や停止ボタンをキーボードで操作できるよう配慮されている。

## [ics.media](https://ics.media/)

macOS の設定で「視覚効果を減らす」に応じて、ヘッダ画像やボタンのフォーカスのモーションが変わる。
キーボード操作のフォーカスを見失う事がなく、操作が気持ち良い。

# Chromeエクステンション

## [HTML Visual Validation](https://chrome.google.com/webstore/detail/html-visual-validation/hicjdabjhdmaaabgackleegipabmeack/related)

HTML タグを可視化するエクステンション。`<header>` `<main>` `<ul>` 等がどのように配置されているかをビジュアルで見る事ができる。

## [Landmark Navigation via Keyboard or Pop-up](https://chrome.google.com/webstore/detail/landmark-navigation-via-k/ddpokpbjopmeeiiolheejjpkonlkklgp/related?hl=ja)

ランドマークエリアを可視化するエクステンション。 `Banner` `Main` `Content information` 等がどのように配置されているかをビジュアルで見る事ができる。

## [Grayscale Tool](https://chrome.google.com/webstore/detail/grayscale-tool/odolflphhameojgliipcnahnipmogigo)

Web サイト全体をグレースケールで表示する。

## [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ja)

Web サイトを分析しレポートを生成するエクステンション。レポートの項目には、パフォーマンス・SEO の他にアクセシビリティがあり、画像の代替テキストやコントラスト比をチェックできる。

# ページのアウトラインを形成する HTML 要素

`<header>` `<main>` `<nav>` といったコンテンツ区分要素を使ってページのアウトラインを作り、セマンティクスな構造を作る。

アウトラインを作成するための区分要素は下記の通り。

区分要素 | 説明
--- | ---
`<header>` | ページや章ごとのヘッダ
`<nav>` | ナビゲーション要素のグループ
`<main>` | ページの本筋
`<footer>` | ページや章ごとのフッタ
`<h1>〜<h5>` | 見出し
`<aside>` | 本筋と分離しても問題のない要素
`<article>` | 自己完結し配信や再利用を行う事ができるもの
`<section>` | 章を表すもの

[コンテンツ区分 \| MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element#content_sectioning)

## header

ページヘッダーの他、セクションや記事のヘッダーとして存在させる事もできる。 `<header>` は通常 `<h1>〜<h6>` の見出しを含む。

- 👍 ページのヘッダー
- 👍 セクションヘッダー

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | ○ | HTML5は不可<br>HTML5.1では区分要素で階層化されている場合に可能
ページ内の複数回の出現 | ○ | 

## nav

ナビゲーションリンクを含むグループを定義する。 サイト内のナビゲーションにのみ使用し、本筋と直接関与しないリンクのグループには用いない。

- 👍 サイトマップ
- 😩 SNS のプロフィール

ルール | 可否 | 補足
--- | :---: | ---
入れ子にする | × | 
ページ内の複数回の出現 | ○ | 

## main

- 👍 商品一覧
- 😩 関連情報

ページの本筋を囲む。文章の中心的な主題やアプリケーションの中心的な機能、またそれらに直接関与するものなど。

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

リッチな Web ページが増えるにあたり、複雑な UI コントロールが開発者によって作られるようになった。これらは `<div>` のような構造上の意味をなさない HTML の要素によって構成される事が多い。 WAI-AREA はブラウザが認識できる意味論を追加し、ユーザーを手助けする。

WAI-AREA には主にロール、プロパティ、ステートの 3 つの機能がある。

[WAI-AREA って何？ \| MDN](https://developer.mozilla.org/ja/docs/Learn/Accessibility/WAI-ARIA_basics)

### ロール

ウェブページの構成と構造を定義するもの。例えばセマンティクスを持たない `<div>` にロールを付与する事で、ページ上の目印となる領域である事を示す。

```html
<div role="dialog" aria-label="個人情報に関する確認事項">
  <h2>規約</h2>
  <p>...</p>
  <button>同意する</button>
</div>
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

### プロパティ

要素の性質を定義するもの。例えば `aria-checked="true"` はチェックボックスが選択され「checked」の状態である事を示す。

```html
<!-- HTML5 をサポートしていないブラウザでは aria-required がを役立てる事ができる -->
<span role="checkbox"
  aria-checked="false"
>
```

### ステート

要素の状態を示すもの。例えば `aria-pressed="true"` はボタンが押されている状態を示す。プロパティはアプリのライフサイクルを通して変化しないのに対し、ステートは変化を伴う。

```html
<div role="toolbar">
  <button type="button" aria-pressed="true">Asc</button>
  <button type="button" aria-pressed="false">Desc</button>
</div>
```

### ロール・プロパティ・ステートに関する参考ドキュメント

- [ARIA を使用する: ロール、ステート、プロパティ \| MDN](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/ARIA_Techniques)
  - ロール・ステート・プロパティの一覧。（一部リンク切れ）
- [5.4 Definition of Roles \| Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)
  - ロールの説明が網羅されている。
- [3. Document conformance requirements for use of ARIA attributes in HTML \| ARIA in HTML](https://www.w3.org/TR/html-aria/#docconformance)
  - W3C のドキュメント。HTML 要素と暗黙裡に宣言されるロールの一覧。
- [WAI-ARIA Authoring Practices 1.1 \| W3C](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/)
  - ロール・プロパティ・ステートのサンプルコード。
- [DiGITAL A11Y](https://www.digitala11y.com/)
  - 検索ボックスにロールやプロパティ名を入力する事でサンプルコードを探す事ができる。

## ページのアウトラインをコンテンツ区分要素で構成する

`<div>` `<span>` を多用し CSS クラスで視覚的にアウトラインを表現しているようなサイトでは、ブラウザがそれぞれの領域が何のために存在しているのか判別する事ができない。

```html
<!-- 😩 Bad -->
<div class="header"></div>

<div class="main-contents">
  <span class="header-1"></span>
  <div class="article"></div>
  <div class="article"></div>
</div>

<div class="footer"></div>
```

ページのアウトラインを `<header>` `<nav>` `<main>` `<footer>` などコンテンツ区分要素で構成する。

```html
<!-- 😊 Good -->
<header></header>

<main>
  <h1>ページ見出し</h1>
  <article></article>
  <article></article>
</main>

<footer></footer>
```

MDN のサンプルページを見てみると構造とコンテンツ区分要素がビジュアルで理解できる。

https://mdn.github.io/learning-area/html/introduction-to-html/document_and_website_structure/

<img src="https://user-images.githubusercontent.com/15980747/129509891-d142aa44-7188-4ca3-af85-aa92d708410a.png" alt="コンテンツ区分要素を使った例" width="500px">

## できるだけ標準の HTML 要素を使ってセマンティクスを表す

下記のようにロールを使ってリンクを表現する場合、いくつかの問題点がある。

```html
<!-- 😩 Bad -->
<span class="link" onclick="..." role="link">ログイン</span>
```

- ARIA をサポートしていない古いブラウザでは意味をなさない
- キーボード操作によってフォーカスを受け付ける事ができない

このようなケースでは、標準の `<a>` を用いてリンクを表現する事。

```html
<!-- 😊 Good -->
<a href="..." class="link">ログイン</a>
```

## 見出しには `<h1>〜<h6>` を用いる

下記のように CSS クラスで視覚的に見出しを表現する場合、スクリーンリーダーはそれが見出しである事を判断する事ができない。

```html
<!-- 😩 Bad -->
<span class="header-1">ページ見出し</span>
<section>
  <span class="header-2">セクション見出し</span>
</section>
```

見出しには `<h1>〜<h6>` を用いる。このようにする事で見出しにフォーカスした時にスクリーンリーダーがそれが見出しである事を読み上げる事ができる。

```html
<!-- 😩 Bad -->
<h1>ページ見出し</h1>
<section>
  <h2>ページタイトル</h2>
</section>
```

## ラベル付けする

下記のような例では `<input>` にフォーカスした場合に、スクリーンリーダーが何のための入力要素なのかを読み上げる事ができない。

```html
<!-- 😩 Bad -->
<span>ユーザー名</span>
<input type="text">
```

このようなケースでは `<label>` を `<input>` と関連付ける事でいくつかの利点が発生する。

```html
<!-- 😊 Good -->
<label for="username">ユーザー名</label>
<input type="text" id="username">
```

- `<input>` にフォーカスした時スクリーンリーダーがラベルを読み上げ、ユーザーに何のための入力要素か伝わる
- ラベルをクリックすると `<input>` がアクティブになる、ヒット領域領域を拡大する事で小さなデバイスで操作しやすくなる

## 意味の通るテキストラベルを用いる

下記のような前後の文脈に依存するラベルは視覚的に判断する事はできても、ブラウザがそれを判断する事ができない。スクリーンリーダーはフォーカスされた要素のラベルを読み上げるため、唐突に「ここをクリック」「こちら」だけがユーザーに伝わる事になる。

```html
<!-- 😩 Bad -->
このサイトについては <a href="...">ここをクリック</a> してください。
もっと詳しく知りたい方は <a href="...">こちら</a>
```

前後の文脈に依存せず、ラベルが単独で意味の通るものにする事。

```html
<!-- 😊 Good -->
<a href="...">このサイトについての情報</a>
<a href="...">関連情報</a>
```

## 画像の意味を補足する

画像は視覚的な説明として用いられる事があるが、スクリーンリーダーはそれが何の画像であるかを判断する事ができない。

```html
<!-- 😩 Bad -->
<img src="dinosaur.png">
```

画像には、配置した意図や説明を `alt` 属性で代替テキストとして付与する。

```html
<!-- 😊 Good -->
<img src="dinosaur.png" alt="ティラノサウルス。直立する二足歩行の恐竜で腕は小さい。">
```

本文が画像の意図や説明を兼ねている場合は `alt` 属性を空とする。

```html
<section>
  <h2>ティラノサウルス</h2>
  <img src="dinosaur.png" alt="">
  <p>ティラノサウルス。直立する二足歩行の恐竜で腕は小さい。</p>
</section>
```

[第一章.画像 | 情報バリアフリーポータルサイト](http://jis8341.net/jirei_sample/jirei_chapter_01.html#alt11)

## WAI-AREA でロールを補足する

HTML タグ本来のセマンティクスと重複する冗長なロールの付与は避ける事。

```html
<!-- 😩 Bad -->
<button role="button"></button>
```

HTML タグ本来のセマンティクスを上書きするロールの付与は避ける事。

```html
<!-- 😩 Bad -->
<details>
  <summary role="button"></summary>
</details>
```

## WAI-AREA のプロパティで要素の役割を補足する

## WAI-AREA のプロパティで要素の状態を補足する

## 意味のない要素である事を伝える

例えばズーム機能はスクリーンリーダーの利用ユーザーにとって意味をなさない。意味のない機能だとそのまま伝えるほうがユーザーにとってメリットがある。

```html
<!-- 😩 Bad -->
<label for="zoom"></label>
<button id="zoom">
  <img src="...">
</button>
```

```html
<button aria-label="ズーム機能のためスクリーンリーダーではご利用いただけません">
  <img src="...">
</button>
```

または `aria-hidden` でスクリーンリーダーの読み上げをスキップする。

```html
<button aria-hidden="true">
  <img src="...">
</button>
```

## コントラスト比に配慮する

WIP

## フォーカス可能にする

## フォーカスした状態を視覚的に表現する

## キーボード操作を可能にする


- タブナビゲーションを `Tab` で移動する
- `Shift + Tab` で逆方向に移動する
- `Enter` で決定する
- `Space` でオープン・クローズなどステートをトグルする
- 矢印キーで項目を移動する
- `Esc` でプロンプトなどを閉じる

## スキップコンテンツ

## 動的な変化のあるコンテンツ

## メモ

2021-07-25 MDNを読んでまとめた事
2021-01-01-5 Accessibility Developer Guideを読んで書いたメモ
tips-accessibility サンプルコード集
