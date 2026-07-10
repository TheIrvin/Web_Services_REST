import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// bootstrapApplication arranca la app standalone usando appConfig
// (registra el cliente HTTP y, en Angular 22, la app es zoneless por defecto).
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
