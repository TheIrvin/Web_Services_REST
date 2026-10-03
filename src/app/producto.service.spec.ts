import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.restoreAllMocks();
  });

  it('lists products from the collection endpoint', () => {
    const products: Producto[] = [
      { id: '1', nombre: 'Cuaderno', precio: 3.5, disponible: true },
    ];
    let result: Producto[] | undefined;

    service.listar().subscribe((value) => (result = value));

    const request = http.expectOne('/api/productos');
    expect(request.request.method).toBe('GET');
    request.flush(products);
    expect(result).toEqual(products);
  });

  it('gets a product by id', () => {
    const product: Producto = {
      id: '7',
      nombre: 'Lápiz',
      precio: 0.75,
      disponible: true,
    };
    let result: Producto | undefined;

    service.obtener('7').subscribe((value) => (result = value));

    const request = http.expectOne('/api/productos/7');
    expect(request.request.method).toBe('GET');
    request.flush(product);
    expect(result).toEqual(product);
  });

  it('posts a product without an id', () => {
    const newProduct = { nombre: 'Regla', precio: 1.25, disponible: true };
    const createdProduct: Producto = { id: '9', ...newProduct };
    let result: Producto | undefined;

    service.crear(newProduct).subscribe((value) => (result = value));

    const request = http.expectOne('/api/productos');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newProduct);
    request.flush(createdProduct);
    expect(result).toEqual(createdProduct);
  });

  it('replaces a product with PUT', () => {
    const product: Producto = {
      id: '4',
      nombre: 'Marcador',
      precio: 2.1,
      disponible: false,
    };
    let result: Producto | undefined;

    service.actualizar('4', product).subscribe((value) => (result = value));

    const request = http.expectOne('/api/productos/4');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(product);
    request.flush(product);
    expect(result).toEqual(product);
  });

  it('deletes a product by id', () => {
    let completed = false;

    service.eliminar('3').subscribe(() => (completed = true));

    const request = http.expectOne('/api/productos/3');
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
    expect(completed).toBe(true);
  });

  it('logs and propagates a not-found response', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    let status: number | undefined;

    service.obtener('404').subscribe({
      error: (error: { status: number }) => (status = error.status),
    });

    http.expectOne('/api/productos/404').flush('Not found', {
      status: 404,
      statusText: 'Not Found',
    });

    expect(consoleError).toHaveBeenCalledWith('Recurso no encontrado (404)');
    expect(status).toBe(404);
  });
});
