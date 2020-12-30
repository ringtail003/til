# Observable

## Pull versus Push

https://rxjs.dev/guide/observable

JavaScriptにおいて関数はデータを提供する **Producer** で、呼び出し（ **Consumer** ）によってタイミングや何回実行されるのかが決定する。
これはプル型のアプローチを示す。

```javascript
// Producer
// 戻り値によってデータを提供する
function increment(num) {
  return num++;
}
```

```javascript
// Consumer
// データを利用する側で、呼び出しのタイミングや回数が決定する
increment(num);
increment(num);
```

これに対してPromiseはコールバックの呼び出し（ **Consumer** ）がデータの提供（ **Producer** ）によって決定する。

```javascript
// Consumer
// データを利用する側をコールバックとして宣言
const callback = (value) => {
  console.log(value);
};

const errorCallback = (reason) => {
  console.error(reason);
};
```

```javascript
// Producer
// データがどのように提供されるかによって、コールバックの実行が決定する
Promise.resolve(123).then(callback, errorCallback);
```

RxJSでは **Observable** がProducerであり **Observer** がConsumerの役割を担う。

## Actor

- `Observable` Producer
  - `Subscriber` 値を流す
  - `Subscription` 監視を終了
- `Observer` Consumer
  - コールバック（next/error/complete）を持つ
- `Subject` Producer/Consumer
- `Scheduler`
  - コンテキストとタイミングのハンドリング

# Operators

https://rxjs.dev/guide/operators#creation-operators

Observableに宣言的な方法で処理を挿入する方法。
Observableには変更を加えず常に新しいインスタンスを返す。

## Pipe

擬似的に下記のような役割を果たす。

```
const op1 = () => {...};
const op2 = () => {...};
const op3 = () => {...};

op3(op2(op1()));
```

これは可読性が低いためパイプを使って関数群を順次実行する。

```
pipe(op1, op2, op3);
```

## Creation Operator

Observableを生成するオペレータ。
intervalなど。

## Higher-order Observables

Observableに流れる値がObservableの時。

```
const fileObservable = urlObservable.pipe(
   map(url => http.get(url)),
   concatAll(),
);
```

`concatAll()` は内側のObservableを外側のObservableに放出する。

https://rxjs.dev/guide/operators
この一覧は便利そう。フィルタとかマージとか目的別にオペレータが整理されている。

# Subscription

- unsubscribe() 購読のキャンセル
- add() subscriptionのマージみたいなやつ

```
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription);
 
setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
```

1000ミリ秒後にsubscriptionがまとめてunsubscribeされる。

# Subject

```
Every Subject is an Observable.
Every Subject is an Observer. 
```

複数のObserverにmulticastするための特別なObservable。
リスナーとエミッターの両方の側面を持つ。

> multicast（一斉送信）の対義語はunicast（単一の送信）。

Subjectにはいくつかの種類がある

- AsyncSubject
- BehaviorSubject
- ReplaySubject
- Subject

# Scheduler

実行コンテキストを宣言するもの。

- タスクの格納とキューイング
- タスクの実行をハンドリングするもの
- 仮想のクロックを持つ

# Promiseとの優位性

- ストリームの分岐
  - Promise 同じHTTPリクエストに対する処理をひとつのthenチェインに記述する
  - RxJS ストリームを分岐する
- 値を流すタイミングのハンドリング
  - Promise 値とハンドリングを同時に宣言
  - RxJS 値を流す側とハンドリングは疎結合になる
- キャンセルできない

# Hot/Cold

`Cold`
Subscribeが呼び出されるまで何もしない受動的なObservable。

`Hot`
上位のCold Ovservableに働きかける。

ColdなObservableはpublishなどのオペレータを使う事でHotに変換できる。
https://www.learnrxjs.io/operators/multicasting/publish.html

# Refs 

- https://www.learnrxjs.io/
- https://gitbook.lacolaco.net/angular-after-tutorial/season-2-effective-rxjs/introduction
- https://www.learnrxjs.io/concepts/rxjs-primer.html

# RxJS Primer

https://www.learnrxjs.io/concepts/rxjs-primer.html

Observableはストリームまたは時間の経過とともにストリーム上に流れる値を示す。

Observableを宣言するだけでは何も起こらない、すなわちColdである。

## Subscription

Subscriptionは蛇口のようなもの。Observableで水の流れを準備し、誰かがハンドルをひねれば水が流れる。
Subscriptionを作成するにはsubscribeメソッドを呼ぶ。
どのように対話するのかはovserverが決定する。

下記はイベント版lodashのような悪い例。いわゆるunicast。

```typescript
const subscription = myObservable.subscribe(event => console.log(event));

const secondSubscription = myObservable.subscribe(event => console.log(event));

subscription.unsubscribe();
secondSubscription.unsubscribe();
```

RxJSのObservableはデフォルトでColdまたはunicast。
hotまたはmulticastに変換できる。
