# [Angular\(ver\.8\.2\) のページを IE11 に対応させたい話](https://mslgt.hatenablog.com/entry/2019/12/01/000625)

IE11対応。
tsconfigの設定を変更してng serveで読み込むようにする。
Angular8はES2015のコードを出力するためターゲットをes5にしないとIE11では動作しない。
es5のコードを出力するtsconfigを作ってangular.jsonにconfigurationを追加。
`ng serve --configuration {target}` のようにしてカスタムのconfigurationを読み込む。
CSSの対応が遅れているため拡張する必要がある。

# [@capacitor/angularを事例にng addを読む（追記あり）](https://qiita.com/rdlabo/items/646737a6c181ea957248)

Capacitor
静的サイトをラップしてモバイルアプリに変換する。

`ng add` のコードリーディングとカスタムパッケージの追加。

# [@angular/youtube\-player コードリーディング](https://qiita.com/ukyo/items/3edc65834a5c77405d20)

`@angular/youtube-player`
youtube player API。

- `string | null` でなく `string | undefined` を使っている
- `ngZone.run` zone.jsのハンドリング？（このパッケージについては要らなかったっぽい）
- ngOnInitの前に参照される可能性があるObservableに対してstartWithを使う

# [Angularから@ngrx/dataとActiveRecordを使ってRDBにアクセスする（追記あり）](https://qiita.com/FumioYoshida/items/e9b1eaa36b0a94467d1b)

`@ngrx/data`
ストア管理のAction/Reducer/SelectorのFacade的な役割をしてくれる。
キャッシュ付きのCRUD処理ができるっぽい。

# [AngularのライブラリのテストにJestを使ってみる](https://swfz.hatenablog.com/entry/2019/12/07/060932)

schematicが用意されていれば `ng add` だけで使えるようになる。
`ng add` の実行時に既存設定の変更や、新規設定の追加などが走る。

# [Angular Material に追加された google\-maps を使ってみた](https://qiita.com/kjugk/items/b37cae7177fe0ff4bda0)

Angular用 GoogleMap
`@angular/google-maps`
`<google-map>` を配置するだけで簡単に地図表示できる。

# [Nxではじめる Angular \+ NestJS フルスタックWebアプリ開発](https://qiita.com/puku0x/items/9191fb432f4292736c2d)

NestJS
サーバーサイドアプリケーションフレームワーク。
フルスタックWebアプリを構築できる。

`create-nx-workspace` でバックエンド・フロントエンドの両方のアプリが入ったサンプルが起動できる。
API定義は `api-interfaces` フォルダに入っている。

# [【Angular】これからはじめるE2Eテスト（2019）](https://qiita.com/nishiemon/items/d774c17476c9f7d8ad6a)

- e2eテストのためのDOMのノードの識別に `[attr.data-xxx]` を付与する
  - idやclassはデザインの変更で動かなくなる
  - dataを使うのはCypressのBest Practicesの踏襲
- CLIで作成したプロジェクトにある `*.po.ts` はe2e用のページオブジェクト
  - e2eでよく使われるパターン

`ng serve` でAngularを起動しておいて `npx protractor` で実行する。

- protractor.conf.jsのdirectConnectをtrueにするとブラウザのドライバを直接操作する事ができる
  - FireFoxとか
  - IEは動かない
    - セキュリティレベルを変更
    - browserlistでIE11の起動が制限されているためコメントアウト
    - tsconfigの変更（es5で出力）

protractor.conf.jsでmultiCapabilitiesに { `browserName`: 'XXX' }を追加する。
protractorを起動すると設定したブラウザで一斉にe2eテストができる。

# [Predictive Prefetching、PrefetchとGuess\.js、時々、Angular](https://qiita.com/kawakami-kazuyoshi/items/5d8d1db4d1d31d261693)

**dns-prefetch**
ドメインの名前解決を事前に行う。
`<link rel="dns-prefetch" href="//example.com">`

**preconnect**
TCPハンドシェイク、TLSネゴシエーションを事前に行う。
`<link rel="preconnect" href="//example.com">`

WEBPAGETESTで効果を検証できる。CSSやJSにある外部ドメインをリストアップする事ができる。

**prefetch**
まだアクセスしていない別ページのリソースを読み込む。
`<link rel="prefetch" href="assets/images/pic03.jpg" as="image">`
crossoriginポリシーの指定もできる。

**prerender**
読みこんだリソースをキャッシュ上にレンダリング。
`<link rel="prerender" href="second.html">`
1つしか設置できない。

ユーザーが次に訪れるであろうページを予測して読み込ませる難しさがある。
> Analyticsと機械学習で解決するguess.jsというパッケージがある

**@angular-builders/custom-webpack**
webpackの設定拡張用のパッケージ

ビルドするとdist配下にguess.jsが適用されたファイルが出力する。

**angular-http-server**
dist配下のファイルを起点にWEBサーバーを立ち上げる。
