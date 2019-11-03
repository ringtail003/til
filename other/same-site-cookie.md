この警告が何なのか調べたメモ。

```
A cookie associated with a cross-site resource at <URL> was set 
without the `SameSite` attribute. A future release of Chrome will only deliver
cookies with cross-site requests if they are set with 
`SameSite=None` and `Secure`.
```

# セキュリティに関するCookieのフラグ

```
Set-Cookie: id=hoge; Secure; HttpOnly; SameSite=Strict;
```

## Secure

HTTPSプロトコルを通じたリクエストのみでサーバーに送信される。

## HttpOnly

JavaScriptのAPI（Document.cookie）からアクセスする事ができない。
セッションを維持するためのCookieなどはJavaScriptから操作する必要がないのでHttpOnlyフラグを設定するべき。

## SameSite

### SameSite=Strict

Cookieを発行したサイトにのみ送信する。

### SameSite=Lax

Top Level Navigation（アドレスバーに表示されているURLの変更が伴う遷移）かつGETであればクッキーを送信する。またドメイン間のアブリクエスト（画像やフレームの読み込み）でも送信する。

### SameSite=None
 
従来どおり、セキュリティを考慮しない一番緩い指定。

# Example

request type | example code | cookies sent
--- | --- | --- 
link | `<a href="…">` | normal, lax
prerender | `<link rel="prerender" href="…">` | normal, lax
form get | `<form method="get" action="…">` | normal, lax
form post | `<form method="post" action="…">` | normal
iframe | `<iframe src="…">` | normal
ajax | `$.get('…')` | normal
image | `<img src="…">` | normal

# 冒頭の警告

Chromeの特定のバージョンからSameSite指定がない場合にLaxとして振る舞うようになったため、ある日突然警告が出るようになった。Cookieの送信先はGoogleタグマネージャを利用したトラッキング用のWEBサイト。

- `v76〜` same-site-by-default-cookiesフラグが使えるようになる
- `v80〜` SameSite=Laxがデフォルトになる


# WEBサイト側の改善

1. Cookieを全てSameSite=Strictに
  - 既存のWEBサイトを全て改修する必要があるため現実的ではない
2. Cookieの用途を分割し部分的にSameSite=Strictを適用（RFCの提言）
  - Read: ログイン状態などセッション維持のために使用し副作用を持たない
  - Write（Strict）: パスワード変更・投稿・購入など副作用を持つ
3. GETリクエストに副作用を持たせない
  - SameSite=Laxでの安全性を高める

# Google Tag Managerのワーニング対策

https://support.google.com/tagmanager/thread/18224991?hl=en

# 参考サイト

- [Cookie の性質を利用した攻撃と Same Site Cookie の効果](https://blog.jxck.io/entries/2018-10-26/same-site-cookie.html)
- https://www.sjoerdlangkemper.nl/2016/04/14/preventing-csrf-with-samesite-cookie-attribute/
- [Cookie の SameSite=Lax をデフォルトにする提案仕様](https://asnokaze.hatenablog.com/entry/2019/05/09/005513)
- [HTTP Cookie | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies)
- [Chrome Platform Status](https://www.chromestatus.com/feature/5088147346030592)
