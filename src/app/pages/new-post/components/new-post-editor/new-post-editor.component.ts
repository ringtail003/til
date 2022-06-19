import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  SnippetConverter,
  SnippetKey,
} from 'src/app/pages/new-post/components/snippet-converter.service';
import { Tag } from 'src/app/pages/new-post/models/tag';

@Component({
  selector: 'new-post-editor',
  templateUrl: './new-post-editor.component.html',
})
export class NewPostEditorComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() tags!: Tag[];

  @ViewChild('bodyElement', { static: false }) bodyElement!: ElementRef;

  @Output() changeTitle = new EventEmitter<string>();
  @Output() changeBody = new EventEmitter<string>();
  @Output() selectTag = new EventEmitter<Tag>();
  @Output() deselectTag = new EventEmitter<Tag>();
  @Output() addTag = new EventEmitter<string>();

  constructor(private snippetConverter: SnippetConverter) {}

  ngOnInit(): void {}

  onSelectSnippet(snippetKey: SnippetKey): void {
    const element = this.bodyElement.nativeElement as HTMLTextAreaElement;

    const body = this.snippetConverter.convert(
      this.body,
      element.selectionStart,
      element.selectionEnd,
      snippetKey
    );

    this.bodyElement.nativeElement.value = body;
    this.changeBody.emit(body);
  }

  onSelectTag(tag: Tag): void {
    this.selectTag.emit(tag);
  }

  onDeselectTag(tag: Tag): void {
    this.deselectTag.emit(tag);
  }

  onAddTag(tag: string): void {
    this.addTag.emit(tag);
  }
}
