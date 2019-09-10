https://parceljs.org/typeScript.html  
サッとTypeScript書いて試したい時に便利。

# parcel

作業ディレクトリ作成も含め9コマンドで完了。
グローバルインストールに1分くらいかかるけど、追加のパッケージインストールが不要なので高速。
TypeScriptのコード書くまで1分弱。

```bash
% npm install -g parcel-bundler
/usr/local/bin/parcel -> /usr/local/lib/node_modules/parcel-bundler/bin/cli.js

> fsevents@1.2.9 install /usr/local/lib/node_modules/parcel-bundler/node_modules/fsevents
> node install
...

Love Parcel? You can now donate to our open collective:
 > https://opencollective.com/parcel/donate
+ parcel-bundler@1.12.3
added 812 packages from 552 contributors in 67.082s
% mkdir learn-parcel
% cd learn-parcel/
% npm init -y
Wrote to {WORK_DIRÂ}/learn-parcel/package.json:

{
  "name": "learn-parcel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

% touch index.html
% touch index.ts
% code .
# index.html
#<html>
#  <body>
#    <script src="./index.ts"></script>
#  </body>
#</html> 

# index.ts
# console.log('hello world');
% rehash
% parcel index.html
Server running at http://localhost:1234 
✨  Built in 3ms.
^C
```

# webpack

configurationのための対話的インターフェース、TypeScriptのための追加のパッケージインストール、設定追加などでやや時間がかかる & 設定ミスりがち。
TypeScriptのコード書くまで10分弱。

```bash
% npm init -y
Wrote to /Users/matsuoka/work/package.json:
...
% npm i webpack webpack-cli
...
added 453 packages from 237 contributors and audited 5286 packages in 26.498s
found 0 vulnerabilities

% npx webpack init
The command moved into a separate package: @webpack-cli/init
Would you like to install init? (That will run npm install -g @webpack-cli/init) (yes/NO) : yes
...
added 1129 packages from 679 contributors in 86.477s

ℹ INFO  For more information and a detailed description of each question, have a look at: https://github.com/webpack/webpack-cli/blob/master/INIT.md
ℹ INFO  Alternatively, run "webpack(-cli) --help" for usage info

? Will your application have multiple bundles? No
? Which will be your application entry point? src/index
? In which folder do you want to store your generated bundles? dist
? Will you use one of the below JS solutions? ES6
? Will you use one of the below CSS solutions? No
 conflict package.json
? Overwrite package.json? overwrite
    force package.json
   create src/index.js
   create README.md
...
added 366 packages from 235 contributors, removed 1 package, updated 11 packages and audited 10312 packages in 30.633s

Congratulations! Your new webpack configuration file has been created!
You can now run npm run start to run your project!

% npm install --save-dev typescript ts-loader
npm WARN work@1.0.0 No repository field.
...
added 9 packages from 21 contributors and audited 10348 packages in 4.023s

% tsc --init
% code .
# https://webpack.js.org/guides/typescript/ の設定を書き写す
# document > tsconfig.json
# document > webpack.confif.js
% npm start
Time: 7020ms
                       Asset       Size  Chunks             Chunk Names
                  index.html  201 bytes          [emitted]  
main.252eb1f2c9accc56b7bb.js    360 KiB    main  [emitted]  main
Entrypoint main = main.252eb1f2c9accc56b7bb.js
```
