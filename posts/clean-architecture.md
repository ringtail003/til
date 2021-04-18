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
