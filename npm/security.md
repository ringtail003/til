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