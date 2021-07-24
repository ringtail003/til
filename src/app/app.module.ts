import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ComponentModule } from 'src/app/components/module';
import { TagComponent } from 'src/app/components/tag/tag.component';
import { TopComponent } from 'src/app/components/top/top.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, TopComponent, TagComponent],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule, ComponentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
