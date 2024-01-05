import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, reauthenticateWithPopup, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';

@Injectable()
export class AuthService {

  public static readonly SCOPES: string[] = [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ];

  public constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) { }

  public get user(): Observable<User | null> {
    return user(this.auth);
  }

  public get accessToken(): Observable<string> {
    return authState(this.auth).pipe(
      filter((user): user is User => !!user),
      switchMap((user) => reauthenticateWithPopup(user, new GoogleAuthProvider().addScope(AuthService.SCOPES[0]))),
      map((result) => GoogleAuthProvider.credentialFromResult(result)),
      map((credential) => credential?.accessToken ?? ''),
    )
  }

  public async login(): Promise<void> {
    const provider = new GoogleAuthProvider();
    for (const scope of AuthService.SCOPES) {
      provider.addScope(scope);
    }
    await signInWithPopup(this.auth, provider);
  }

  public async logout(): Promise<boolean> {
    await signOut(this.auth);
    return this.router.navigate(['/']);
  }

}
