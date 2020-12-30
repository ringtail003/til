# グローバルのngコマンドをアップデートしたはずなのに古いままだった問題

ngコマンドアップデート。

```bash
npm i -g @angular/cli@next
# 9.0.0-rc.10
# ※2(nvm)が更新される
```

バージョン確認したらなんか古い。

```bash
ng --version
> Angular CLI: 8.3.12
# ※1(zshのbin)を見てる
```

zshのngコマンドの向き先を変える。

```bash
which ng
> /usr/local/bin/ng

rm /usr/local/bin/ng
ln -s ~/.nvm/current/bin/ng /usr/local/bin/ng
```

グローバルインストールしたパッケージを見るようになった。

```bash
ng --version
> Angular CLI: v9.0.0-rc10
```

## 参考

npmのグローバルパッケージのインストール先

```bash
npm root -g
> /Users/matsuoka/.nvm/versions/node/v12.13.0/lib/node_modules
```
