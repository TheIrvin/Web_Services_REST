import { Component, viewChild } from '@angular/core';
import { ListaProductosComponent } from './lista-productos.component';
import { NuevoProductoComponent } from './nuevo-producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductosComponent, NuevoProductoComponent],
  template: `
    <h1>Consumo de Web Services REST con Angular 22</h1>
    <p>Aplicaciones Web · Ingeniería de Software · UTEQ</p>

    <app-nuevo-producto (creado)="lista().productos.reload()" />

    <app-lista-productos />
  `,
})
export class AppComponent {
  // Referencia a la instancia del hijo para poder llamar a productos.reload()
  // cuando NuevoProductoComponent emite el evento "creado" tras un POST exitoso.
  lista = viewChild.required(ListaProductosComponent);
}
