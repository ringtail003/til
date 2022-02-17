import { Injectable } from '@angular/core';

export interface Snippet {
  text: string;
  requiredNewLine?: boolean;
  requiredWhiteSpace?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SnippetConverter {
  insert(source: string, start: number, end: number, snippet: Snippet): string {
    return [
      source.substring(0, start),
      snippet.requiredNewLine && source[start - 1] !== '\n' ? '\n' : '',
      snippet.requiredWhiteSpace ? ' ' : '',
      snippet.text,
      snippet.requiredNewLine && source[end] !== '\n' ? '\n' : '',
      source.substring(end),
    ].join('');
  }
}
