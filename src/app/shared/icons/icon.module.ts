import { NgModule } from '@angular/core';
import { EditIconComponent } from 'src/app/shared/icons/edit/edit-icon.component';
import { LogoGithubComponent } from 'src/app/shared/icons/logo-github/logo-github.component';
import { LogoTwitterComponent } from 'src/app/shared/icons/logo-twitter/logo-twitter.component';
import { PullRequestIconComponent } from 'src/app/shared/icons/pull-request/pull-request-icon.component';
import { RightAllowSquareIconComponent } from 'src/app/shared/icons/right-allow-square/right-allow-square-icon.component';
import { RocketIconComponent } from 'src/app/shared/icons/rocket/rocket-icon.component';
import { StarIconComponent } from 'src/app/shared/icons/star/star-icon.component';

const components = [
  RightAllowSquareIconComponent,
  StarIconComponent,
  RocketIconComponent,
  LogoGithubComponent,
  LogoTwitterComponent,
  EditIconComponent,
  PullRequestIconComponent,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class IconModule {}
