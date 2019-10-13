# Global packages のアップデート

http://npm.github.io/using-pkgs-docs/working-with-packages/updating-global-packages.html

個別のグローバルパッケージのアップデート

```bash
$ npm install -g <package>
```

全てのグローバルパッケージのアップデート

```bash
$ npm update -g
```

```bash
# アップデートが存在する
/usr/local/bin/ng -> /usr/local/lib/node_modules/@angular/cli/bin/ng
/usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
/usr/local/bin/npx -> /usr/local/lib/node_modules/npm/bin/npx-cli.js
/usr/local/bin/parcel -> /usr/local/lib/node_modules/parcel-bundler/bin/cli.js

> fsevents@1.2.9 install /usr/local/lib/node_modules/@angular/cli/node_modules/fsevents
> node install

node-pre-gyp WARN Using needle for node-pre-gyp https download 
[fsevents] Success: "/usr/local/lib/node_modules/@angular/cli/node_modules/fsevents/lib/binding/Release/node-v67-darwin-x64/fse.node" is installed via remote

> parcel-bundler@1.12.4 postinstall /usr/local/lib/node_modules/parcel-bundler
> node -e "console.log('\u001b[35m\u001b[1mLove Parcel? You can now donate to our open collective:\u001b[22m\u001b[39m\n > \u001b[34mhttps://opencollective.com/parcel/donate\u001b[0m')"

Love Parcel? You can now donate to our open collective:
 > https://opencollective.com/parcel/donate
 + parcel-bundler@1.12.4
 + @angular/cli@7.3.9
 + npm@6.12.0
 added 31 packages from 14 contributors, removed 68 packages and updated 154 packages in 31.558s
 ```

 ```bash
# 出力なし 
 ```
