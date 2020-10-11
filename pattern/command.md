デザインパターンをTypeScriptで学ぶ（Command）

デザインパターンと言えば [TECHSCORE](https://www.techscore.com/tech/DesignPattern/index.html/) さんの記事が有名ですね。時々「このコード、何かのパターンで表現できそう...」と思うのですが、日常業務でデザインパターンをサッとかっこよく使う事ができていません。という訳で TECHSCORE さんの記事を読みつつ、自分の中で噛み砕いた知識を TypeScript のコードで書き起こしてみようと思います。

- 対象読者：Java のコードを読むのに苦戦する人（自分！！）
- 環境：typescript 4.0

23 パターン全部まとめたら記事同士のリンクを貼ろうと思います。

# Command パターン

イベントのチケット予約を例としています。

チケット予約は、Eメール認証、支払い、チケットの発券、というように順を追って処理するものとします。そのうちどれかひとつでも失敗すると処理は中断し、次に進む事はありません。

```TypeScript
interface Reserve {
  event: {
    id: number;
    amount: number;
  }
  email: string;
}

/*
Command
*/
interface Command {
  execute: (reserve: Reserve) => Promise<string>;
}

/*
ConcreteCommand(1)
*/
class UserAuthenticateCommand implements Command {
  private service = new EmailAuthenticate();

  execute(reserve: Reserve) {
    return this.service
      .authenticate(reserve.email)
      .then(() => "email認証が完了しました");
  }
}

/*
ConcreteCommand(2)
*/
class PaymentCommand implements Command {
  private payment = new PaymentService();

  execute(reserve: Reserve) {;
    return this.payment
      .request(reserve.event.amount)
      .then(() => "支払いが完了しました");
  }
}

/*
ConcreteCommand(3)
*/
class TicketCommand implements Command {
  private client = new HttpClient();

  execute(reserve: Reserve) {
    return this.client
      .post(`/ticket/${reserve.event.id}`)
      .then((response) => `チケット[${response.id}]が発行されました`);
  }
}

/*
Invoker
*/
class TicketFactory {
  get(reserve: Reserve) {
    return [
      new UserAuthenticateCommand(),
      new PaymentCommand(),
      new TicketCommand(),
    ].reduce((promise, command, i) => {
      return promise.then((message) => {
        i && console.log(`${i}: ${message}`);

        return command.execute(reserve);
      });
    }, Promise.resolve(""));
  }
}
```

# 説明

## Command

Command は実行処理のインターフェースを示しています。引数で受け取る Reserve は実行処理のコンテキストです。

```TypeScript
/*
Command
*/
interface Command {
  execute: (reserve: Reserve) => Promise<string>;
}
```

## ConcreteCommand

この例では「Eメール認証」「支払い」「チケットの発券」が実行処理に該当します。それぞれが同じ挙動になるように Command インターフェースの実装クラスとして記述します。

```TypeScript
/*
ConcreteCommand(1)
*/
class UserAuthenticateCommand implements Command {
  private service = new EmailAuthenticate();

  execute(reserve: Reserve) {
    return this.service
      .authenticate(reserve.email)
      .then(() => "email認証が完了しました");
  }
}

/*
ConcreteCommand(2)
*/
class PaymentCommand implements Command {
  private payment = new PaymentService();

  execute(reserve: Reserve) {;
    return this.payment
      .request(reserve.event.amount)
      .then(() => "支払いが完了しました");
  }
}

/*
ConcreteCommand(3)
*/
class TicketCommand implements Command {
  private client = new HttpClient();

  execute(reserve: Reserve) {
    return this.client
      .post(`/ticket/${reserve.event.id}`)
      .then((response) => `チケット[${response.id}]が発行されました`);
  }
}
```

## Invoker

**Command** の実行を担っています。もし「支払い」の次に「Eメール認証」を実行したとして、クレジットカード決済の完了後に「Eメールが違います、最初からやり直してください」と画面に表示されてしまったら厄介です。そのような事がないように整合性の取れた実行順をこのクラスが保証しています。

```TypeScript
/*
Invoker
*/
class TicketFactory {
  get(reserve: Reserve) {
    return [
      new UserAuthenticateCommand(),
      new PaymentCommand(),
      new TicketCommand(),
    ].reduce((promise, command, i) => {
      return promise.then((message) => {
        i && console.log(`${i}: ${message}`);

        return command.execute(reserve);
      });
    }, Promise.resolve(""));
  }
}
```

## 利用例

利用者はチケット予約のコンテキストをセットし **Invoker** に渡します。**Command** は順次実行され、利用者は成功または中断のハンドリングだけを仕事にする事ができます。

```TypeScript
const reserve = {
  event: {
    id: 102253,
    amount: 3000,
  },
  email: "user@example.com"
};

new TicketFactory().get(reserve).then(message => {
  console.log(message);
});

// 1: email認証が完了しました
// 2: 支払いが完了しました
// チケット[12345]が発行されました
```

# このパターンが解決する問題

このような繰り返しの処理は、頻繁ではないものの、時々実装する場面があります。アプリの初期設定ウィザードや、登録処理のプログレスバー表示などです。

そしてもし、繰り返しをひとつの関数の中で処理しようとすると、鬼のようなネストが発生してします。

```TypeScript
function createTicket() {
  let no = 0;
  let isCompleted = false;
  let message = "";

  new EmailAuthenticate().authenticate(reserve.email).then(() => {
    no = 1;
    message = "Eメール認証完了";

    return new PaymentService().request(reserve.event.amount).then(() => {
      no = 2;
      message = "支払い完了";

      return new HttpClient().post(`/ticket/${reserve.event.id}`).then((response) => {
        no = 3;
        message = `発券：${response.id}`;
        isCompleted = true;
      }, () => {
        // Eメール認証の失敗
      });
    }, () => {
      // 支払いの失敗
    })
  }, () => {
    // 発券の失敗
  });
}
```

もしここに「支払いシステムが不安定なので３回リトライする」や「ステップ n まではキャンセルボタンでユーザーが中断できる」という追加仕様が入るとどうなるでしょう。ネストの順番入れ替えは閉じカッコとの戦いです。カッコの場所はエディタが見つけて教えてくれますが then チェインの第二引数をどの場所と入れ替えたらいいのかまでは教えてくれません。

**Command** パターンの例を見てみましょう。

```TypeScript
class PaymentCommand implements Command {
  private payment = new PaymentService();

  execute(reserve: Reserve) {;
    return this.payment
      .request(reserve.event.amount)
      .then(() => "支払いが完了しました");
  }
}
```

リトライを入れるのは簡単だと思いませんか？ Promise を 3 回チェインさせて、成功したら次のチェインは PaymentService を呼ばなければ良いだけです。

```TypeScript
class TicketFactory {
  get(reserve: Reserve) {
    return [
      new UserAuthenticateCommand(),
      new PaymentCommand(),
      new TicketCommand(),
    ].reduce((promise, command, i) => {
      return promise.then((message) => {
        i && console.log(`${i}: ${message}`);

        return command.execute(reserve);
      });
    }, Promise.resolve(""));
  }
}
```

キャンセルについても、ステップを実行するごとにキャンセルステータスをチェックして、ステップ番号 n より小さければ中断のための例外をスローすれば良さそうです。

**Command** パターンはこのように「実行要求」を列挙し、その実行順と個々の要求を分離する事によって、連続した処理を扱いやすくする事のできるパターンです。
