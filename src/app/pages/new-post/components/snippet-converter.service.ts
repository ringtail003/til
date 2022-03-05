import { Injectable } from '@angular/core';
import { RectSnippet, RowSnippet } from 'src/app/pages/new-post/models/snippet';

const snippets = {
  h1: {
    type: 'insert',
    notation: '#',
  },
  h2: {
    type: 'insert',
    notation: '##',
  },
  h3: {
    type: 'insert',
    notation: '###',
  },
  list: {
    type: 'insert',
    notation: '-',
  },
  code: {
    type: 'enclose',
    notation: '`',
  },
  bold: {
    type: 'enclose',
    notation: '**',
  },
  codeBlock: {
    type: 'block',
    notation: '```',
  },
};
export type SnippetKey = keyof typeof snippets;

@Injectable({
  providedIn: 'root',
})
export class SnippetConverter {
  convert(
    source: string,
    startSelection: number,
    endSelection: number,
    snippetKey: SnippetKey
  ): string {
    const snippet = snippets[snippetKey];

    if (!snippet) {
      throw new Error(`Unsupported snippet. [${snippetKey}]`);
    }

    if (snippet.type === 'insert') {
      return new RowSnippet(
        source,
        startSelection,
        endSelection,
        snippet.notation
      ).insert();
    }

    if (snippet.type === 'enclose') {
      return new RectSnippet(
        source,
        startSelection,
        endSelection,
        snippet.notation
      ).enclose();
    }

    if (snippet.type === 'block') {
      return new RowSnippet(
        source,
        startSelection,
        endSelection,
        snippet.notation
      ).block();
    }

    throw new Error(`No implementation for snippet type. [${snippet.type}]`);
  }
}
