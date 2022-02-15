import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'new-post-viewer',
  templateUrl: './new-post-viewer.component.html',
})
export class NewPostViewerComponent implements OnInit {
  @Input() updatedAt!: Date;
  @Input() title!: string;
  @Input() body!: string;

  ngOnInit(): void {}
}
