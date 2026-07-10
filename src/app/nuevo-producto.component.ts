import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2 style="color: #2d3748; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #ed8936; padding-bottom: 5px;">Nuevo Producto</h2>

    <form (ngSubmit)="guardar()" style="display: flex; flex-direction: column; gap: 15px;">
      <div>
        <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            [(ngModel)]="nombre"
            required
            style="width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 5px; box-sizing: border-box;"
        />
      </div>

      <div>
        <input
            type="number"
            name="precio"
            placeholder="Precio (Ej: 12.50)"
            [(ngModel)]="precio"
            required
            style="width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 5px; box-sizing: border-box;"
        />
      </div>

      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="checkbox" name="disponible" [(ngModel)]="disponible" id="disp" style="width: 18px; height: 18px;" />
        <label for="disp" style="color: #4a5568; cursor: pointer;">Disponible para la venta</label>
      </div>

      <button type="submit" style="background: #4299e1; color: white; border: none; padding: 12px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: background 0.2s;">
        Guardar Producto
      </button>
    </form>

    @if (mensaje()) {
      <p style="margin-top: 15px; padding: 10px; background: #ebf8ff; color: #2b6cb0; border-radius: 5px; font-size: 14px; font-weight: 500;">
        {{ mensaje() }}
      </p>
    }
  `,
})
export class NuevoProductoComponent {
  private readonly servicio = inject(ProductoService);

  // Emite un evento cuando la creación tiene éxito, para que el padre refresque la lista.
  creado = output<void>();

  nombre = '';
  precio: number | null = null;
  disponible = true;
  mensaje = signal('');

  guardar(): void {
    if (!this.nombre || this.precio === null) {
      this.mensaje.set('Complete nombre y precio.');
      return;
    }

    const nuevo = {
      nombre: this.nombre,
      precio: this.precio,
      disponible: this.disponible,
    };

    // subscribe() DISPARA la petición. Sin él, el Observable no se ejecuta.
    this.servicio.crear(nuevo).subscribe({
      next: (creado) => {
        this.mensaje.set(`Creado con id ${creado.id}`); // 201 Created
        this.nombre = '';
        this.precio = null;
        this.disponible = true;
        this.creado.emit();
      },
      error: (e) => this.mensaje.set(`No se pudo crear: ${e.status}`),
    });
  }
}
