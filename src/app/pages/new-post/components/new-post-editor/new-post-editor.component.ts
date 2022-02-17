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
  Snippet,
  SnippetConverter,
} from 'src/app/pages/new-post/components/snippet-converter.service';

@Component({
  selector: 'new-post-editor',
  templateUrl: './new-post-editor.component.html',
})
export class NewPostEditorComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;

  @ViewChild('bodyElement', { static: false }) bodyElement!: ElementRef;

  @Output()
  onChangeTitle = new EventEmitter<string>();
  @Output() onChangeBody = new EventEmitter<string>();

  constructor(private snippetConverter: SnippetConverter) {}

  ngOnInit(): void {}

  onInsertSnippet(snippet: Snippet): void {
    const element = this.bodyElement.nativeElement as HTMLTextAreaElement;

    const body = this.snippetConverter.insert(
      this.body,
      element.selectionStart,
      element.selectionEnd,
      snippet
    );

    this.bodyElement.nativeElement.value = body;
    this.onChangeBody.emit(body);
  }
}
