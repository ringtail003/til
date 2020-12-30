# TemplateMethod パターン

タイトルと本文を持つインターフェースを、マークダウンまたは HTML にフォーマットする例です。

```TypeScript
/*
AbstractClass
*/
abstract class ItemFormatter {
  constructor(protected item: Item) {}

  format(): string {
    return this.getTitle() +
      this.getDivider() +
      this.getList() +
      this.getDivider() +
      this.getBody();
  }
  abstract getTitle(): string;
  abstract getList(): string;
  abstract getBody(): string;
  abstract getDivider(): string;
}

interface Item {
  title: string;
  list: string[];
  body: string;
}

/*
ConcreteClass
*/
class MarkdownItemFormatter extends ItemFormatter {
  getTitle = () => "#" + this.item.title;
  getList = () => this.item.list.map(item => `- ${item}`).join("\r\n");
  getBody = () => this.item.body;
  getDivider = () => "---";
}

class HtmlItemFormatter extends ItemFormatter {
  getTitle = () => `<h1>${this.item.title}</h1>`;
  getList = () => "<ul>" + this.item.list.map(item => `<li>${item}<li>`).join("") + "</ul>";
  getBody = () => `<div>${this.item.body}</div>`;
  getDivider = () => "<hr>";
}
```

# 説明

## AbstractClass

*TemplateMethod* で登場するのは抽象クラスです。抽象クラスは派生クラスのメソッドを呼び出す役割をします。

```TypeScript
/*
AbstractClass
*/
abstract class ItemFormatter {
  constructor(protected item: Item) {}

  format(): string {
    return this.getTitle() +
      this.getDivider() +
      this.getList() +
      this.getDivider() +
      this.getBody();
  }
  
  abstract getTitle(): string;
  abstract getList(): string;
  abstract getBody(): string;
  abstract getDivider(): string;
}

interface Item {
  title: string;
  list: string[];
  body: string;
}
```

## ConcreteClass

機能は派生クラスで実装します。この例では、マークダウンへのフォーマット、HTML へのフォーマットをそれぞれの派生クラスが専任します。

```TypeScript
/*
ConcreteClass
*/
class MarkdownItemFormatter extends ItemFormatter {
  getTitle = () => "# " + this.item.title;
  getList = () => this.item.list.map(item => `- ${item}`).join("\r\n");
  getBody = () => this.item.body;
  getDivider = () => "---";
}

class HtmlItemFormatter extends ItemFormatter {
  getTitle = () => `<h1>${this.item.title}</h1>`;
  getList = () => "<ul>" + this.item.list.map(item => `<li>${item}<li>`).join("") + "</ul>";
  getBody = () => `<div>${this.item.body}</div>`;
  getDivider = () => "<hr>";
}
```

## 利用例

```TypeScript
const item = {
  title: "2020/09/22 日報",
  list: ["10:30 チームミーティング"],
  body: "明日からやる気出します",
};

new MarkdownItemFormatter(item).format();

// # 2020/09/22 日報
// ---
// - 10:30 チームMTG
// ---
// 明日からやる気出します

new HtmlItemFormatter(item).format();

// <h1>2020/09/22 日報</h1>
// <hr>
// <ul><li>10:30 チームMTG</li></ul>
// <hr>
// <div>明日からやる気出します</div>
```

# このパターンが解決する問題

ありがちなのが `type` のような定数による分岐です。

```TypeScript
class ItemFormatter {
  format(item: Item, type: string): string {
    if (type === "markdown") {
      ...
    }
    if (type === "html") {
      ...
    }
  }
}
```

このようなケースでの if による分岐はお勧めしません。`&&` や `||` で安易に条件を追加しがちで、修正を重ねるごとに読みづらいコードに変化していきます。また一つのクラスの中であれこれ仕事をしようとするとコードが巨大になりがちで、ほんの少しの修正でもうっかり他のメソッドに影響を及ぼす可能性が出てきます。SOLID の原則でいう **修正に対してクローズド** に反した状態です。

**TemplateMethod** パターンは、共通化した振る舞いを「テンプレートメソッド」として抽出し分岐を派生クラスとして表現する事によって、修正をクローズドなものにできるパターンです。
