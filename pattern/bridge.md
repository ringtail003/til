## Implementer: メインの処理の派生パターン

共通のインターフェースを持つ派生パターンを宣言する。

```typescript
abstract class SortImpl<T> {
  sort(array: T[]): T[] {}
}
```

```typescript
class BubbleSortImpl extends SortImpl {
  sort(array: T[]): T[] {...}
}
```

```typescript
class QuickSortImpl extends SortImpl {
  sort(array: T[]): T[] {...}
}
```

## Abstraction: メインの処理と操作の橋渡し

```typescript
class Sorter {
  private impl: SortImpl = null;
  
  constructor(impl: SortImpl) {
    this.impl = impl;
  }
  
  sort(array: T[]): T[] {
    this.impl.sort();
  }
}
```

## RefineAbstraction: 操作の派生パターン

```typescript
class TimerSorter extends Sorter {
  constructor(impl: SotrImpl) {
    super(impl);
  }
  
  sort(array: T[]): T[] {
    console.time();
    super.sort(array);
    console.timeEnd();
  }
}
```
