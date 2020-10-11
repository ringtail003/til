# AbstractFactory パターン

商品の注文を現金・クレジットカードで支払いする例です。注文は配送方法の指定と、領収書の出力ができます。

```TypeScript
/*
AbstractFactory
*/
abstract class OrderFactory  {
  protected items: Item[] = [];
  protected delivery: DeliveryMethod = DeliveryMethod.Normal;

  abstract addItems(item: Item): void;
  abstract setDelivery(delivery: DeliveryMethod): void;
  abstract getReceipt(): string;
}

enum PaymentMethod {
  Cash,
  CreditCard,
}

enum DeliveryMethod {
  Normal,
  Express,
}

interface Item { amount: number }

/*
ConcreteFactory
*/
class CasheOrderFactory extends OrderFactory {
  addItems(item: Item): void {
    this.items.push(item);
  }

  setDelivery(delivery: DeliveryMethod) {
    if (delivery === DeliveryMethod.Express) {
      throw new Error("現金支払いはお急ぎ便を利用できません");
    }
    this.delivery = delivery;
  }

  getReceipt(): string {
    return "現金でのお支払い：" +
      this.items.reduce((amount, item) => amount + item.amount, 0);
  }
}

class CreditCardOrderFactory extends OrderFactory {
  addItems(item: Item): void {
    this.items.push(item);
  }

  setDelivery(delivery: DeliveryMethod) {
    this.delivery = delivery;
  }

  getReceipt(): string {
    return "カードでのお支払い（2割引）：" +
      this.items.reduce((amount, item) => amount + item.amount, 0) * 0.8;
  }
}

/*
ConcreteProduct
*/
function createOrderFactory(payment: PaymentMethod) {
  if (payment === PaymentMethod.Cash) {
    return new CasheOrderFactory();
  }

  if (payment === PaymentMethod.CreditCard) {
    return new CreditCardOrderFactory();
  }

  throw new Error("サポートしていません");
}
```

# 説明

## AbstractFactory

注文の振る舞いを決定する抽象クラスです。派生クラスには「配送方法の指定」「領収書の出力」機能を持つ事が保証されます。

```TypeScript
/*
AbstractFactory
*/
abstract class OrderFactory  {
  protected items: Item[] = [];
  protected delivery: DeliveryMethod = DeliveryMethod.Normal;

  abstract addItems(item: Item): void;
  abstract setDelivery(delivery: DeliveryMethod): void;
  abstract getReceipt(): string;
}

enum PaymentMethod {
  Cash,
  CreditCard,
}

enum DeliveryMethod {
  Normal,
  Express,
}

interface Item { amount: number }
```

## ConcreteFactory

派生クラスの実装です。このケースでは支払いの種類ごとに派生クラスを作成しています。

```TypeScript
/*
ConcreteFactory
*/
class CasheOrderFactory extends OrderFactory {
  addItems(item: Item): void {
    this.items.push(item);
  }

  setDelivery(delivery: DeliveryMethod) {
    if (delivery === DeliveryMethod.Express) {
      throw new Error("現金支払いはお急ぎ便を利用できません");
    }
    this.delivery = delivery;
  }

  getReceipt(): string {
    return "現金でのお支払い：" +
      this.items.reduce((amount, item) => amount + item.amount, 0);
  }
}

class CreditCardOrderFactory extends OrderFactory {
  addItems(item: Item): void {
    this.items.push(item);
  }

  setDelivery(delivery: DeliveryMethod) {
    this.delivery = delivery;
  }

  getReceipt(): string {
    return "カードでのお支払い（2割引）：" +
      this.items.reduce((amount, item) => amount + item.amount, 0) * 0.8;
  }
}
```

現金での支払いの場合は特定の配送方法は指定できない、クレジットカードの支払いの場合は割引を適用する、など派生クラスにはその種類に応じた仕様を持たせる事ができます。

その反面、派生クラスのメソッドのインターフェースは抽象クラスで保証されているため、配送方法は `DeliveryMethod` 型、領収書は `string` というようにすべての派生クラスが共通した振る舞いを持つようになります。

## ConcreteProduct

AbstractFactory の利用者は、支払い方法や割引についての関心事から解放されます。ユースケースに応じたユーザー入力（配送方法）を Factory に伝え、結果（領収書）を取得するだけのシンプルな役割になります。

```TypeScript
/*
ConcreteProduct
*/
function createOrderFactory(payment: PaymentMethod) {
  if (payment === PaymentMethod.Cash) {
    return new CasheOrderFactory();
  }

  if (payment === PaymentMethod.CreditCard) {
    return new CreditCardOrderFactory();
  }

  throw new Error("サポートしていません");
}
```

## 利用例

```TypeScript
const order = createOrderFactory(PaymentMethod.CreditCard);
order.addItems({ amount: 100 });
order.getReceipt();

// カードでのお支払い（2割引）：80
```

# このパターンが解決する問題

ありがちなのが、仕様を関数に詰め込んでいろいろなオプションを引数で受けとるケースです。

```TypeScript
function createOrderFactory(
  payment: PaymentMethod,
  delivery: Delivery,
  items: Item[],
): string {
  const amount = items.reduce((amount, item) => amuont + item.amount, 0);
  
  if (payment === PaymentMethod.CreditCard) {
    amount *= 0.8;
  }
  
  if (payment === PaymentMethod.Cash && delivery === Delivery.Express) {
    throw new Error("現金支払いはお急ぎ便を利用できません");
  }
  
  const title = (payment === PaymentMethod.Cash) ? 
    "現金でのお支払い" : 
    "カードでのお支払い";
  
  return `${title}：${amount}`;
}
```

この関数は関心事が多すぎます。決済日や配送の日時指定が新たな仕様として加わると、巨大化が加速するか、もしくは似たような関数が乱立します。もし別の注文と重ねて一緒に配送する、という仕様が加わった場合はごっそり作り変える必要が出てきます。

**AbstractFactory** パターンは「抽象クラスのファクトリ」を通す事によって関心事を派生クラスに分離する事ができるパターンです。
