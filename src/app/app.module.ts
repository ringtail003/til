import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ComponentModule } from 'src/app/components/module';
import { TagComponent } from 'src/app/components/tag/tag.component';
import { TopComponent } from 'src/app/components/top/top.component';
import { SplitTagPipe } from 'src/app/pipes/split-tag.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TagsMatchPipe } from './pipes/tags-match.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    TagComponent,
    SidebarComponent,
    TagsMatchPipe,
    SplitTagPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule, ComponentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
