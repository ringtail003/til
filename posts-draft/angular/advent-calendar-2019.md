# [リポジトリを作ってから一行もコードを書かずに GitHub Pages にデプロイまでできる GitHub template を作った話](https://qiita.com/kasaharu/items/d4dd865712f0ed1ce3c5)

## prettierの実行

```bash
npm i -D prettier
```

```javascript
// package.json
"scripts": {
  "prettier": "prettier --write './**/*.{ts,html,scss}'"
}
```

## stylelintの実行

```bash
npm i -D stylelint stylelint-config-standard
```

```
// .stylelintrc
{
  "extends": "stylelint-config-standard",
  "rules": {
    "no-empty-source": null
  }
}
```

```javascript
// package.json
"scripts": {
  "stylelint": "stylelint --fix '**/*.scss|*.css|*.html'"
}
```

## カバレッジ

```javascript
// package.json
"scripts": {
  "test": "ng test --code-coverage",
```

```javascript
// karma.conf.js
coverageIstanbulReporter: {
  thresholds: {
    emitWarning: false, // true:しきい値より低ければ警告、false:しきい値より低ければエラー
    global: {
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100,
    },
  },
}
```

## schematics

CLIコマンドを実行した時にlintとか自動実行する。

```javascript
// angular.json
"schematics": {
  "@schematics/angular:class": {
    "lintFix": true
  },
  "@schematics/angular:component": {
    "style": "scss",
    "changeDetection": "OnPush",
    "lintFix": true
  },
```

## sourceMap

バンドルせずに出力だけする場合はこれでいけるらしい。

```javascript
// angular.json
"build": {
  ...
  "configurations": {
    "production": {
      ...
      "sourceMap": { "scripts": true, "styles": false, "hidden": true, "vendor": true },
    }
  }
}
```

## deploy

angular-cli-ghpages でGitHub Pagesにデプロイできるそう。

```bash
yarn ng deploy --base-href=/ng-basis/
```

# [Angular \+ Firebase で ブログ機能作る時にやったこと](https://qiita.com/ver1000000/items/5420b823c6d98c140e0e)

- Firebaseを使うには firebase @angular/fireを使う
- 無限スクロールの実装 ng-in-viewport

# [はじめてのユニットテストを書く前にモック実装で手が止まってしまわないために](https://qiita.com/shioyang/items/34c123b9e8cd456283c9)

- NgRxのユニットテストは [provideMockStore\(\)](https://ngrx.io/api/store/testing/provideMockStore) を使う
  - reducerを持たない
  - 状態変更する時はstore.setState(nextState)して新しい状態を与える

# [Ivyが単体テストにもたらした恩恵](https://qiita.com/Quramy/items/9650155576bbb43f41bf)

JitコンパイルはcompileModuleAndAllComponentsAsync()を実行する、これが遅い。

Ivy & Aotの有効化：

- tsconfig.jsonに enableIvy: true を記述
- angular.jsonの build architectにて、 aot: true を記述

ユニットテストの実行時間が短縮される。

```
architect
  - build
    - aot: T or F
  - test
    - karma
```

architectとsemanticsの整理：

- build/test: architect（ビルド系サブコマンドの実態）
- generate: schematics（雛形生成系のサブコマンド）

aotを有効化したところでkarma architectには影響を及ぼさない > 相変わらずJiTコンパイルされる。
高速化できるのはIvyのおかげ。Ivyを有効化するとView EngineがRender2からIvy(Render3)になる事を意味する。
View EngineはAngular CoreだけでなくTestBed実体 & 紐づくTesting Compilerの実装もIvy専用のものに差し替わる。
Ivy専用のJitコンパイラはモジュールをキューイングし、取り出しの際に「コンパイル済みのモジュールはスキップする」という実装になっている。
（ = 一度importしたモジュールであれば1回しかコンパイルしない）

## Flywightパターン

同じ値のインスタンスを共有する。インスタンス取得はファクトリを通す。

```typescript
class Value {}

class Factory {
  public readonly static singleton = new Factory();
  public getInstance: () => this.singleton;
  
  private map = new Map();
  public getValue: (key) => {
    this.map.has(key) || this.map.set(key, new Value());
    return this.map.get(key);
  }
}

export function getFactory() {
  return Factory.getInstance();
}
```

# [Angular で jsQR を使ってQRCodeを読み取る](https://nananao-dev.hatenablog.com/entry/angular-jsqr)

TypeScript製QRCode Reader
https://github.com/cozmo/jsQR

`@Viwchild('video')` で撮影した画像を `@ViewChild('canvas')` に埋め込んでjsQR()に渡す。

# [Angularで大きく作ってしまったComponentの再利用性をあげる](https://qiita.com/shuuhei/items/ce4f8e96fd4bc3be99d1)

`@Input` `@Output` が膨れ上がったコンポーネントのリファクタ。

1. Input/Outputを抽象クラスにする
2. 抽象クラスを具象化したクラスをいくつもつくる
3. コンポーネントに抽象クラスをインジェクト

(1)に依存した(3)のコンポーネントのパターンがいくつもある場合に有効。(2)はドメインオブジェクトっぽい作り。

# [AngularでプレーンなMapbox GL JSの開発環境を構築してみた](https://day-journal.com/memo/try-031/)

地図のレンダリング：mapbox-gl
Angular用のラッパー：ngx-mapbox-gl

# [Schematics で Layered Architectureを実現させるライブラリを作って公開してみた話](https://qiita.com/hxrxchang/items/0bd0d268e84150f299d0)

## 前提

レイヤードアーキテクチャでアプリ開発している。

```
- Presentation
  - Presentational Component
  - Container Component
- Application
  - Query
  - Usecase
    - Action > Reducer > State
- Domain
  - Model
- Infrastructure
  - Repository
```

この構造は下記のスライドにインスパイアされてのもの（らしい）
https://speakerdeck.com/kasaharu/classi-angular-night-number-4

PDS：Presentation Domain Separation

AngularではPDSの実現としてコンポーネントとサービスを使ったアプリケーションを推奨しているが、これは「Presentationとそれ以外」の区別に他ならない。
そこで新しいアーキテクチャを採用する事にした。

CQS：Command Query Separation

オブジェクトの状態を更新し値を返却しない「コマンド」と、副作用を持たず何らかの値を返す「クエリ」を分離する。
具体的な方法として、コマンド `.usecase.ts` とクエリ `.query.ts` でそれぞれにクラスを作る。

## 本題

`foo-usecase.ts` をコマンド一発で作る。
schematicsの使い方については下記記事が良いとの事。

https://qiita.com/hand-dot/items/db780a51915e2dc85221
https://qiita.com/puku0x/items/462a038133e7233dfaed

SchematicTestRunnerでテストもできる（すごい）

## 余談

開発中のパッケージのディレクトリで `npm link` して利用側で `npm link {package}` すればいちいちpublishしなくても開発と利用を同時進行できる。

# [Angular と Firebase で月間PV1億超えの PWA を作った話](https://qiita.com/MasanobuAkiba/items/d2d4be3f8fd2e23c0c1a)

ちゃんと知らない言葉がたくさんあった。

## PWAまわり

> **lighthouse**
> Lighthouse は、ウェブページの品質向上に役立つよう開発された、オープンソースの自動化されたツールです。サイトのパフォーマンス、アクセシビリティ、プログレッシブ ウェブアプリ（PWA）対応状況などについての確認でき、サイトの品質を向上させるための具体的な対策を提示します。

> **Universalリンク**
> Webでクリックしたリンクに対応するアプリスキームに遷移する仕組み。Youtubeをブラウザで見ようとしたらアプリが立ち上がる、アレ。

> **ガワネイティブ**
> 全てスマホのローカルで実行されるネイティブアプリに対し、ガワネイティブはインストールされたアプリ内でWebアプリと同様にWebコンテンツを表示する。

> **TWA**
> AndrodidでブラウザのUIがないChromeを全画面表示してネイティブアプリのようにWEBコンテンツを表示する機能。
> ブラウザ経由でなくPlay Store経由でインストールする。

PWA/TWA,ネイティブアプリの判断は広告収入の差なんだそう。ネイティブアプリのほうが広告の種類が豊富で単価が高い。PWAにするメリットはスマホのプッシュ通知が使える事。

プッシュ通知を許諾するポップアップや、唐突なモーダルはユーザーをびっくりさせる。そして無意識にリジェクトされるケースが少なからずある。

## Firebase

Firestoreの欠点の一つは大量のデータを扱いづらいところ。BigQueryを使えば大量のデータ処理に強くなる。またData Portalでデータをワンタッチで可視化できて、クエリのスケジュール実行（簡易レポート的なもの）も作成できる。便利。

Firebase FunctionはFirestoreの更新時に発火するtriggerという関数。これによって疑似API的なものを作れる。

その他Firebase ExtensionsのDelete User Dataを使えばユーザーの削除時に発火するイベントを定義できたりする。

## Angular

**CDK**
https://material.angular.io/cdk/categories
Angular Materialの共通部分を切り出した振る舞いに関する処理のツール郡。

# [Angular v9 で Angular Elements\(WebComponents 出力\)を使う](https://qiita.com/euxn23/items/bc7c1fa4e7852077199e)

Angular ElementsでWebComponentを出力できる。

```typescript
// app.module.ts
// 実際にはWebComponents出力用のモジュールを別に作ったほうが良い
import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MyCounterComponent } from './my-counter/my-counter.component';

@NgModule({
  declarations: [MyCounterComponent],
  imports: [BrowserModule]
})
export class AppModule {
  constructor(injector: Injector) {
    const MyCounterElement = createCustomElement(MyCounterComponent, {
      injector
    });
    customElements.define('app-my-counter', MyCounterElement);
  }
  ngDoBootstrap() {}
}
```

```bash
ng build --prod --output-hashing none
```

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>
    <app-my-counter></app-my-counter>
    <script src="/dist/angular-elements-counter/main-es2015.js"></script>
    <script src="/dist/angular-elements-counter/polyfills-es2015.js"></script>
    <script src="/dist/angular-elements-counter/runtime-es2015.js"></script>
    <script src="/dist/angular-elements-counter/scripts.js"></script>
    <script>
      // こうやって動かすらしい
      const counterElement = document.querySelector('app-my-counter');
      counterElement.addEventListener('valueChanged', ev => {
        console.log(`count: ${ev.detail}`);
      });
    </script>
  </body>
</html>
```

Angularのビルトインサーバーを使わずindex.htmlを動かす方法：

```bash
npm i -D http-server
npm http-server .
```

WebComponentsの出力はAngular以外にもStencilで実現できるとの事。

# [【Angular】アニメーションをつけようとしてハマったけど、trackByを使うと一発解決した話](https://qiita.com/shira_/items/539e0030527237dceeea)

開閉するメニューバーの実装。

`*ngFor` は渡したコレクションに一部でも変更があった場合にDOMを再描画する。これによってスムーズなアニメーションでなく、表示・非表示の切り替えのようなUIになってしまう。


```html
<ng-container
  *ngFor="
    let item of list
    trackBy: trackByViewModels
  "
```

```typescript
class FooComponent {
  trackByViewModels(index:number, item:Model): number {
    return item.id;
    // idが更新された時だけ再描画
  }
}
```

Angular Animationを使うと、ソースとアニメーションの適用箇所のマッピングが分かりやすくなる。
CSSに不慣れでも簡単に書ける。

# [AngularでChrome Extensionの開発を完結させる](https://yu-kimura.jp/2019/12/13/angular-chrome-extension/)

AngularでChrome拡張を作る話。

manifest.jsonの定義解説
https://developer.chrome.com/extensions/manifest

廃止されたejectコマンドの代わりにwebpackのカスタム設定を読み込むサンプルとして良さそう。

# [Componentの循環参照問題と現在の解決方法](https://qiita.com/ryuseikurata/items/43ce06cc34c3cbcb6c77)

AComponent,BComponentがモーダルに関心を持っているのが良くないように思う。

- 単純なHTMLのパーツにする
- モーダル用のAModalComponent,BModalComponentを宣言する
- モーダルファクトリサービスを作ってキー名A,Bに対してモーダルを出し分ける
- モーダルでなく画面で使うならAComponent,BComponentをそのまま配置する

# [Build Angular with Bazel](https://qiita.com/Jialipassion/items/4dbcb4034b8da114d3c3)

bazel
Grunt/Gulpと同じカテゴリのビルドツール。
（前者はタスクランナーのような気がする、Bazelとの違いが分からない）

Angular用のパッケージを利用できる。

```bash
ng add @angular/bazel
```

このパッケージをインストールするとangular.jsonに変更が加えられビルドのarchitectがbazelになる。

モノレポを高速でビルドするツールらしい。
他には [NX](https://github.com/nrwl/nx) というライブラリもあるとの事。
  

# [Angular \+ Amplify DataStoreを試してみる](https://dev.classmethod.jp/client-side/angular-amplify-datastore/)
  
newの時に対話のインターフェースをスキップするオプションがある。知らなかった。

```bash
ng new datastore-demo --style=scss --routing
```

amplify
Angular & AWSでGraphQLとかDynamoDBとか簡単に使えるパッケージらしい。
オフライン対応のアプリを簡単に構築できる。

# [Angular 8 の Angular CLI Builders について学ぶ](https://qiita.com/pachirel/items/2701540f661a6bab772c)

Angular CLI Builders
https://angular.jp/guide/cli-builder

CLIをカスタマイズできるらしい。
schematics: generateコマンドの雛形をカスタムするものでCLI Buildersとは別物。

`ng run project-name:command-name` を自作できる。

# [@angular/cdkのDragDropModuleに感謝した話。](https://qiita.com/kyokoshimizu/items/8dfda1693c0790d836bd)

けっこうリッチなDrag & Dropのコンポーネントを作ろうとしているっぽい。

auto scroll
https://on-ze.com/demo/js-box-scroll/
カルーセルみたいなやつかな。
Angular Materialで実現できるのか。なるほど。
Bootstrapで部品が足りなかったらAngular Materialを入れてCSSだけ調整するのもアリかもしれない。

# [Angular 8\.1\.0 から入った createAngularJSTestingModule を読んでみる](https://qiita.com/pittanko_pta/items/3ee3df9651aeae99821f)

Angular 8.1で下記がリリースされた。AngularJSとAngularのハイブリッド構成のためのテスト用Helper functionらしい。

- createAngularJSTestingModule
- createAngularTestingModule

こう使うらしい。

```typescript
beforeEach(module(createAngularJSTestingModule([Ng2AppModule])));
beforeEach(module(ng1AppModule.name));

inject((fooService: fooService) => {
  expect(fooService).toBeDefined();
});
```

# [AngularJS だけど Storybook が使いたい](https://qiita.com/is2ei/items/9fb089b584881826c61e)

PRドリブンでStorybookの静的ファイルをS3にアップして、通知を送るらしい（Jenkinsでやってる）
この仕組みはなかなか面白いかも。
Storybookをメンテする手間が省けつつ、有効活用できそう。

# [Angularアプリのパフォーマンス改善記](https://qiita.com/rena_m/items/148727b799b9785671ce)

lighthouseでパフォーマンス計測し、数値を改善する話。

- 依存ライブラリを見直す（おもすぎるmoment.js）
- 不要なimportの見直し
- 初期ロードに必要なモジュールとコンポーネントを最小にする
- CSSをLazyLoadに変更
  - 3rd partyライブラリのCSSはangular.jsonに記載され初期リソースとしてロードされるため変更する
- Routingの見直し
  - 初期ロード/遅延ロードを見直す
- webpack-bundle-analyzerを使ってもよし

LightHouseCIが出たらしい。

# [@ionic/angularがWebComponentsでテンプレートチェックを効かせるためにやっていることを調べる](https://crieit.net/posts/ionic-angular-WebComponents)

## 前提

通常は customElements.define() すればCustomElementを使える。が、Angularのテンプレートチェックでそんなコンポーネントは知らないと怒られる。

１）テンプレートチェック自体を無効化する

```typescript
@NgModule({
  schemas: [CUSTOM_ELEMENT_SCHEMA]
})
```

## `@ionic/angular` はなぜCustomElementで怒られないのか

`<ion-input>` はAngularコンポーネントとして定義されている。

```
@Component({
  selector: 'ion-inuput'
})
```

ionicではこれをプロキシと呼び、CustomElementとAngularの中継をするコンポーネントとして役割をもたせている。

# [Angular と GraphQL 2019](https://qiita.com/kponda/items/608cf0874c1450da13f4)

## GraphQL

主な機能としてquery（取得）/mutate（変更）/subscription（購読）の操作が行える。

## 試す

```bash
npm i apollo-server-express graphql
```

スキーマを作る

```typescript
export const typeDefs = gql`
  type Cat { _id: String, name: String }
`
```

リゾルバを作る

```typescript
export const resolvers = {
  Query: {
    cats: async () => allCats),
    cat: async (_, args) => findCat(args.id)
  }
  ...
}
```

サーバーサイド（Express）のエンドポイントとなるファイル

```
// server/app.ts
const app = express()

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
```

ts.configを調整

- esModuleInterop
  - false：CommonJSはrequireで読み込む
  - true：import fromで読み込む
- allowSyntheticDefaultImports
  - デフォルトのimportがないモジュールに対してデフォルトのimportから読み込む事を許可する
  
apolloではGraphQL Playgroundが使えるようになっている（localhost:3000/graphql）

GraphQLクライアントモジュール

```bash
npm add apollo-angular

// client/app/graphql.module.tsが生成される
// このファイルにGraphQLサーバーのURLを指定すればOK
```

```typescript
@Component({})
class GraphqlComponent {
  constructor(
    private apollo: Apollo,
  ) {}
  
  getCats() {
    this.apollo
      .watchQuery<any>({
        query: AllCatsQuery
      })
      .valueChanges
      .subscribe(() => {});
  }
}
```

サーバーからのプッシュもsubsctiptionで受け取れるようになっている。

# [クリスマスを華やかにするGUI小技集](https://qiita.com/okunokentaro/items/519222284e6a2ede0de5)

日頃からGUIのストックを持っておく。
配列操作やキーのハンドリングの訓練になり扱いに慣れる。

https://stackblitz.com/edit/angular-awsrxx?file=src/app/tag-input/tag-input.component.ts
タグ入力はあんまり見たことないので使いたい。
keyupはRxJSでまとめて処理する。なるほど。

ハイレベルな技術力の人のソースを見られるのは貴重。ちょうどキー入力まわりで実装方法に迷っていたので参考にさせてもらおう。
