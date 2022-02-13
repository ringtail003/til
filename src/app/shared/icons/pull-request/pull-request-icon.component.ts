import { Component, OnInit } from '@angular/core';
import { BaseIconComponent } from 'src/app/shared/icons/base-icon.component';

@Component({
  selector: 'pull-request-icon',
  templateUrl: './pull-request-icon.component.html',
})
export class PullRequestIconComponent
  extends BaseIconComponent
  implements OnInit
{
  ngOnInit(): void {}
}
