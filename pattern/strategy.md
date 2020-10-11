デザインパターンをTypeScriptで学ぶ（Adapter）

デザインパターンと言えば [TECHSCORE](https://www.techscore.com/tech/DesignPattern/index.html/) さんの記事が有名ですね。時々「このコード、何かのパターンで表現できそう...」と思うのですが、日常業務でデザインパターンをサッとかっこよく使う事ができていません。という訳で TECHSCORE さんの記事を読みつつ、自分の中で噛み砕いた知識を TypeScript のコードで書き起こしてみようと思います。

- 対象読者：Java のコードを読むのに苦戦する人（自分！！）
- 環境：typescript 4.0

23 パターン全部まとめたら記事同士のリンクを貼ろうと思います。

# Strategyパターン

アプリケーションの設定で、日付の書式を切り替える例です。[Luxon v1.25](https://moment.github.io/luxon/index.html) を使っています。

```TypeScript
/*
Strategy
*/
enum DateFormatStrategy {
  Slash = "Slash",
  Kanji = "Kanji",
}

const userConfigs = {
  dateFormatStrategy: DateFormatStrategy.Slash,
} as const;

/*
ConcreteStrategy
*/
interface DateFormatter {
  format(date: Date): string;
}

class SlashDateFormatter implements DateFormatter {
  ...
}

class KanjiDateFormatter implements DateFormatter {
  ...
}

/*
Context
*/
class DateFormatterImpl implements DateFormatter {
  format(date: Date): string {
    switch (userConfigs.dateFormatStrategy) {
      case DateFormatStrategy.Slash: return new SlashDateFormatter().format(date);
      case DateFormatStrategy.Kanji: return new KanjiDateFormatter().format(date);
      default: throw new Error("サポートしていません");
    }
  }
}

class Report {
  create(date: Date, comment: string): string {
    return `${new DateFormatterImpl().format(date)} ${comment}`;
  }
}
```

# 説明

## Strategy

**Strategy** パターンのフロントエンドでの有用性を示すために、あえて Enum で表現しています。設定値を定数で切り替え可能にしておくと、そのまま DB に保存する事が可能になり、また直接 `new` する事がないのでテスタビリティも向上します。

```TypeScript
/*
Strategy
*/
enum DateFormatStrategy {
  Slash = "Slash",
  Kanji = "Kanji",
}

const userConfigs = {
  dateFormatStrategy: DateFormatStrategy.Slash,
};
```

## ConcreteStrategy

**Strategy** パターンによって差し替え可能にする実装のバリエーションです。日付の書式は `2020/09/21` や `9月21日（月）` や `1日前` など、いろいろなバリエーションが考えられます。

```TypeScript
/*
ConcreteStrategy
*/
interface DateFormatter {
  format(date: Date): string;
}

class SlashDateFormatter implements DateFormatter {
  // "2020/9/21"
  format (date: Date): string {
    return luxon.DateTime
      .fromJSDate(date)
      .setLocale('ja-JP')
      .toLocaleString(luxon.DateTime.DATE_SHORT);
  }
}

class KanjiDateFormatter implements DateFormatter {
  // "2020年9月21日"
  format (date: Date): string {
    return luxon.DateTime
      .fromJSDate(date)
      .setLocale('ja-JP')
      .toLocaleString(luxon.DateTime.DATE_FULL);
  }
}
```

## Context

**Strategy** の決定と、実行コンテキストとして具体的な Date オブジェクトを渡します。

```TypeScript
/*
Context
*/
class DateFormatterImpl implements DateFormatter {
  format(date: Date): string {
    switch (userConfigs.dateFormatStrategy) {
      case DateFormatStrategy.Slash: return new SlashDateFormatter().format(date);
      case DateFormatStrategy.Kanji: return new KanjiDateFormatter().format(date);
      default: throw new Error("サポートしていません");
    }
  }
}

class Report {
  create(date: Date, comment: string): string {
    return `${new DateFormatterImpl().format(date)} ${comment}`;
  }
}
```

## 利用例

コンテキストをどのような書式で出力するのか、実行時に決定する事ができます。

```TypeScript
// 2020/9/21 今日は仕事が捗りました
appConfigs.dateFormatStrategy = DateFormatStrategy.Slash;
new Report().create(new Date(), "今日は仕事が捗りました");

// 2020年9月21日 凡ミスで1時間が溶けました
appConfigs.dateFormatStrategy = DateFormatStrategy.Kanji;
new Report().create(new Date(), "凡ミスで1時間が溶けました");
```

# このパターンが解決する問題 

**Strategy** とよく比較されるのが if による分岐です。

```TypeScript
class Report {
  create(date: Date, comment: string, type: string): string {
    if (type === "slash") {
      return "2020/09/21" + comment;
    }
    if (type === "kanji") {
      return "2020/09/21" + comment;
    }
    ...
  }
}
```

このようなコードは条件が複雑になるにつれ if のネストも深くなります。`&&` や `||` を使った複数の条件が加わるとさらに複雑さを増し、読みづらく仕様変更に弱いコードとされています。

**Strategy** は「戦略」の差し替えによってポリモーフィズムを実現し、コンテキストと振る舞いを分離させる事ができるパターンです。
