import { Component, OnInit } from '@angular/core';
import { BaseIconComponent } from 'src/app/shared/icons/base-icon.component';

@Component({
  selector: 'rocket-icon',
  templateUrl: './rocket-icon.component.html',
})
export class RocketIconComponent extends BaseIconComponent implements OnInit {
  ngOnInit(): void {}
}
