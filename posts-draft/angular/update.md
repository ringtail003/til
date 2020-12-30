# `@angular/core`

## v10.1

RC版の内容はng-japan onAir Volume 24を参照。

- TS4.0対応
- routerLinkをaltキー押しながらクリックした時のバグ修正
  - Chromeだとダウンロード
  - Angularはハンドルせずブラウザに投げる
  - 制御キーを押した時にaltだけ対応が漏れてたけど今回のバグ修正で治った
- `@types` の型が壊れるバグ修正

## v11

- BC: formのasync validator
  - 最初のemitのバグ修正
  - emitの回数が1回増える
  - skiponeとかやらなきゃいけないかも（RxJS？）
- BC: RouterReuseStrategyの引数が順番が間違ってた
- BC: Date pipe
  - stringからdateに変換する時にミリ秒を切り捨ててなかった
  - 23:59が翌日に繰り上がるバグだった
- BC: navigateByURL
  - 第2引数が消える（今まで書いても動かなかった）
  - 正しくは第1引数のパスを使う
  - ng updateしたら消しましたよのコメントが残る
- BC: Pipe全般
  - 厳格に型付けされるようになった
  - コンパイル落ちるかも
- BC: platform-webworker
  - 消える
- BC: IE9,10,mobile
  - サポートから消える
  - AngularのCIから消えるので検証は自分たちでやってね、の意味
  - ポリフィルとかもサポートされなくなる
- feat: routerLink
  - 相対パスの解釈には2通りある（legacy,corrected）
  - デフォルトの値が変わるのでng-updateすると `relativeLinkResolution: legacy` が差し込まれる
  - v13でlegacyがなくなるので（たぶん）それまでに移行してね

# CLI

## v11

- ng-serve
  - 4200ポートが埋まってたら別のポートを使いますか？を聞いてくれるようになる
- reporter
  - karma-istanbul-reporterからkarma-coverageに置き換わる
  - ng-updateで置き換わる
- karma
  - karmaのコンテキストをそのまま出力してたのがファイルパスに変わる
  - `foo/src/app/app.component.spec.ts:22:1` みたいな
- sass
  - node-sassが非推奨なのでwarningが出るようになる
  - 明示的に入れてなければsassのはず
  - ShadowDOMのピアッシングにnode-sassに使ってたかも ★
- i18n
  - ローカライズに$localizeを使うようになる
  - 前のやつはviewEngine, $localizeはivy
  - ivyがデフォルトになる
- angular.json
  - パスが相対パスじゃなくルートからの絶対パスになる 
  - `../node_modules/dist/bootstrap.css` が `bootstrap/dist/bootstrap.css` で書けるようになる
- hmr
  - hmrがゼロコンフィグ（=out of box）になる
  - ng serve にhmrのオプションがあったけどアプリケーション側のコードにも準備が必要だった
  - アプリ側のコードが不要になった
  - ng serveのオプションは必要
- ng-update
  - allオプションが消える
  - 今まではyarnとかnpmとか勝手にアップデートしてくれてたけど事故るから
  - allオプションが来たら警告が出る（yarnのinteractive使ってねとか）
- strict
  - 緩和
  - no-anyをやめる
  - 返り値の `:void` とか入れてたのが要らなくなる
- IE9,10
  - browserslistから消える
