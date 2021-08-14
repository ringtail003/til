---
title: HTML Tips
description: HTMLで使えそうなやつ
tags: html tips
updatedAt: 2021-07-26
published: true
---

# HTML標準で表示されるバリデーションのメッセージをカスタム

<img width="250" alt="スクリーンショット 2021-07-26 21 56 52" src="https://user-images.githubusercontent.com/15980747/126992341-943ab420-3a7b-4fd1-9349-ae3a45a98ad5.png">

```html
  <form>
    <input type="email" id="mail" name="mail">
  </form>

  <script>
  const email = document.getElementById("mail");

  email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("I am expecting an e-mail address!");
    } else {
      email.setCustomValidity("");
    }
  });
  </script>
```

# `input type="date"` のバリデーション状態をspanに表示

<img width="250" alt="スクリーンショット 2021-07-26 22 01 35" src="https://user-images.githubusercontent.com/15980747/126992931-667c7782-403a-42aa-ba47-9eadcf5c60d9.png">

```html
<input type="date" id="bday" name="bday">
<span class="validity"></span>
```

```css
input:invalid+span:after {
  content: '✖';
  padding-left: 5px;
}

input:valid+span:after {
  content: '✓';
  padding-left: 5px;
}
```

# `input type="image"`

```html
<!-- 画像ボタン -->
<input type="image">

<!-- 年月日時刻（0000/00/00 00:00） -->
<input type="datetime-local">

<!-- 年月入力（0000年00月） -->
<input type="month">

<!-- 時刻（00:00） -->
<input type="time">

<!-- 0000年第00週 -->
<input type="week">

<!-- スライダー -->
<input type="range">

<!-- バリデーション付きURL -->
<input type="time">
```

https://developer.mozilla.org/ja/docs/Web/HTML/Element/input

# `input.indeterminate` チェックボックスの不確定状態

Chromeだと `-` の見た目になる。

```html
<input id="indeterminate" type="checkbox">

<script>
	document.querySelector("#indeterminate").indeterminate = true;
</script>
```

# input readonly

見た目は変わらないがコントロールが変更を受け付けなくなる

```html
<input readonly>
```

# meter

読み取り専用のスライダーみたいなやつ。
low以下だと赤、optimumを超えるとグリーンに変わる。

<img width="319" alt="スクリーンショット 2021-07-27 23 05 09" src="https://user-images.githubusercontent.com/15980747/127168167-e89a819d-6d4d-4c2a-86dd-144fce4f257c.png">

```html
<meter id="fuel"
       min="0" max="100"
       low="33" high="66" optimum="80"
       value="80">
    at 50/100
</meter>
```
