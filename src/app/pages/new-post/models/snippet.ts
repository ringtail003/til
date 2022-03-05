export class Snippet {
  protected selection: {
    head: string;
    text: string;
    tail: string;
  } = {
    head: '',
    text: '',
    tail: '',
  };

  protected notation = '';

  enclose(): string {
    return (
      this.selection.head +
      ` ${this.notation}${this.selection.text}${this.notation} ` +
      this.selection.tail
    );
  }

  block(): string {
    return (
      this.selection.head +
      `\n${this.notation}\n${this.selection.text}\n${this.notation}` +
      this.selection.tail
    );
  }

  insert(): string {
    return (
      this.selection.head +
      this.selection.text
        .split('\n')
        .map((v) => {
          if (!v || v.startsWith(`${this.notation} `)) {
            return v;
          }

          return `${this.notation} ${v}`;
        })
        .join('\n') +
      this.selection.tail
    );
  }
}

export class RowSnippet extends Snippet {
  constructor(
    source: string,
    startSelection: number,
    endSelection: number,
    notation: string
  ) {
    super();
    this.notation = notation;

    const start = source.substring(0, startSelection).lastIndexOf('\n') + 1;
    const end =
      `${source.substring(endSelection)}\n`.indexOf('\n') + endSelection;

    this.selection = {
      head: source.substring(0, start),
      text: source.substring(start, end),
      tail: source.substring(end),
    };
  }
}

export class RectSnippet extends Snippet {
  constructor(
    source: string,
    startSelection: number,
    endSelection: number,
    notation: string
  ) {
    super();
    this.notation = notation;

    this.selection = {
      head: source.substring(0, startSelection),
      text: source.substring(startSelection, endSelection),
      tail: source.substring(endSelection),
    };
  }
}
