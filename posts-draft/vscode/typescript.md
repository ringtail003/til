# バージョン切り替え

https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions

* [Cmd + ,] で設定を開く
* `tsdk` で検索
* `Edit in setting.json`

グローバルの typescript を使用する

```json
{
  "typescript.tsdk": "/usr/local/lib/node_modules/typescript/lib"
}
```

プロジェクト内にインストールされた typescript を使用する

```json
{
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

code 再起動。
