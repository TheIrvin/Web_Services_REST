import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// La configuración de la aplicación es un objeto de proveedores (providers).
export const appConfig: ApplicationConfig = {
  providers: [
    // Registra HttpClient para poder inyectarlo en servicios y componentes.
    // En Angular 22 no hace falta withFetch(): Fetch ya es el backend por defecto.
    provideHttpClient(),
  ],
};
