import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CurrencyPipe],
  // Plantilla moderna con Flexbox y separadores
  template: `
    <h2 style="color: #2d3748; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #4299e1; padding-bottom: 5px;">Productos</h2>

    @if (productos.isLoading()) {
      <p style="color: #4a5568; font-style: italic;">Cargando...</p>
    } @else if (productos.error()) {
      <p style="color: #e53e3e; background: #fff5f5; padding: 10px; border-radius: 5px; font-weight: 500;">
        Error al cargar los productos.
      </p>
    } @else {
      <div style="display: flex; flex-direction: column; gap: 12px;">
        @for (p of productos.value(); track p.id) {

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">

            <div>
              <strong style="color: #2d3748; font-size: 16px;">{{ p.nombre }}</strong>

              <span style="margin-left: 10px; padding: 2px 8px; font-size: 12px; border-radius: 12px; font-weight: 500; background: {{ p.disponible ? '#e6fffa' : '#fff5f5' }}; color: {{ p.disponible ? '#319795' : '#e53e3e' }};">
                {{ p.disponible ? 'Disponible' : 'Agotado' }}
              </span>

              <div style="color: #718096; font-size: 14px; margin-top: 4px;">
                Precio: {{ p.precio | currency }}
              </div>
            </div>

            <button
                type="button"
                (click)="eliminar(p.id)"
                style="background: #fed7d7; color: #9b2c2c; border: none; padding: 8px 14px; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 14px; transition: background 0.2s;"
                onmouseover="this.style.background='#feb2b2'"
                onmouseout="this.style.background='#fed7d7'"
            >
              Eliminar
            </button>

          </div>
        }
      </div>
    }
  `,
})
export class ListaProductosComponent {
  private readonly servicio = inject(ProductoService);

  productos = httpResource<Producto[]>(() => '/api/productos');

  eliminar(id: number): void {
    this.servicio.eliminar(id).subscribe({
      next: () => this.productos.reload(),
      error: (e) => console.error('No se pudo eliminar:', e.status),
    });
  }
}