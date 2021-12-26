import { Component, Input, OnInit } from '@angular/core';
import { BlogIndex } from 'src/app/pages/list/models/blog-index';

@Component({
  selector: 'blog-index',
  templateUrl: './blog-index.component.html',
})
export class BlogIndexComponent implements OnInit {
  @Input() blogIndex!: BlogIndex;

  constructor() {}

  ngOnInit(): void {}
}
