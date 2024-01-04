import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  template: '<button (click)="login()">Login</button>'
})
export class AppComponent {

  public constructor(
    private auth: Auth,
  ) { }

  public async login(): Promise<void> {
    const authProvider: GoogleAuthProvider = new GoogleAuthProvider();
    authProvider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');
    const credential: UserCredential | null = await signInWithPopup(this.auth, authProvider);
    if (credential) {
      const sheets = google.sheets({ version: 'v4', auth: credential.providerId ?? '' });
      // const response = await sheets.spreadsheets.values.get({
      //   spreadsheetId: '1RguIJuPPRJkBwg9t9plm3vQGrNOC5-VShUN8iFMCK7U',
      //   range: 'B4',
      // });
      // console.log(response.data.values);
    }
  }

}
