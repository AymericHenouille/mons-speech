import { Component } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { BrotherService } from './features/data/services/brother.service';
import { SpeechService } from './features/data/services/speech.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>

    <pre>{{truc$ | async | json}}</pre>
  `
})
export class AppComponent {

  public truc$ = this.speechService.speechs$;

  public constructor(
    private readonly authService: AuthService,
    private readonly brothersService: BrotherService,
    private readonly speechService: SpeechService,
  ) { }

  public async login(): Promise<void> {
    await this.authService.login();
  }

  public async logout(): Promise<void> {
    await this.authService.logout();
  }

}
