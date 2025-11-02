import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config.component';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

appConfig.providers = [
  ...(appConfig.providers || []),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
