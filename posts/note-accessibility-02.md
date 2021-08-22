---
title: アクセシビリティについて調べた事まとめ(2)
description: 
tags: accessibility note
updatedAt: 2021-07-26
published: true
---

# 2. WAI-AREA とは

この章では Web アクセシビリティで避けて通れない WAI-AREA についておおまかに説明します。

Web アプリケーションは、ひと昔前と比較してリッチな UI が当たり前の時代となりつつあります。複雑な UI パーツも次々と登場し `<div>` や `<span>` を多用した複雑な構造がよく見られるようにもなりました。このような構造は `<form>` や `<fieldset>` などを使ったシンプルなアプローチと比べると装飾を華やかにする事には長けていますが、HTML のコードでは構造上の意味を持ちません。スクリーンリーダーの利用者にとって、このようなサイトは足がかりが掴めずとてもストレスを感じるものとなります。

WAI-AREA は要素に付加的な意味を追加する事でマシンリーダブルを実現し、ユーザーを手助けする事を目的としています。WAI-AREA では意味を HTML タグの属性として定義します。これらの属性は「ロール」「ステート」「プロパティ」に分類できます。

## ロール

ロールは要素に対して役割を定義します。例えば `<div>` にロールを付与する事で、その要素がサイト上の特定の意味を持つ領域である事を示します。

```html
<!-- ダイアログである事を示す -->
<div role="dialog">
  <h2>規約</h2>
  <p>...</p>
  <button>同意する</button>
</div>
```

### ロールの分類

ロールはいくつかの種類に分類されます。

ロール | 用途 | 例
--- | --- | ---
抽象ロール | ロールモデルの定義に使用されるもので開発者は使用しない | `command` `landmark`
ウィジェットロール | 単体または複合のウィジェットとして機能する事を示す | `button` `tab` `listbox`
文章構造ロール | コンテンツを体系づける構造記述を示す | `article` `feed`
ランドマークロール | 特定の目的に関連した領域である事を示す | `form` `search`
ライブ領域ロール | 動的に変化するコンテンツである事を示す | `alert` `timer`
ウインドウロール | ウインドウとして機能する事を示す | `dialog`

[ロールの分類 \| WAI-AREA 1.2](https://momdo.github.io/wai-aria-1.2/#roles_categorization)

### ロールの種類

ロールにはたくさんの種類があります。
`checkbox` や `form` など HTML 標準のタグで代用可能なものや、`banner` `menubar` など WAI-AREA 独自のものがあります。

[ロールの定義 \| WAI-AREA 1.2](https://momdo.github.io/wai-aria-1.2/#role_definitions)

## ステートとプロパティ

ステートは要素の状態を示します。例えば下記の例では、トグルボタンが押されている状態を示しています。

```html
<div role="toolbar">
  <button type="button" aria-pressed="true">Asc</button>
  <button type="button" aria-pressed="false">Desc</button>
</div>
```

プロパティは要素の性質を示します。例えば下記の例では、入力が必須である事を示しています。

```html
<div role="textbox" aria-required="true">
```

ステートとプロパティはロールの持つ性質を形成するために使用し、どちらも `aria-` という属性名のプレフィクスを持ちます。特性が類似しているため WAI-AREA のドキュメントでは「ステートおよびプロパティ」として両者をまとめて表記する箇所が多く見られます。

[ステートおよびプロパティの定義 \| WAI-AREA 1.2](https://momdo.github.io/wai-aria-1.2/#state_prop_def)

## ロールとステート・プロパティの関係

要素のロールにより、その要素が持つべきステート・プロパティが決定します。またいくつかのロールは、要素の親子関係を持ちます。

```html
<!-- tablist ロールは 複数の tab ロールを所有する  -->
<div role="tablist" aria-label="商品カテゴリ">
  <!-- tab ロールは aria-selected ステートを持つ -->
  <button role="tab" aria-selected="true">靴</button>
  <button role="tab" aria-selected="false">靴下</button>
</div>
```

ロールと一致しないステート・プロパティを指定する事や、親子関係を無視する記述は誤りです。

```html
<!-- 😩 Bad: tablist ロールは aria-pressed を持たない -->
<div role="tablist" aria-pressed="true">
  <!-- 😩 Bad: tab ロールが存在しない -->
</div>
```

## 暗黙の ARIA ロール

HTML 標準のタグはロールとの関連性を持ちます。

HTML タグ | 暗黙のロール | 変更可能なロール
--- | --- | ---
`<button>` | `button` | `checkbox` `link` `menuitem` など
`<div>` | なし | すべてのロール
`<label>` | なし | なし
`<main>` | `main` | なし

`<div>` は全てのロールに変更が可能です。

```html
<!-- 😊 Good -->
<div role="button"></div>
<div role="list"></div>
```

`<label>` はロールの宣言が許可されません。

```html
<!-- 😩 Bad -->
<label role="button"></label>
```

`<button>` は暗黙的に `button` ロールが付与されます。

```html
<!-- 暗黙的に button ロールが付与される -->
<button></button>
```

暗黙のロールを宣言する事は冗長とされています。

```html
<!-- 😩 Bad -->
<button role="button"></button>

<!-- HTML 5 をサポートしないブラウザ向けにフォールバックとして利用される事はある -->
<main role="main"></main>
```

HTML タグとロールの関係は [HTML要素ごとのARIA属性利用の規則 \| ARIA in HTML](https://momdo.github.io/html-aria/#docconformance) の表組みの部分にまとめられています。

## 暗黙のステート・プロパティ

ロールを宣言した時と同じように、暗黙のロールはその要素が持つべきステート・プロパティを決定します。

```html
<div role="heading" aria-level="1"></div>

<!-- 暗黙のロール: heading -->
<!-- 暗黙のプロパティ: aria-level -->
<h1></h1>
```

暗黙のステート・プロパティを宣言する事は冗長とされています。

```html
<!-- 😩 Bad -->
<h1 aria-level="1"></h1>
```

HTML タグとステート・プロパティの関係は [HTMLの機能によるARIA属性利用の規則 \| ARIA in HTML](https://momdo.github.io/html-aria/#docconformance) の表組みの部分にまとめられています。

## グローバルなステート・プロパティ

一部のステート・プロパティはロールの宣言に関わらず、全ての要素で利用可能です。

```html
<!-- 😊 Good -->
<!-- aria-keyshortcuts でショートカットキーを明示する -->
<button aria-keyshortcuts="A">...</button>
```

ただしロールにより「禁止のステートおよびプロパティ」に列挙されている場合は利用できません。例えば [captionロール](https://momdo.github.io/wai-aria-1.2/#aria-label) では `aria-label` の使用が禁止されています。

```html
<!-- 😩 Bad: 禁止されている -->
<div role="caption" aria-label="ツリガネムシ">...</caption>
```

[グローバルなステートおよびプロパティ \| WAI-AREA 1.2](https://momdo.github.io/wai-aria-1.2/#global_states)
