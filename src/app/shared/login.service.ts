import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import * as Rx from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private authentication: {
    token: string;
    auth: Auth;
  } | null = null;

  login$ = new Rx.Subject<boolean>();

  constructor() {
    initializeApp(environment.firebaseConfig);
  }

  isLoggedIn(): boolean {
    return !!this.authentication;
  }

  login(): Rx.Observable<void> {
    const provider = new GithubAuthProvider();
    provider.addScope('repo');

    const auth = getAuth();

    return Rx.from(signInWithPopup(auth, provider)).pipe(
      Rx.tap((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);

        this.authentication = {
          auth,
          token: credential?.accessToken!,
        };

        this.login$.next(true);
      }),
      Rx.map(() => {}),
      Rx.catchError((error) => {
        throw new Error('Failed GitHub authentication.');
      })
    );
  }

  logout(): Rx.Observable<void> {
    if (!this.isLoggedIn()) {
      return Rx.of();
    }

    return Rx.from(signOut(this.authentication!.auth)).pipe(
      Rx.tap(() => {
        this.authentication = null;
        this.login$.next(false);
      })
    );
  }
}
