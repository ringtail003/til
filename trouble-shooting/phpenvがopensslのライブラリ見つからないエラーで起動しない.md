これ。

```sh
> php -v                                                                                                                                                                                                                                                                22:28
dyld: Library not loaded: /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib
  Referenced from: /usr/local/bin/php
  Reason: image not found
zsh: abort      php -v
```

# やってダメだった事

openssl再インストール。

```sh
brew uninstall --ignore-dependencies openssl
brew install openssl
```

zshrcのopensslのパス消してみるとか。
そもそもphpがどのバージョンのopensslを要求しているのかよく分からない。

リンク貼り直してみるとか。

```sh
brew link openssl
```

そもそもopensslのバージョンいくつが入ってるのか？

```sh
openssl version
LibreSSL 2.8.3
```

LibreSSLとはなんぞ？？
High Sierra あたりからデフォルトで使われるオープンソースのTLS/SSL実装？らしい。

# 解決できた

https://stackoverflow.com/questions/59006602/dyld-library-not-loaded-usr-local-opt-openssl-lib-libssl-1-0-0-dylib

```sh
ls -al /usr/local/Cellar/openssl

> 1.0.2r
> 1.0.2s

# バージョンが2個あったので新しいほうから試した
brew switch openssl 1.0.2s

# いけた...
php -v
PHP 7.3.4 (cli) (built: Apr 19 2019 00:20:56) ( NTS )
```

# また何かでた

```sh
phpenv install 7.1.3

-----------------------------------------
configure: error: Please reinstall the libcurl distribution -
    easy.h should be in <curl-dir>/include/curl/
-----------------------------------------
```

libcurlというformulaはなく curl もしくは curl-devel っぽい。

https://formulae.brew.sh/formula/curl

`Formula code on gitHub` のリポジトリをtapすればインストールできる？？

> https://github.com/Homebrew/homebrew-core

このリポジトリ（というのか？）はデフォルトのよう。

https://peixe.biz/diary/20190729.html

これだ。もう分からん。
