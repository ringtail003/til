---
title: Accessibility Tips
description: アクセシビリティの使い方メモ
tags: html tips
updatedAt: 2021-07-26
published: true
---

# Abbr

```html
<label for="name">
  <span>Name: </span>
  <strong><abbr title="required">*</abbr></strong>
</label>
```

# アニメーションを減らす

設定 > アクセシビリティ > ディスプレイ > 視覚効果を減らす（macOS）のチェックのオンオフによってアニメーションをスイッチする

```html
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

/* 視覚効果を減らす：オン */
@media (prefers-reduced-motion: reduce) {
  .animation { animation: none; }
}
/* 視覚効果を減らす：オフ */
@media (prefers-reduced-motion: no-preference) {
  .animation {
    animation: 3s linear 2s infinite alternate fadeIn;
  }
}
</style>
```
