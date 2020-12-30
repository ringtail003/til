import { NgModule } from '@angular/core';
import { LogoAngularComponent } from 'src/app/components/icons/logo-angular/logo-angular.component';
import { LogoFirebaseComponent } from 'src/app/components/icons/logo-firebase/logo-firebase.component';
import { LogoGithubActionsComponent } from 'src/app/components/icons/logo-github-actions/logo-github-actions.component';
import { LogoGithubComponent } from 'src/app/components/icons/logo-github/logo-github.component';
import { LogoScullyComponent } from 'src/app/components/icons/logo-scully/logo-scully.component';
import { ViewListIconComponent } from 'src/app/components/icons/view-list/view-list-icon.component';

const components = [
  ViewListIconComponent,
  LogoAngularComponent,
  LogoFirebaseComponent,
  LogoGithubComponent,
  LogoGithubActionsComponent,
  LogoScullyComponent,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class IconsModule {}
