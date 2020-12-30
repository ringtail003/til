デザインパターンをTypeScriptで学ぶ（State）

デザインパターンと言えば [TECHSCORE](https://www.techscore.com/tech/DesignPattern/index.html/) さんの記事が有名ですね。時々「このコード、何かのパターンで表現できそう...」と思うのですが、日常業務でデザインパターンをサッとかっこよく使う事ができていません。という訳で TECHSCORE さんの記事を読みつつ、自分の中で噛み砕いた知識を TypeScript のコードで書き起こしてみようと思います。

- 対象読者：Java のコードを読むのに苦戦する人（自分！！）
- 環境：typescript 4.0

23 パターン全部まとめたら記事同士のリンクを貼ろうと思います。

# State パターン

連続した HTTP リクエストと、そのうち失敗に終わったものだけリトライする例です。

```TypeScript
/*
State/Context
*/
enum State {
  None,
  Requesting,
  Succeeded,
  Failed
}

/*
ConcreteState
*/
class Instruction<T> {
  private state: State = State.None;

  constructor(
    private source: T,
    private handler: (source: T) => Promise<any>,
  ) {}

  invoke(): Promise<any> {
    this.state = State.Requesting;

    return this.handler(this.source).then(
      () => this.state = State.Succeeded,
      () => this.state = State.Failed,
    );
  }

  retry(): void {
    if (this.state === State.Failed) {
      this.invoke();
    }
  }

  getState(): State {
    return this.state;
  }
}

/*
リクエストを一括で実行するためのユーティリティクラス
*/
class PostInstructionList {
  private list: Instruction<Item>[];

  constructor(sources: Item[]) {
    this.list = sources.map(item => new Instruction(
      item,
      (item) => fetch(`/api/items/${item.id}`, { method: 'POST', body: item.name }),
    ));
  }

  invoke(): Promise<any> {
    return Promise.all(this.list.map(item => item.invoke()));
  }

  retry(): void {
    this.list.forEach(item => item.retry());
  }

  canRetry(): boolean {
    return !!this.list.find(item => item.getState() === State.Failed);
  }
}
```

# 説明

## State

**Strategy** パターンのフロントエンドでの有用性を示すために、あえて Enum で表現しています。

```TypeScript
/*
State/Context
*/
enum State {
  None,
  Requesting,
  Succeeded,
  Failed
}
```

## Context/ConcreteState

**State** パターンによって、状態ごとの振る舞いを切り替える例です。

```TypeScript
/*
ConcreteState
*/
class Instruction<T> {
  private state: State = State.None;

  constructor(
    private source: T,
    private handler: (source: T) => Promise<any>,
  ) {}

  invoke(): Promise<any> {
    // コンテキストを与える
    this.state = State.Requesting;

    return this.handler(this.source).then(
      () => this.state = State.Succeeded,
      () => this.state = State.Failed,
    );
  }

  retry(): void {
    // HTTP リクエストの結果により振る舞いを切り替える
    if (this.state === State.Failed) {
      this.invoke();
    }
  }

  getState(): State {
    return this.state;
  }
}
```

このクラスによって表現しているのは **状態（HTTP リクエストの実行結果）** と **状態による振る舞い（失敗した時だけリトライできる事）** です。

説明を簡単にするために `Promise<any>` を使うなどしていますが、実際のコードに落とし込む時は HTTP リクエストの結果によって戻り値を変更したり、またステータスコードが 403 Forbidden だったら「中断」ステータスを持たせたりとアレンジを加えます。ひとつのクラスに「状態」と「振る舞い」を閉じ込める事で、アレンジを取り入れても関心が分離せずすっきりとしたコードを書くことができます。

## リクエストを一括で実行するためのユーティリティクラス

**State** パターンに登場するものではありません。単なるユーティリティです。

```TypeScript
class PostInstructionList {
  private list: Instruction<Item>[];

  constructor(sources: Item[]) {
    this.list = sources.map(item => new Instruction(
      item,
      (item) => fetch(`/api/items/${item.id}`, { method: 'POST', body: item.name }),
    ));
  }

  invoke(): Promise<any> {
    return Promise.all(this.list.map(item => item.invoke()));
  }

  retry(): void {
    this.list.forEach(item => item.retry());
  }

  canRetry(): boolean {
    return !!this.list.find(item => item.getState() === State.Failed);
  }
}
```

「連続した HTTP リクエスト」は言い換えれば「HTTP リクエストの集合」です。集合に対する操作をひとまとめにしておく事で、関心事があちこち散らからないようにしておきます。

具体的には、HTTP リクエストを並列実行でなく直列実行したい場合や、403 Forbidden の結果で終わった「中断」ステータスが一つでもあればリトライは不可能など、集合に関する操作や振る舞いは全てこのクラスに集めておく事ができます。

## 利用例

**State** パターンとユーティリティクラスによって「状態」は隠蔽されます。利用者は HTTP リクエストの結果を変数に入れて引き回したりせず、シナリオを作るだけのシンプルな実装になります。

```TypeScript
type Item = { id: number, name: string };

const items: Item[] = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
];

const instructionList = new PostInstructionList(items);

instructionList.invoke().then(() => {
  if (instructionList.canRetry()) {
    instructionList.retry();
  }
});
```

# このパターンが解決する問題

よくやりがちなのが HTTP リクエストの結果を変数に入れて引き回すコードです。

```TypeScript
type ItemWithStatus = {
  id: number,
  name: string,
  status: "none" | "success" | "failure"
};

const items: ItemWithStatus[] = [
  { id: 1, name: "a", status: "none" },
  { id: 2, name: "b", status: "none" },
];

function request(): void {
  if (!items.find(item => item.status === "none")) {
    throw new Error("no item.");
  }
  
  items.forEach(item => {
    fetch(`/api/...`).then(result => {
      if (result.status === 200) {
        item.status = "success";
      }
      ...
    });
  });
}

function retry(): void {
  items
    .filter(item => item.status === "failure")
    .forEach(item => fetch(`/api/...`));
}
```

変数引き回しには、いろいろと問題がつきまといます。

- メンテナンス性が低い：「中断」を示す新しいステータスが追加された時にコードを全部舐め回さないといけない
- 神クラス/神サービスの予兆：ちょっとした振る舞いの違いが追加されるごとに function やその引数が増える
- 再利用性が低い：別の WebAPI エンドポイントで振る舞いが再利用できない

**State** はこのようなコピペの温床となるコードから「状態とその関心事」を分離する事のできるパターンです。
