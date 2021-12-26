import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  Article,
  ArticleLike,
  create,
} from 'src/app/pages/list/models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnChanges {
  @Input() post!: ArticleLike;

  article!: Article;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.article = create(this.post);
  }
}
