import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScullyRouteProvider {
  constructor(private scullyRoutesService: ScullyRoutesService) {}

  fetch(): Observable<ScullyRoute[]> {
    return this.scullyRoutesService.available$.pipe(take(1));
  }
}
