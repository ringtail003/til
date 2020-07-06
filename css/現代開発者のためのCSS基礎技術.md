https://qiita.com/arowM/items/e1af320e2755461649a0

# em,rem,vh,vh

https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Values_and_units

- `em` 親要素のフォントサイズ
- `rem` ルート要素のフォントサイズ

```html
<ul>
  <li class="first">
    <ul>
      <li class="second">
        <ul>
          <li class="third"></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

```css
// ルート要素が 10px の時
// first: 20px
// second: 40px
// third: 80px
li { font-size: 2em };
```

```css
// ルート要素が 10px の時
// first: 20px
// second: 20px
// third: 20px
li { font-size: 2rem };
```

- `vw` ビューポートの幅の1%
- `vh` ビューポートの高さの1%

> ビューポートとは

`<meta name="viewport" content="width=360,initial-scale=1">`

レンダリングのための仮想領域のようなもの。上記なら幅360pxで初期倍率1となる。
initial-scaleを変更した場合、ブラウザやデバイスは自身の表示領域に合わせてビューポートを調整するため、おまじないのように1にしたほうが良い。
デバイスごとはメディアクエリで切り替える。
> 
> https://qiita.com/ryounagaoka/items/045b2808a5ed43f96607

# flexbox

// TBA

# CSSグリッドレイアウト

// TBA

# WAI-ARIAを使って要素の状態を表す

// TBA

# カスタムデータ属性

これはフレームワークの attribute のバインドでできるのでは？
`data-` を使わなくても良さそう。

# リセットCSS

ブラウザごとの初期状態を揃えるために定義するもの。
https://github.com/hankchizljaw/modern-css-reset/blob/master/dist/reset.css

そもそも CSS が当たっていない初期状態はブラウザごとに異なり UA stylesheet と呼ばれる。
https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css


# ノーマライズ・サニタイズCSS

// TBA

# 他

CSS in JS、Scoped CSS、CSS Modules
