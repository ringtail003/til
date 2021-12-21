import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit {
  ngOnInit() {}

  constructor() {}
}
