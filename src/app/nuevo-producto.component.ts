import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Nuevo producto</h2>
    <form (ngSubmit)="guardar()">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        [(ngModel)]="nombre"
        required
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        [(ngModel)]="precio"
        required
      />
      <label>
        <input type="checkbox" name="disponible" [(ngModel)]="disponible" />
        Disponible
      </label>
      <button type="submit">Guardar</button>
    </form>

    @if (mensaje()) {
      <p>{{ mensaje() }}</p>
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
