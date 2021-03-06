# コントラスト比

文字の色と背景色との相対的な明るさ（相対輝度）の差を示した比率。
文字の色・背景色のコントラスト比の数値が一定基準に達しているかどうかで `AA` `AAA` 等の判定度を計る事ができる。

> **Web Content Accessibility Guidelines (WCAG) 2.0**
> アクセシビリティのためのガイドライン

トーンは特に重要ではない。
トーンによって区別されていても、色覚異常の人にとって区別の材料とならない事がある。
（同じトーンの緑と赤がグレーの濃淡にしか見えないケースがある）

note:

- 目視で確認するのではなくコントラスト比は常に数値で算出する

## 画像内のテキスト

画像内のテキストにもコントラスト比のガイドラインは適用される。
ただし画像内のテキストはスクリーンリーダーがテキストを検出できないため alt 属性を付ける事を勧める。

## プレースホルダ

プレースホルダにもガイドラインは適用される。
ただしプレースホルダは別の問題としてアクセシビリティの課題を抱えている。

## コントラスト比の例外

- 企業のロゴ
- ボットチェック画像の装飾テキスト
- 画像内の道路標識
- disabledなテキスト

## UI パーツ

`<input>` `<button>` などのフォームのパーツもコントラスト比のガイドラインを考慮したほうが良い。
背景色と `<input>` 線のコントラスト比が `1.5:1` のケースでは視覚障害のある人がそのパーツを見つけるのが困難になるかもしれない。

また、ボタンには「OK」のような単語でなく具体的なテキストを示したほうが良い。

タブリストについて、開始位置と終了位置を明確にする事は優れたスタイルのため、アクティブなタブおよびそのコンテンツの境界をコントラスト比の高い線で示す事は優良である。

ボタンについて、フォームの入力に誤りがあり `submit` できない事を示すケースでは、その状態を示す事を考慮する事。
`disabled` にするのも手段のひとつ、そして `readonly` と混同しない事。

## グラフィカルオブジェクト

グラフ、アイコンなど。
コントラスト比を考慮する事が必要。
またコントラスト比だけでなく、不要なグリッド線を排除し数値のラベルを追加するなどデザインを工夫する余地もある。

## 色だけで表現できないもの

白背景に青・濃いグレーはコントラスト比は十分なものの、この２色でアクティブなページとそれ以外をタブナビゲーションで表現するのは不十分である。
背景・前景のコントラスト比が同じである場合、グレースケールで前景がほぼ同じグレーで表現されてしまう。
その場合、太字や下線で工夫する。

# セマンティクス

HTMLはマークアップ言語である。単なるプレーンテキストでなく意味を持たせたマークアップを行う事ををセマンティクスと呼ぶ。
HTMLが単なる `<div>` `<span>` の列挙になっていないか？

## 見出しには `<h1>` `<h2>` を用いる

スクリーンリーダーがコンテンツと共に `heading level` を伝える。

## 構造要素

HTML5で導入された構造を示す要素。

- `<header>`
- `<navigation>`
- `<main>`
- `<footer>`

## セマンティクスが失われる問題

`font-size: 1px` `color:blue` など視覚的に要素に差をつけてもスクリーンリーダーはそれを考慮しない。
これらを使うのではなく意味のある構造にしなければならない。

SEOを意識して全てを `<h1>` で配置し `<h1 class="h2">` のように外観で構造を表現するのは間違い。

## 構文を間違えない

タグの閉じ忘れ、`<tr>` に属さない `<td>` などがあってもブラウザは外観を補正してしまう。
スクリーンリーダーはHTMLコードに依存するため、ブラウザの補正に頼らず正しい構文で記述すること。

## カスタム機能より意味論を重視する

`<span class="link">` のようにして Anchor と同じ機能を持たせた場合、一部のスクリーンリーダーはクリック可能である事を読み上げるかもしれない。
ただし `<a>` を用いた時とは異なり「リンク」の意味が失われてしまう。

HTML の標準に忠実にコーディングする事、そうする事でカスタムに勝る意味論を表現する事ができる。

radio を使ったタブリストの例：
タブはひとつしか選択できない事を表現する。
`<fieldset>` がひとまとまりの部品を表現する。

```html
<div class="tablist">
  <fieldset>
    <legend>Tablist controls</legend>
    <input type="radio" name="tablist" value="dancing" id="dancing_label" checked />
    <label for="dancing_label">Dancing</label>

    <input type="radio" name="tablist" value="soccer" id="soccer_label" />
    <label for="soccer_label">Soccer</label>
  </fieldset>

  <div id="dancing_panel">...</div>
  <div id="soccer_panel" hidden>...</div>
</div>
```

# ARIA

HTML標準だけでは機能を表現しきれないため、その属性を追加するために作られた。
タブリスト・ドロップダウン・オートコンプリートなど。

## role

`role="button"` など意味のあるロールを表現する。

## aria-*

`role` で表現したロールにステータスを付け加える。
`<span role="button" aria-pressed="true">` など。

> **role** と **aria** の一覧
> https://www.w3.org/TR/wai-aria-1.1/#tablist

## ARIA の問題

ARIA はスクリーンリーダーによって差異があり完璧に動作するとは言えない。
現段階で ARIA だけを頼ってアクセシビリティを向上させるのはお勧めしない。

### role で解決できない問題

例えば：

```html
<span class="link" onclick="..." role="link">
  Google
</span>
```

古いスクリーンリーダーは `role="link"` をサポートしていない、また `<span>` はフォーカスできない、カスタムのjavascriptを必要とするなどの問題がある。
これに対する良い解決策は HTML 標準の `<a>` を用いる事。

### 冗長

```html
<form role="form">
  ...
</form>

<a href="..." role="link">
  Google
</a>
```

このような過剰な意味づけをするとスクリーンリーダーはバグを起こすらしい。

## ARIA でラベル付けする例

下記の例は画像でユーザーをナビゲートするため、スクリーンリーダーがリンクである事を認識できない。

```html
<a class="cart"></a>

<style>
a.cart {
  background: url("cart.png");
}
</style>
```

`aria-label` を用いる事でスクリーンリーダーはリンクである事を認識する。

```html
<a class="cart" aria-label="Shopping cart"></a>

<style>
a.cart {
  background: url("cart.png");
}
</style>
```

ただしこれには下記のような問題がある。

- テキストブラウザは画像が表示されない
- レガシーなスクリーンリーダーは ARIA の互換性がない
- ネットワークの問題がある時、画像が表示されない
- テキスト検索が ARIA のラベルに一致しない

堅牢にコーディングするには HTML によって構造を示す事がポイントとなる。

```html
<a class="cart">
  <span class="visually-hidden">Shopping cart</span>
</a>
```

また `alt` を用いてネットワークに問題があるケースでもユーザーに意図を伝える事。

```html
<a class="cart">
  <img src="cart.png" alt="Shopping cart" />
</a>
```

下記は少し冗長に感じられるかもしれないが、情報が少ないよりも冗長な情報が少しあるほうが良い。

```html
<a class="cart">
  <img src="cart.png" alt="Shopping cart" />
  <span class="visually-hidden">Shopping cart</span>
</a>
```

ARIA を用いてラベルを追加する事は、一般のユーザーと障害のあるユーザーを異なる方法で扱う事であり、ベストな解決策ではない。

## 一部のユーザーの扱いを変える事

ズーム機能はスクリーンリーダーのユーザーにとって意味のない機能であるとラベルを用いて伝える例。

```html
<button aria-label="Dear screen reader user, please do not use this functionality, it is not meant for you">
  Zoom image
</button>
```

ユニバーサルデザインでは機能は全てのユーザーにとって同じであるべきと定められている。
スクリーンリーダーのユーザーは意外かもしれないがズーム機能を使っていて、開発者の思い込みで一般のユーザーと障害のあるユーザーへの機能を区別するべきではない。

また開発者の思い込みでフォーカスされた要素を `aria-hidden` で隠蔽するケースが見受けられる。
`aria-hidden` の要素にもブラウザは tab でフォーカス移動するが、スクリーンリーダーがそれを読み上げる事ができないという問題がある。

# キーボード操作

タッチ操作やポインティングデバイスを利用できないユーザーのためにキーボードで操作を完遂できる事を考慮する。
キーボードを使用できないユーザーのために代替デバイスが存在するため、キーボードでの操作の完遂は有用である。

Windows を例にすると、メニュー項目には `Select all...Ctrl + A` のようなキーボード操作が存在する。
また先頭文字に下線が引かれているメニュー項目はショートカットキーによりその項目にアクセスできる事を意味する。

これは特定グループ向け（運動障害など）にサイトを最適化し、他のグループ向け（パワーユーザー）にサイトを最適化する良い例。
運動障害のあるユーザーは少ないキー操作で項目にアクセスする事ができ、またパワーユーザーにとっても高速に機能を利用できる。

Web サイトの例：

- タブナビゲーションを `Tab` で移動する
- `Shift + Tab` で逆方向に移動する
- `Enter` で決定する
- `Space` でオープン・クローズなどステートをトグルする
- 矢印キーで項目を移動する
- `Esc` でプロンプトなどを閉じる

標準の HTML はキーボード操作をサポートするため、特別なキー操作の考慮は必要ない。

- 要素がフォーカス可能かどうかを確認する
- `<div tabindex="0">` などでフォーカスを与える
- `<a>` は `href` 属性が与えられた時のみフォーカス可能な挙動をする

必要に応じて `onClick` を実装する。

- どのブラウザでも動作可能にする事
- マウスクリックや `Enter` キーがトリガーになる
- よく使われる `hover` はマウス操作にしか反応しないためそれだけに頼るとドロップダウンなどの開閉が一部のユーザーに限定されてしまう
- キーコード `13` だけに反応するような処理はスクリーンリーダーの `Enter` をキャッチできないため `onClick` のほうが有用
- `Alt` や矢印キーなど特定のデバイスに存在しないキーに依存しない事
- キーの組み合わせは運動障害のある人が押すことが難しい
- ダイアログを開いた時はカレントのコンテンツを示すためフォーカスを与える事
- ダイアログについては閉じるボタンを最初の要素として定義する事が望ましい
- ダイアログが開いた時にフォーカスが背景コンテンツに存在したままにするのはパワーユーザーにとっても望ましくない
- ダイアログが閉じた時は直前の操作にフォーカスを当てる事

# Example

## lang を設定する

スクリーンリーダーに正しく認識させるため。

## title を設定する

ページがロードされた時にスクリーンリーダーが読み上げる。
「お問い合わせフォーム ACME Inc.」のようにどのサイトに属するのかサイトの名前を追加する事を忘れないようにする。

`alert` ロールを使うと「送信に失敗」や「入力項目に誤りがある」などのアラートをユーザーに伝える事ができる。

## viewport

デバイス幅に設定しズームスケールを1にする事。

## hidden

スクリーンリーダーとビジュアルブラウザの両方から非表示にするには `.visually-hidden { left: -10000px }` などを用いて viewport の外に出す事。
フォーカスを得た時に画面に要素が現れる事を確認する。

ビジュアルブラウザでは認知可能でスクリーンリーダーは無視する設定は ARIA で簡単に実装できるがフォーカス可能な要素に適用してはいけない。

`hidden` 属性はどのデバイスからも完全に見えなくする事ができる。
または CSS の `visibility:hidden` でも同じ。
コンテンツとプレゼンテーションの見た目を切り分けるため `hidden` を使ってコンテンツで解決するほうがベター。

## 見出し

- `H` で次の見出しにジャンプする
- `1 - 6` 見出しを移動する

スクリーンリーダーは見出しの開始また終了を読み上げる。
良い見出しは印刷物の見出しのように構造を示し、またそれぞれの見出しにジャンプする事もできる。

- `H1` の次に `H4` が続くなどレベルをジャンプさせてはいけない
- スタイルのためにひとつ上の `<H#>` に関連のない項目を列挙してはいけない
- スタイルのために見出しでない `<strong>` などを使ってはいけない

構造の問題はツールが検出できるが、列挙間違いなど意味論の問題はツールは検出できない。

## header/navigation/contents/footer

ヘッダーやフッターなどは上部や下部など所定の場所に配置される事が多いため、視覚的に認識する事が容易。
ただしスクリーンリーダーではその認識がしづらい。

解決策のひとつはヘッダーやフッターなどそれぞれに `<H#>` を配置する事だが、視覚的なスタイルを崩してしまう事がある。
`visually-hidden` クラスを宣言してスクリーンリーダーにラベルを提供しながら視覚的に非表示にするテクニックがある。

```html
<div id="header">
  <h1 class="visually-hidden">
    Header
  </h1>
  <p>
    John Doe's Web Presence
  </p>
</div>
```

```css
.visually-hidden {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

## H1 とSEO

SEOの観点から `<H1>` と `<title>` はページに対してひとつだけの配置を推奨する事がある。
複数配置するとどの `<H1>` がそのページのラベルなのか判断できなくなる、というのがその理由。
ただし `<header>` `<nav>` などHTML5の構造化要素の登場によって検索エンジンも進化し、要素内の `<H1>` を容易に見分ける事ができる。

全てに `<H1>` を追加したくない場合は下記の代替策を取る事もできる。

- 前述の `visually-hidden` を使って視覚的に非表示にする
- `visually-hidden` は `<span>` などにも展開できるため `<h2><span>Main Content:</span>xxx</h2>` のようにしてプレフィクスを提供するのも良い
- メインコンテンツに `<H1>` がありフッターは `<H2>` から開始するのも良い
  - このようにするとNVDAのような構造の検出ツールではメインコンテンツにフッターが属する事になる
  - アクセシビリティコミュニティでは受け入れられている

## ラベル

HTML の構造は推奨できるものだが見出しと同等の価値を持っているとは言い難い。
そこでラベルで補足する方法が取られる。

### HTML でセマンティカルコンテキストを提供するコンテナ

- `<header>`
- `<main>`
- `<footer>`
- `<article>`
- `<aside>`

スクリーンリーダーはこれらを「ランドマーク」と位置づける。
従来の見出しのようにユーザーにラベルを伝える事ができる。
また `<header>` は `banner` として `<footer>` は `content info` として読み上げる事がある。

ウェブサイトが複雑になるにつれ自動的に多くのリージョン（領域）を持つ事になる。
例えばコンテンツナビゲーションが複数存在しどちらも `<nav>` とマークアップされている場合、これらには明示的なラベルが必要となる。
このような領域にラベリングするには ARIA を用いる。

ARIA でラベリングされた場合スクリーンリーダーは `User; navigation` `Content; navigation` のようなドキュメントアウトラインが形成される。
しかし現在のスクリーンリーダーはランドマークは見出しのアウトラインには何も追加せず、複数のランドマークが同一に見える。
したがってユーザーは見出しナビゲーションとランドマークナビゲーションを切り替えて情報を整理する必要がある。
（ランドマークナビゲーションとコンテンツとが同時に読み上げられないという事らしい）

そのため従来の見出しを使ってウェブサイトを構成する事を推奨する。
加えてセマンティクスのために ARIA を強化する事は間違っている。

見出しとランドマークが用いられる事により、ユーザーは好みに応じて見出しナビゲーションとランドマークナビゲーションの両方を使う事ができる。
そこに ARIA を用いてラベリングすると冗長な読み上げにもつながる。
（同一のランドマークを区別するために ARIA のラベリングを使えみたいな事が書いてある、と思う）

## HTML5 アルゴリズム

HTML5 アルゴリズムをサポートする支援ソフトウェアはないため現在の HTML 5.2 ドラフトは使用せず、代わりに従来の見出し（`<h#>`）を利用する事をお勧めする。
HTML5 アウトライン（というものが 5.2 のドラフトにあるらしい）を使用している場合は ARIA を用いて最適化する方法がある。

HTML5 のアウトラインアルゴリズムでは `<main>` `<article>` `<aside>` などの HTML 5 構造を使用して見出しアウトラインを簡単に生成できる。
従来の HTML では現在のコンテキストに応じて正しい見出しレベルを選択する必要があるが、HTML 5 では構造要素を用いて任意の見出しレベルを開始できる。

CodePen のサンプルを見るとアウトラインとは `<section>` など構造要素を使ったものらしい。
スクリーンリーダーのアウトラインの例を見るとそれが `<section>` であるかどうかは検出されず内包した `<h#>` だけが検出されている。
せっかくの `<section>` は全く生かされず `<h#>` はネストした `<section>` の中にあっても同一改装としてみなされてしまう。

推奨される方法は HTML5 アウトラインに依存せず従来の HTML の見出しを用いる事。

```html
<section>
  <h1>xxx</h1>
  <section>
    <h2>xxx</h2>
  <section>
<section>
```

または ARIA ラベルを利用する。

```html
<section>
  <h1 aria-level="2" role="heading">xxx</h1>
  <section>
    <h2 aria-level="3" role="heading">xxx</h2>
  <section>
<section>
```

しかし古い支援ソフトウェアは ARIA の互換性がないため、代替手段がない場合のみこの方法を用いる事。

## iframe

`<iframe>` は内包する見出しがそのまま展開されるため親コンテンツの構造を破壊しないように気をつける必要がある。

```html
<h2>xxx</h2>
<iframe>
  <h1>yyy</h1>
<iframe>
```

上記のような例では `<iframe>` によるネストのレベルは評価されず親コンテンツの `<h2>` より `<iframe>` の中の `<h1>` が外側の見出しとして展開されてしまう。
これを改善するには `<iframe>` のコンテンツを親コンテンツを破壊しない構造に変更する。

## table

`<table>` に到達すると `<caption>` とともにスクリーンリーダーに行と列の数が読み上げられる。
テーブルは `T` で移動でき、またフォーカスされているセルの内容に加えて列・行のヘッダーセル `<th>` が通知される。

垂直方向に移動すると列タイトルが読み上げられ、水平方向に移動すると行タイトルが読み上げられる。
よって最上部の行と左端の列の両方にタイトル（`<th>`）を設けるのは良い例である。

テーブルには `<thead>` `<tbody>` `<tfoot>` を用いて構造を示すことを推奨する。

## unique row

似たようなデータが並ぶテーブルの場合、単一の `<th>` だけでは識別が難しい事がある。
（氏名を `<th>` のコンテンツに指定し同姓同名がたくさん並んでいる場合など）
このようなケースでは行に複数の `<th>` を設ける事で行を特定しやすくなる。

複数の `<th>` は2つを目安にする事。不合理でも完全な識別のために `<th>` を増やしすぎないようにする。

## colspan/rowspan

スクリーンリーダーは `colspan` `rowspan` の結合数を読み上げない事がある。
したがってこれらを複雑に組み合わせたテーブルではユーザーが現在位置とタイトルを推論しながらコンテンツを探る必要がある。
これはスクリーンリーダーの欠点であるが、テーブルをシンプルに保つ事によってこの問題を回避する事ができる。

## セマンティクスとテーブル

しばしばテーブルを視覚的にカスタマイズする事がある。
例えば全てのセルを縦に積み上げたりする事もできる。

1列しかないテーブルかつ `<th><td><td> <th><td><td>` のように縦にセルを並べた場合、セマンティクスは失われる。
これは ARIA を使って補完する事ができる。

```html
<thead role="presentation">
  <tr role="row">
    <th role="columnheader">
      ...
<tbody role="presentation">
  <tr role="row">
    <th role="rowheader">
      ...
    <th role="gridcell">
```

不必要な情報は `presentation` を付与しセマンティクスの概要から除外している。
このように要素のレイアウトを変更する時は、ARIA を用いてセマンティクスを再適用する事を忘れないようにする事。

## レスポンシブ

スマホ普及により小さい画面でテーブルを表示するレイアウトがよく使われるようになった。
一般的に水平スクロールを避ける方向にある。

ブラウザを小さくリサイズした時に縦並びのセルに変形するようなレイアウトでは、縦並びになったヘッダが意味をなさない事がある。
もはや意味をなさない構造となったセルは `aria-hidden="true"` でスクリーンリーダーで非表示にする事ができる。

また JavaScript を使用して `aria-hidden` と共にセルに `Description: xxx` `Name: yyy` のようにプレフィクスを付ける事ができればアクセシビリティの完成度を高くする事ができる。このようにテーブル構造や ARIA にこだわらず柔軟に便利なものを提供する事も考慮する事。

## div でテーブル

※実験なので真似しない事
下記のようにすると外観がテーブルでスクリーンリーダー対応のレイアウトを作る事ができる。

```html
<div aria-describeby="caption" class="table" role="grid">
    <div class="tr" role="row">
      <div class="th" role="columnheader">
```

しかし特定の `role="row"` を `<div>` でラップしたりするとスクリーンリーダーは別のテーブルとして認識してしまい行数の読み上げが見た目と一致しない事がある。

```html
<div aria-describeby="caption" class="table" role="grid">
  <div class="tr" role="row">
    <div class="th" role="columnheader">
  ...
  <div class="favorite"> <---- これ
    <div class="tr" role="row">
      <div class="th" role="columnheader">
```

この場合は追加のコンテナに `role="presentation"` を追加する事で意味をなさなくなり、スクリーンリーダーがテーブルとして認識する事ができる。
このようにすればスクリーンリーダーに対しての考慮は完全になるが、しかしこれは ARIA の誤用なので実際に使わない事。
セマンティクスを破壊し ARIA で補完する事は推奨されない。

またスクリーンリーダーのユーザーにとってヘッダ行はとても重要なものなので必ず構造に付け加えるのが望ましい。
視覚的に不必要な場合は画面外にスクリーンリーダー用のヘッダを設ければ良い。

## フォーム

補助ツールではフォームの概要や要素を検出する。
ラベルは必ず設定し `<legend>` のない `<fieldset>` などフォームの誤った使い方をしないようにする。

HTML 構造の誤りを警告してくれるブックマークレット
https://www.accessibility-developer-guide.com/setup/browsers/bookmarklets/html-codesniffer/

- ラベルを必ず設定する
- `<legend>` と `<fieldset>` でグループ化する
- `<optgroup>` で選択肢のブループにラベル付けする

### スクリーンリーダーのバグ

`<input>` の `maxlength` などはスクリーンリーダーで読み上げられない事がある。
このようなケースではラベルで補完する必要がある。

### Tab キーの配慮

視覚的に無効となっている要素でも Tab キーでフォーカスを受け付けてしまう事がある。

### disabled なボタン

スクリーンリーダーがフォームの終端を検出できないため混乱する。
一般的に disabled にする事は避けるべき。

### label

`for` の代わりに `<label>` で囲む方法が用いられる事があるが問題を起こす事があり、推奨しない。

標準の HTML でフォームを構成する事、それでも不足する場合はスクリーンリーダーのためにラベルを追加する。

### Bad patern

- `<form>` タグで囲われていない
- `<label>` でなく `<div>` を使う
- `<label>` とコントロールを関連付ける `for` がない
- `<fieldset>` `<legend>` を用いないグルーピング
- `<input type="submit">` または `<button type="submit">` がない
- 全ての要素がフォーカス可能でない（キーボード操作ができない）
  - `tabindex="0"` を付与してフォーカス可能にする
- 疑似ボタンに `role="button"` を付与していない

### fieldset/legend

ラジオボタン・チェックボックスは常に `<fieldset>` でグループ化するべき。

ラジオボタンは同じ `name` が付与される事からも分かるように一定の意味をもつグループのため `<fieldset>` で囲う事が望ましい。
チェックボックスは「利用規約に同意する」などひとつしかないものも存在するが、それでも `<fieldset>` で囲う事が理にかなったケースが多い。

スクリーンリーダーによっては個々のラジオボタンの選択肢を `<legend>` とともに読み上げるものもあるため、長すぎるテキストは用いない事。

`<fieldset>` の先頭に `<legend>` を必ず持ってくる事。そうしないとスクリーンリーダーの読み上げが難しくなる。

視覚的な理由で `<fieldset>` を用いる事ができない場合は `role="group"` を付与する。
この場合ラベルは `aria-describedby`になる。

### 見出し

HTML5.2から `<legend>` で見出しを作る事が許容されるようになった。
サンプルコードを見るとこのようになっている。

```html
<fieldset>
  <legend><h2>xxx</h2></legend>
<fieldset>
```

### 非アクティブコンテンツ

タブキーで移動できない要素を見落としてしまう事がある。
フォーカスできない要素を補足するのに適した方法はコントロールに `aria-describedby` を使う事である。

```html
<input type="checkbox" aria-describeby="gender_male" id="male">
<label for="male">...</label>
```

過度なスクリーンリーダーの読み上げは精神障害の人にストレスになる事もある。
またヘッダーや段落など操作できない要素似全て `tabindex="0"` を付与すると混乱を招く原因になる。

labelでラップすると `for` 属性の必要がなくなる。
しかしこれらは、チェックボックスなどのためのマウスのクリック領域が広がってしまう事と、スクリーンリーダーでブラウザごとにバグがあり正しく動作しない。

```html
<label>
    name
    <input type="text">
    please enter your full name.
<label>
```

このため `<label>` と要素を分離し `for` を付ける事を推奨する。

### バリデーションエラー

エラーのある要素にフォーカスする：スクリーンリーダーがその項目についてアナウンスするため良いアプローチ。
下記のようなHTMLでバリデーションエラーがある際にその項目にフォーカスするのが良い例とされている。

```html
<fieldset>
  <legend>Gender></legend>
  <div>
    <input id="gender_male" type="radio">
    <label for="gender_male">Male</label
  </div>
  <p id="gender_description" class="error">Please tell us your gender!</p>
</fieldset>
```

フォームと離れた場所にエラーを表示する例。
説明が記載している箇所を `aria-describedby` で表明している。
またこのフォームでもバリデーションエラーの際にその項目にフォーカスしている。
このようにすると、どの項目でエラーが発生したのか、またAnchorを利用してその項目に簡単に移動する事ができる。

```html
<fieldset>
  <legend>Errors</legend>
  <a href="#name" id="name_description" class="error">Please enter your name</a>
</fieldset>

<form>
  <div>
    <label for="name">name</label>
    <input id="name" type="text" aria-describedby="name_description">
  </div>
</form>
```

例えばこれに "There are three errors." などテキストを表示して、さらにそのテキストに `tabindex="0"` を追加するとより便利なものになる。

エラーメッセージにも気を付ける事。「入力形式が正しくありません」よりも「YYYY/MM/DD形式で入力してください」のほうがはるかに有用。

### Required(*)

多くのスクリーンリーダーは特殊文字を無視するため、必須である事を "*" で表現すると手がかりが見つからなくなってしまう。

ARIAによる解決：
必須である事を `aria-describedby` で表明し、読み上げに紛らわしい `*` は `aria-hidden` で無視させる。
しかしこれにはスクリーンリーダーのフォーカスモードで `aria-hidden` が無視されてしまうという弱点がある。

```html
<input aria-describedby="required-description" type="text" name="name">

<p id="required-description">
  <span aria-hidden="true">*</span>
  Required field
</p>
```

HTMLによる解決：
紛らわしいアスタリスクをスクリーンリーダーから隠す事ができる。
`focusable` IE独自の属性らしい。 `tabindex="-1"` としてもフォーカスされてしまうためこれを避けるための属性らしい。

```html
<label for="name">
  FullName
  <svg class="required" focusable="false"><!-- アスタリスクの画像 --></svg>
</label>

<input id="name" type="name">
```

どの項目にフォーカスが可能なのか調べるこんなライブラリもある。
https://allyjs.io/index.html

HTMLによる解決２：
`required` 属性は正しいHTMLの使い方。
ただしスクリーンリーダーの動作が不安定な事と、ブラウザが標準で出すメッセージが説明に乏しいため、hiddenなテキストを用いたほうがより親切。

```html
<input id="name" type="name" require>
```

### HTML5のバリデーション

- implicit
  - `type="email"` などのバリデーション
- explicit
  - `requied` `pattern` などのバリデーション
  
フォームの送信ボタンを押した時、ブラウザが無効な項目にフォーカスを当ててくれるメリットもある。
ただしHTML5のエラーを読み上げるスクリーンリーダーもあればそうでないものもあり、完全に利便性を提供するものではない。

`pattern` にはその内容を説明する `title` を用いると良い。

```html
<input id="password" pattern="..." requierd="" title="Minimum 6 characters containing lowercase, uppercase...">
```

`aria-required` `aria-invalid` などHTML5を補足するARIAも存在するが、HTML5でシンプルに実装する方を推奨する。
クライアントサイドのHTML5によるバリデーションが不要、かつスクリーンリーダーのユーザーにバリデーションエラーを伝えたい時はARIAを用いると良い。

### テーブル内のコントロール

しばしばテーブルの中でチェックボックスやテキスト入力を受け付けたい事がある。
データが表形式でないケースではテーブルを用ないようにする事。

テーブル内のコントロールはタブキーによってフォーカスできる。
これらには `<label>` でラベル付けができる。

```html
<td>
  <label class="visually-hidden" for="post_comment">Comment</label>
  <textarea id="post_comment"></textarea>
</td>
```

ARIAを用いるとこうなる：
HTML構造を用いたlabelを使った例に比べ、スクリーンリーダーの読み上げは不安定になる。
そのためHTMLによる解決のほうが推奨されている。

```html
<tr>
  <th id="comment_header">
<tr>
<tr>
  <td>
    <textarea aria-describedby="comment_header"></textarea>
  </td>
</tr>
```

## Widget

HTMLで実現できないパーツを「ウィジェット」として定義する。
アクセシビリティ上はウィジェットを「POC: Proof of concepts」として呼んでいる。

### tooltip

W3CのドキュメントでWidgetとして定義されている。
https://www.w3.org/TR/wai-aria-practices/#tooltip

- 表示・非表示は `hidden` 属性で表現する事
- エスケープキーで非表示になる事
- 冗長な情報である場合は `aria-hidden` を使ってスクリーンリーダーから隠す
- ツールチップのトグルには `aria-expanded` を用いて拡張する事を通知する

下記の例ではホバーでなくクリックによってツールチップを表示している。
ツールチップ内のコンテンツにはタブキーで移動する事ができるため、詳細情報のリンクなどにアクセスする事ができる。
https://www.accessibility-developer-guide.com/examples/widgets/tooltips/_examples/manually-displayed-tooltip/

### tablist

W3C仕様
https://www.w3.org/TR/wai-aria-practices/#tabpanel

radioを用いたタブリストの例
https://www.accessibility-developer-guide.com/examples/widgets/tablists/_examples/tablist-with-radio-buttons/

- アクティブ・非アクティブを明確にする事
- `input type="radio"` を用いてタブリストを作成すると堅牢
  - 状態が変わるたびにスクリーンリーダーがその状態を通知する
- タブリストにフォーカスがある時、矢印キーでの移動が可能


Carousel/Accordion等、ここから先はスキップ。
実装する時にW3C仕様と重ねてキーボード操作などフォールバックを設定すれば良いと思われるので。

## Sensible ARIA usage

### Label

スクリーンリーダーの読み上げ：Google. Link.

```html
<a href="...">Google</a>
```

スクリーンリーダーの読み上げ：No Bing!. Link.

```html
<a href="..." aria-label="No,Bing!">Google</a>
```

スクリーンリーダーの読み上げ：No Bing!.

```html
<a href="..." aria-labelledby="bing">Google</a>

<div id="bing" class="visually-hidden">No,Bing!</div>
```

`aria-label` はテキスト検索の対象にならない。
`aria-labelledby` を通して検索される。
またフォーカスモードで読み上げられるかなど、ブラウザ間で挙動が異なる。

HTML標準のラベリング機能を使う事が推奨される

- `<button>ここがラベル</button>`
- `<img alt="ここがラベル">`
- `<table><caption>ここがラベル</caption></table>`
- `<label for="...">ここがラベル</label>`
- `<h1>ここがページのラベル</h1>`

視覚的に表示されているラベルより、スクリーンリーダー向けにより詳細な情報提供が必要な場合はARIAを用いたラベリングが有効なケースがある。

```html
<button aria-label="opens a high resolution version">Zoom</button>
```

しかしARIAを用いて限定的なユーザーに情報を表示するより、すべてのユーザーに情報提供するほうが有効。
たとえばtooltipを用いた補足情報など。

### Describedby

スクリーンリーダーの読み上げ：The world's best known search engine.Link.

```html
<a href="..." aria-describedby="description">
  Google
</a>

<div id="description" class="visually-hidden">
  The world's best known search engine
</div>
```

`aria-describedby` はスペース区切りで複数設定する事もできる。

```html
<a href="..." aria-describedby="description description2">
```

- `aria-describedby` はフォーカスモードでのみ動作するため、非フォーカス要素に設定しても意味がない
- 一部のスクリーンリーダーはキーボード操作しないと内容が読み上げられないため煩雑
- `aria-describedby` の説明テキストはテキスト検索の対象にならない

このため通常のHTML要素には用いず、インタラクティブな要素（バリデーションエラーなど）に用いるのが推奨。

### Expanded

意味論として `aria-expanded` は現在の状態とその切替ができる事を通知する適した選択である。

スクリーンリーダーの読み上げ：Toggle. button collapsed.
（状態が変更されるとスクリーンリーダーがそれを通知する）

```html
<button aria-expanded="false">
  Toggle
</button>
```

似たようなものに `aria-haspopup` がある。

スクリーンリーダーの読み上げ：Toggle. button has menu.
しかしこれはスクリーンリーダーが状態の変更を通知しない。JSで `aria-haspopup="false"` を設定しても意味がない。
したがって `aria-expanded` との併用を推奨する。

```html
<button aria-haspopup="true">
  Toggle
</button>
```

- tooltip, accordions, autocompletes, dropdowns, dialogs などに `aria-expanted` を用いるのは有用
- トグル機能を持つ要素と近い位置に設定する
- 状態が切り替わった時に最初の要素にフォーカスする
- ページの更新機能を持つ要素には設定しない
  - open/close状態のトグルボタン： `aria-expanded` を使うべき
  - refreshボタン：使わない
- チェックボックスがこの代替となるため、その使用も検討する事

### Pressed

例えば「再生」「一時停止」などアクティブな状態に意味を持つ要素がある。
そのようなケースでは `aria-pressed` が適した選択といえる。

スクリーンリーダーの読み上げ：Toggle. Button not pressed.
JSでtrueに変更されると、スクリーンリーダーで変更が通知される。

```html
<button aria-pressed="false">
  Toggle
</button>
```

- チェックボックスがこの代替となるため、その使用も検討する事

似たような属性として `aria-selected` がある。
こちらは特定のロール（`role="tablist"` など）と一緒に使用する条件がある。

また何らかを拡張する機能を持つ要素は `aria-expanded` を使用する事。

### Current

スクリーンリーダーの読み上げ：Home. Link Blog. Current link.

```html
<ul>
  <li><a href="...">Home</a></li>
  <li><a href="..." aria-current="true">Blog</a></li>
  <li><a href="...">Shop</a></li>
  <li><a href="...">Contact</a></li>
</ul>
```

`aria-current` にはboolean値以外にも `page（現在のページ）` `step（現在のプロセスにおけるステップ）` `location（コンテキストにおけるカレント）` などさまざまな値が設定できる。
スクリーンリーダーによって `aria-current="true"` と `aria-current="false"` に違いがないなどの問題も存在する。（このケースでは属性を削除するほうが望ましい）

そしてかなりスクリーンリーダー上も最近対応が始まったばかりのため、古いスクリーンリーダーでは対応していない事もある。

`aria-current` はアクセシビリティ的にも非推奨。

スクリーンリーダー用のラベリングと `visually-hidden` を使って視覚的にそれを隠す方法が推奨されている。

```html
<li>
  <span class="visually-hidden">Currnet page:</span>
  Element
</li>
```

### Hidden

`aria-hidden` を使うと視覚的に要素を残したまま、スクリーンリーダーの読み上げを無視させる事ができる。

スクリーンリーダーの読み上げ：なし

```html
<p aria-hidden="true">
  Hello
</p>
```

またその子要素にも特性が引き継がれる。

```html
<p aria-hidden="true">
  Hello
  <p aria-hidden="false">falseにしても意味がない</p>
</p>
```

- フォーカス可能な要素に指定してはいけない
- `aria-describedby` で参照された要素は `aria-hidden` を用いても非表示にならない
  - スクリーンリーダーのブラウザモードとフォーカスモードで挙動に違いがある

そもそも限定的なユーザーだけに隠すという事が良いのかどうか、ソリューションを見直す事。

### Presentation

何らかの理由で要素を削除する場合に `role="presentation"` を用いる事ができる。
そしてこれはIEでは機能しない。

スクリーンリーダーの動作：この要素に移動できない。

```html
<a role="presentation">
  Hello folks!
</a>
```

また `role="presentaion"` は意味論上から要素を削除するだけで、要素はそのまま残る。
例えば上記の `<a>` の例ではスクリーンリーダーの読み上げでは無視されるが、フォーカス可能でありクリックするとリンクを開く事ができる。

HTML標準の要素を使ってページを構成する事、`role="presentaion"` はエッジケースでごくわずかに必要とされるだけである。

### Alert

`role="alert"` は新しく追加された要素のコンテンツを強制的にアナウンスする事ができる。
ユーザーが閲覧中のコンテンツを何度も中断するため、乱発によって不快なものとなる可能性がある。
別タブでブラウジングしている場合でもスクリーンリーダーによって通知されてしまう。

またFireFoxではアラートの代替としてpoliteなどの機能を用意しているが、スクリーンリーダーの対応が追いついていない。

`role="alert"` はユーザーアクションの即座な変更を通知するに留めるべき。
例えばTを入力した時に「検索結果が2件にフィルタされました」など。

おわり。
