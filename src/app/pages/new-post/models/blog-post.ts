export class BlogPost {
  #title: string;
  #updatedAt: Date;
  #body: string;

  constructor() {
    this.#title = 'サンプルタイトル';
    this.#updatedAt = new Date();
    this.#body = `## 見出し

### 中見出し

    `;
  }

  get title(): string {
    return this.#title;
  }
  set title(value: string) {
    this.#title = value;
  }

  get body(): string {
    return this.#body;
  }
  set body(value: string) {
    this.#body = value;
  }

  get updatedAt(): Date {
    return new Date(this.#updatedAt.getTime());
  }
}
