import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { IconModule } from 'src/app/components/icons/module';
import { TopComponent } from './top/top.component';

@NgModule({
  declarations: [	AppComponent,
      TopComponent
   ],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule, IconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
