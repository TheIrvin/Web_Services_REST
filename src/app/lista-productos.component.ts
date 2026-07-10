import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CurrencyPipe],
  // Plantilla con la nueva sintaxis de control de flujo (@if / @for).
  template: `
    <h2>Productos</h2>

    @if (productos.isLoading()) {
      <p>Cargando...</p>
      <!-- estado de carga -->
    } @else if (productos.error()) {
      <p class="error">Error al cargar los productos.</p>
      <!-- estado de error -->
    } @else {
      <ul>
        @for (p of productos.value(); track p.id) {
          <li>
            {{ p.nombre }} — {{ p.precio | currency }}
            <span>{{ p.disponible ? '(disponible)' : '(agotado)' }}</span>
            <button type="button" (click)="eliminar(p.id)">Eliminar</button>
          </li>
        }
      </ul>
    }
  `,
})
export class ListaProductosComponent {
  private readonly servicio = inject(ProductoService);

  // httpResource realiza el GET y devuelve señales de estado.
  // La función se re-evalúa si alguna señal interna cambia (reactividad).
  productos = httpResource<Producto[]>(() => '/api/productos');

  // DELETE + refresco de la lista (entregable: punto c).
  eliminar(id: number): void {
    this.servicio.eliminar(id).subscribe({
      // reload() vuelve a disparar el GET de httpResource para refrescar la vista.
      next: () => this.productos.reload(),
      error: (e) => console.error('No se pudo eliminar:', e.status),
    });
  }
}
