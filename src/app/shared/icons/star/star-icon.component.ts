import { Component, OnInit } from '@angular/core';
import { BaseIconComponent } from 'src/app/shared/icons/base-icon.component';

@Component({
  selector: 'star-icon',
  templateUrl: './star-icon.component.html',
})
export class StarIconComponent extends BaseIconComponent implements OnInit {
  ngOnInit(): void {}
}
