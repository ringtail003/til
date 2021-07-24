import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ComponentModule } from 'src/app/components/module';
import { TopComponent } from './top/top.component';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  declarations: [AppComponent, TopComponent, TagComponent],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule, ComponentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
