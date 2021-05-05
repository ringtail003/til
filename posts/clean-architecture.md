---
title: Clean architecture
description: クリーンアーキテクチャの調べ物メモ
published: true
updatedAt: 2021-04-18
tags: 
---

# 実装クリーンアーキテクチャ

https://qiita.com/nrslib/items/a5f902c4defc83bd46b8

![1](https://user-images.githubusercontent.com/15980747/115139973-e3e23980-a06f-11eb-9dd1-da4db08b9eff.jpeg)

## 各層

### Enterprise Business Rules（黄色・中心）

ビジネスロジックを表現する。

- エンティティ

### Application Business Rules（赤）

ソフトウェアが何ができるのかを表現する。

- ユースケースの達成
- ドメイン駆動設計でいうところのアプリケーションサービスはここに属する

### Interface Adapters

入力、永続化、表示を担当するオブジェクトが所属。

- Application Business Rulesに伝えるためのデータ加工

### Frameworks & Drivers

Webフレームワークやデータベース操作オブジェクトなどのギークなコード。
フロントエンドのUI。

※ギーク：知識や技術の集合の意味っぽい

## 特徴・引用

- 所属するレイヤーの外側は参照してはいけない
- interfaceに依存する事で実装への依存を避ける

> Presenter

UseCaseが出力するOutputDataをViewModelに変換する。
プレゼンテーションごとの表現の差を吸収する。

> Interactor

ユースケースはInterfaceで用意する。
その実装を担うのがInteractor。

> Controller

ユーザーの入力を解釈しUsecaseにそれを伝える。
入力をUseCaseのために変換する。

> Humble Object パターン

https://shtnkgm.com/2020/05/17/humble-object-pattern.html

テストしやすいもの・しにくいものを分離して考え、しにくいものを控えめなロジックにする。具体的に「しにくいもの」はGUIやデータストア、コンストラクタが隠蔽されている場合など。テスト対象領域（しやすいもの、テストすべきなもの）にロジックを寄せるようコードレビューやLinterで指摘する。

## 所感

クリーンアーキテクチャをバックエンドに適用したお話。
ユースケース、リポジトリの実装例が記載されている。
バックエンドでUIまで出力するケースのため、UIが「View」「ViewModel」あたりに集約されていてその後のフロントエンドロジックの複雑さの解決には至らない。

# WEBフロントエンドにおけるソフトウェア設計の考察

https://speakerdeck.com/tooppoo/consideration-of-software-design-in-web-front-end

> フロントエンドは単に画面表示と言えるほど単純ではない。
> 画面設計だけでなくソフトウェア設計もフロントエンドには必要。

> すべてのソフトウェアプログラムはそれを使用するユーザーの何らかの活動や関心と関係がある。ユーザーがプログラムを適用するこの対象領域がソフトウェアのドメインである。  
> **エリック・エヴァンスのドメイン駆動設計**

> フロントエンドにドメインは無いか？
> ドメイン=ユーザーの何らかの活動や関心、フロントエンドもソフトウェアである以上、何らかの活動や関心に関わるはず。
> ドメインが無い = それらに一切関わらないなら、それは何一つ処理をしないソフトウェアのはず。

> バックエンドは「計算とデータの整合性」
> フロントエンドは「ユーザーへの表示」「ユーザー操作による状態遷移の達成」
> 表示・操作・状態の観点からドメインを解決する。

> 画面の奥にあるソフトウェアをいかに組み立てるかの議論が不足していないか？

> Atomic DesignはUIパーツの設計方法論

https://github.com/tooppoo/sample-for-vue-with-design-patterns

- views
  - todo
    - model
      - repository.ts
        - from-api.ts
          - `(interface) TodoResponse`
          - `(class) FromApiTodoRepository` モデルに変換して返す
      - task-state.ts
        - `(interface) TaskState` 
        - `(class) NormalState` 
        - `(class) CloseToLimitState`
      - todo.ts
        - `(class) Todo`
      - `(interface) TodoRepository`
    - view
      - TodoList.vue
        - `(component) StatePattern` repositoryと対話、repository interfaceに依存

  - cart
    - controller
      - interaction.ts
        - `(class) CartInteraction` ユースケースっぽい
    - model
      - cart-item-list.ts
        `(class) CartItemList` ドメインモデルっぽい
      - repository
        - from-api.ts
          - `(interface) CartItemResponse`
          - `(class) FromApiCartItemListRepository` ドメインモデルに変換して返す
      - repository.ts
        - `(interface) CartItemListRepository`
    - view
      - Cart.vue
        - `(component) Cart` repository、Interactionと対話

- Controller（Interaction）クラスがユースケース。
- ComponentがRepository、Interactionと対話。
- Componentはユースケースの返すドメインモデルを扱う。

> ロジック = ビジネスルール・業務ルールとは限らない
>   これはバックエンドというコンテクストにおける表現
> フロントエンドにおけるロジックとは、表示と操作のルール

> Fluxアーキテクチャ
> 単方向データフローは有用だが、データフローを動作させるモジュールの構造については何も提供しない

> クリーンアーキテクチャ
> DBの内部にはDBから見た、UIの内部にはUIから見た内側（コア）と外側（周辺）がそれぞれ有ると考えたほうが自然

> 中心の関心事と周辺の関心事を分けて思考・実装

> ドメインを分析し理解することは、バックエンドだけの仕事ではない
> ドメインの分析・理解は、システム開発全体にとって重要

紹介記事
https://speakerdeck.com/takasek/20200121-the-center-of-the-client-number-ios-ca

https://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html

# Fat ComponentにしないためのWebフロントエンド設計

https://speakerdeck.com/tooppoo/web-front-end-design-to-avoid-being-a-fat-component

> 何でもかんでもコンポーネントに書かない
> 表示・操作を実現するための知識・情報・振る舞いは、コンポーネントからは独立したものとして別途定義する
> コンポーネントには具体的な表示様式と、バインディング・ハンドリングのみを記述する

> 肥大化の全ての要因をコンポーネント分割のみで解決するのは困難

> 「何がどのように見えるか」より割きに、見せるべき・知識・情報は何か、それらはどのような構造・関連を取るか、に注目する

リスト/リストアイテムに対する「見せるべき知識」「提供する操作」に着目しモデルに起こす。
<img width="613" alt="スクリーンショット 2021-04-19 8 31 02" src="https://user-images.githubusercontent.com/15980747/115165625-b8039a00-a0e9-11eb-9aef-197baa8d710e.png">

> コンポーネントはいかに知識を構成・表示・表現するかに注力する
> UIは詳細な処理・計算よりもユーザーに何を伝え、何を示すかに注力する

> 知識 ≠ データ
> 振る舞い ≠ CRUD操作

> ユーザーの「しようと思った事」を「した」で実現する

> サーバー（バックエンド）で提供・管理できる情報には限界がある
> 画面側の一時的・揮発的な情報
> 画面内部の動的な状態遷移

> ロジック = ビジネスロジックではない
> ビジネスロジック ∈ ロジック

# CQRS実践入門[ドメイン駆動設計]

https://little-hands.hatenablog.com/entry/2019/12/02/cqrs

参照系処理で発生する課題として、複数の集約から同時に情報を得てひとつの集約を生成する事がある。ここに下記のような問題が発生する。

- 複数の集約から戻り地の型に詰め替える処理が煩雑になる
- 画面に返す必要のない値も取得対象でありパフォーマンスが悪化する
- 条件で絞り込んでのページングができない

CQRSは「情報の参照に使用するモデルと更新に使用するモデルに異なるものを使用する」というアーキテクチャ。参照系（Query）は複数テーブルにまたがって一発でデータを取得し結果をDTOに詰め替える。更新系（Command）は副作用を持つタスクの集合とする。

CQRS Documents by Greg Young（和訳）
http://www.minato.tv/cqrs/cqrs_documents_jp.pdf

# Almin.js | JavaScriptアーキテクチャ

https://azu.github.io/slide/2016/child_process_sushi/almin-javascript-architecture.html

- src
  `AppLocator` contextを持つ
- component
  - container
    - PageListContainer
      - `PageListContainer.js` contextを持っている
    - `App.js`  usecaseと対話する
  - project
    - PageEditor
      - `PageEditor.js`
      - `PageEditorTextarea.js`
- js
  - UseCase
    - document
      - `MarkPageUseCase.js` repositoryと対話
  - domain
    - document
      `Document.js` ドメインモデル
  - read-store
    - document
      `DocumentState.js` フレームワークのストアにpure classを登録
  - infra
    - adapter
      - `MemoryDB.js` DB永続化のストレージ
    - `DocumentRepository.js` コンストラクタにストレージを取る

# Clean Architecture in Web Frontend #mixleap

https://speakerdeck.com/pirosikick/clean-architecture-in-web-frontend-number-mixleap?slide=16

> システムは「方針」と「詳細」の2つに分類できる
>   方針：
>     ビジネスのすべてのルールや手順
>     システムの本当の価値
>   詳細：
>     方針についてやり取りするのに必要なものだが
>     方針の振る舞いに影響を与えるものではない
>     例）デバイス、DB、FW

> 詳細は方針のプラグイン
> 方針は詳細の事を知らない

https://github.com/pirosikick/twitter-like-app-clean-architecture

- client
  - pages
    - `SignIn.tsx` stateを受け取ってactionCreatorsと対話する
- data-access
  - `MemoryDataAccess.ts` entityのインターフェースを返す
- entities
  - `index.ts` interfaceで実装
- usecases
  - createRetweet
    - `factory.ts` dataAccessと対話する
    - `interface.ts` useCaseのData boundary/dataAccess（必要なメソッドだけ）のインターフェース、usecaseは単なる関数でdataAccessを引数に取り振る舞いを閉じこめたクロージャを返す
- utils

# フロントエンドでClean Architectureを適用してみる(+サンプルコード)

https://qiita.com/ttiger55/items/50d88e9dbf3039d7ab66

- domain
  - `article.ts` class、ドメインモデル
- driver
  - `articleDriver.ts` リポジトリに該当
- interface
  - driver
    - `articleDriver.ts` ドライバのIF & 戻り地のjsonの型定義
  - repository
  - useCase
- presenter
  - components
    `Article.tsx` バインドで受け取ったドメインモデルを扱う
  `App.tsx` リポジトリと対話
- repository
  - `articleRepository.ts` ドライバと対話、ドメインモデルを返却
- useCase
  - `articleUseCase.ts` リポジトリと対話、リポジトリの返却するドメインモデルを返す

## アクターの整理

### エンティティ

最重要ビジネスデータ+最重要ビジネスルール。
ツイートのテキストは140文字以内、ユーザー名は1文字以上の英数字。
単なるオブジェクトとして表現。
ルールはすべて単体の関数。

```ts
function isTweetValid(text:string): boolean {
  ...
}
```

### ユースケース

アプリケーション固有のビジネスルール。
UIについては記述しない。

```ts
type IUseCase<Input, Output> = (input: Input) => Promise<Output>;

type IUseCaseFactory<DataAccess, Usecase extends IUseCase<any, any>> = (dataAccess: DataAccess) => UseCase;
```

## 引用

> クリーンアーキテクチャは方針と詳細のプラグインアーキテクチャ
> 詳細をプラグインにすることで決定を遅延できる＆変更が容易になる

