import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SnippetKey } from 'src/app/pages/new-post/components/snippet-converter.service';

@Component({
  selector: 'snippet-buttons',
  templateUrl: './snippet-buttons.component.html',
})
export class SnippetButtonsComponent implements OnInit {
  @Output() selectSnippet = new EventEmitter<SnippetKey>();

  constructor() {}

  ngOnInit(): void {}

  onSelectH1(): void {
    this.selectSnippet.emit('h1');
  }

  onSelectH2(): void {
    this.selectSnippet.emit('h2');
  }

  onSelectH3(): void {
    this.selectSnippet.emit('h3');
  }

  onSelectBold(): void {
    this.selectSnippet.emit('bold');
  }

  onSelectList(): void {
    this.selectSnippet.emit('list');
  }

  onSelectCode(): void {
    this.selectSnippet.emit('code');
  }

  onSelectCodeBlock(): void {
    this.selectSnippet.emit('codeBlock');
  }
}
