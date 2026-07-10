import { Component, viewChild } from '@angular/core';
import { ListaProductosComponent } from './lista-productos.component';
import { NuevoProductoComponent } from './nuevo-producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductosComponent, NuevoProductoComponent],
  template: `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;">

      <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a202c; margin-bottom: 5px;">Consumo de Web Services REST con Angular 22</h1>
      </header>

      <div style="display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between;">

        <section style="flex: 1 1 400px; background: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <app-nuevo-producto (creado)="lista().productos.reload()" />
        </section>

        <section style="flex: 1.5 1 500px; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <app-lista-productos />
        </section>

      </div>
    </div>
  `,
})
export class AppComponent {
  // Referencia a la instancia del hijo para poder llamar a productos.reload()
  // cuando NuevoProductoComponent emite el evento "creado" tras un POST exitoso.
  lista = viewChild.required(ListaProductosComponent);
}
