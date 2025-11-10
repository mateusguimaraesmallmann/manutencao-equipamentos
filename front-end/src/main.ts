import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config.component';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { AppComponent } from './app/app.component';

registerLocaleData(pt);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));