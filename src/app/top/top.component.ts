import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  links$: Observable<ScullyRoute[]> = this.scully.available$.pipe(
    map((links) => links.filter((v) => v.route !== '/')),
    tap((v) => console.log(v))
  );

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit() {}
}
