import { PlatformRef, enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.development';

if (environment.production) {
  enableProdMode();
}

const platform: PlatformRef = platformBrowser();
platform.bootstrapModule(AppModule)
  .catch(err => console.error(err));
