import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SnippetKey } from 'src/app/pages/new-post/components/snippet-converter.service';

@Component({
  selector: 'snippet-buttons',
  templateUrl: './snippet-buttons.component.html',
})
export class SnippetButtonsComponent implements OnInit {
  @Output() onSelect = new EventEmitter<SnippetKey>();

  constructor() {}

  ngOnInit(): void {}

  onSelectH1(): void {
    this.onSelect.emit('h1');
  }

  onSelectH2(): void {
    this.onSelect.emit('h2');
  }

  onSelectH3(): void {
    this.onSelect.emit('h3');
  }

  onSelectBold(): void {
    this.onSelect.emit('bold');
  }

  onSelectList(): void {
    this.onSelect.emit('list');
  }

  onSelectCode(): void {
    this.onSelect.emit('code');
  }

  onSelectCodeBlock(): void {
    this.onSelect.emit('codeBlock');
  }
}
