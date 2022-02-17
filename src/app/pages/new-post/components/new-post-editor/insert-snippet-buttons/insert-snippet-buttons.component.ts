import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Snippet } from 'src/app/pages/new-post/components/snippet-converter.service';

@Component({
  selector: 'insert-snippet-buttons',
  templateUrl: './insert-snippet-buttons.component.html',
})
export class InsertSnippetButtonsComponent implements OnInit {
  @Output() onInsert = new EventEmitter<Snippet>();

  constructor() {}

  ngOnInit(): void {}

  onInsertH1(): void {
    this.onInsert.emit({ text: '# text', requiredNewLine: true });
  }

  onInsertH2(): void {
    this.onInsert.emit({ text: '## text', requiredNewLine: true });
  }

  onInsertH3(): void {
    this.onInsert.emit({ text: '### text', requiredNewLine: true });
  }

  onInsertList(): void {
    this.onInsert.emit({
      text: `- text
- text`,
      requiredNewLine: true,
    });
  }

  onInsertCode(): void {
    this.onInsert.emit({ text: '`text`', requiredWhiteSpace: true });
  }
}
