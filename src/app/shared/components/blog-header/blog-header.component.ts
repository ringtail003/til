import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'blog-header',
  templateUrl: './blog-header.component.html',
})
export class BlogHeaderComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  onLogin(): void {
    this.loginService
      .login()
      .pipe(
        Rx.tap(() => (this.isLoggedIn = true)),
        Rx.catchError((e) => {
          console.error(e.message);
          return Rx.EMPTY;
        })
      )
      .subscribe();
  }

  onLogout(): void {
    this.loginService
      .logout()
      .pipe(
        Rx.tap(() => {
          this.isLoggedIn = false;
        }),
        Rx.catchError((e) => {
          console.error(e.message);
          return Rx.EMPTY;
        })
      )
      .subscribe();
  }
}
