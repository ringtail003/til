# npm binの上書き問題

https://snyk.io/blog/understanding-filesystem-takeover-vulnerabilities-in-npm-javascript-package-manager/

package.jsonの `bin` 指定によりバイナリが `/usr/local/bin` に展開される（Macの場合）。
（どこに展開されるのは `npm bin --global` で調べられる）
これはShebangと同じインタプリタである。

> **Shebang** シバン、シェバン
> 実行するインタプリタを指定する `#!/usr/bin/` みたいなやつの事

`npm install -g {package}` はすでに存在する `/usr/local/bin` を上書きする事ができる。
これは `--ignore-scripts` オプションを指定する事で（たぶん）避けられる。

npm,yarn,pnpmでも同じ問題が発生するためアップデートする事。

- npm < v6.13.4
- yarn < v1.21.1

> **pnpn** npm高速化のために開発されたパッケージマネージャっぽい

# セキュリティのためのベストプラクティス

https://snyk.io/blog/ten-npm-security-best-practices/

## 1. Avoid publishing secrets to the npm registry

`npm publish` した時の非公開ファイルはどのように決定されるのか？

1. `.gitignore` npm cliはここに書かれたファイルをtarに含めない
2. `.npmignore` (1) より優先される
3. `package.json` の `file` (2) より優先される

(1)(2)はブラックリスト方式、(3)はホワイトリスト方式。
`publish --dry-run` で公開されるファイルを確認したほうが良い。

## 2. Enforce the lockfile

ロックファイル使おうね、って話。
`npm ci` と同じやつがyarnにもあるらしい。

## 3. Minimize attack surfaces by ignoring run-scripts

npm-scriptsを悪用したケースの話。

- 盲目的にアップデートしない
- アップデート前にchangelogを確認する
- サードパーティのパッケージによるスクリプトを無効にする `--ignore-scripts` を利用する
- `.npmrc` に `ignore-scripts` を追加する事を検討する
  - `npm config set ignore-scripts true`

## 4. Assess npm project health

`npm outdated` で古いパッケージを検出できる。

`npm doctor` でCLIの健全性をチェックする。

- パッケージのリポジトリにアクセス可能か
- gitが有効か
- permissionチェック
- チェックサムの正確性？

## 5. Audit for vulnerabilities in open source dependencies

脆弱性のスキャン。依存ツリーを辿って脆弱性を検査しレポート & パッチ適用してくれる（？）らしい。

```bash
npm install -g sync
sync test
```

監視と開発ライフサイクルを結びつけておく必要がある。syncをGitHub/GitLabなどに統合するなど。

sync CLIツールでプロジェクトのスナップショットを監視する事もできる。

```bash
sync monitor
```

`npm audit` と何が違うのか？
syncは独自に脆弱性のデータベースを持っているらしい。CVE（npmの脆弱性報告？）にないものも検出できる。

## 6. Use a local npm proxy

`npm install` を実行した場合npmのメインレジストリと通信を開始する。
レジストリは設定で変更する事もできる。

```bash
npm set registry # デフォルトのレジストリのセット
npm set registry --registry # single registry
```

プライベートリポジトリはverdaccioで簡単に準備できる。

## 7. Responsibly disclose security vulnerabilities

セキュリティの問題を見つけた時はsyncに報告してください。
https://snyk.io/vulnerability-disclosure/

## 8. Enable 2FA

2017/10にnpmは二段階認証のサポートを公式アナウンスした。
下記コマンドで簡単に二段階認証を有効にできる。

```bash
npm profile enable-2fa auth-and-writes
```

ログインのみ二段階認証を有効にしたいのであればオプションを変更する。

```bash
npm profile enable-2fa auth-only
```

## 9. Use npm author tokens

npmでログインする度にユーザーのトークンが生成されnpmレジストリに対する認証が行われる。
`npm token create` でトークンをCLIから作成できる。

```bash
# IPv4の範囲を指定したトークン作成
npm token create --read-only --cidr=192.0.2.0/24

# トークンの確認
npm token list

# トークン削除
npm token revoke
```

## 10. Understand module naming conventions and typosquatting attacks

Typosquatting ユーザーのミスから引き起こされる。一般的なモジュールによく似た名前でnpmレジストリに悪意のあるモジュールが公開される事がある。

- npmレジストリと見比べてインストールするパッケージ名が合っているか確認
- `npm info` でメタデータ（コントリビュータ、最終バージョン）を確認できる
- `npm i {package} --ignore-scripts` のようにすると悪意のリスクを軽減する事ができる

## memo

セキュリティチェック

- npm audit
- [syncデータベース](https://snyk.io/vuln)
- [Renovate](https://renovate.whitesourcesoftware.com/) で自動アップデートとか
- [syncでローカル監査](https://snyk.io/test/)
