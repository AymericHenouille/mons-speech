import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';

const MODULES: (Type<any> | ModuleWithProviders<any>)[] = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth())
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES]
})
export class FireModule { }
