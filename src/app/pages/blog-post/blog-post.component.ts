import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { BlogPost } from 'src/app/pages/blog-post/models/blog-post';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  preserveWhitespaces: true, // TODO: これなに
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogPostComponent implements OnInit {
  blogPost!: BlogPost;

  ngOnInit() {}

  constructor(private scully: ScullyRoutesService) {
    this.scully.getCurrent().subscribe((blogPost) => {
      this.blogPost = new BlogPost({
        title: blogPost.title!,
        updatedAt: new Date(blogPost.updatedAt),
      });
    });
  }
}
