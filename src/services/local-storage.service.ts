import { Injectable } from '@angular/core';
import { Jornada, LocalStorage, Producto, Transaccion } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  //-------- PRODUCTOS -----------
  guardarProducto(producto: Producto) {
    let listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaProductos));
    if (!listaProductos) {
      localStorage.setItem(LocalStorage.listaProductos, JSON.stringify([]));
      listaProductos = [];
    }
    const existe = listaProductos.filter(item => item.codigo === producto.codigo);
    if (existe.length > 0) { return; };
    listaProductos.push(producto);
    localStorage.setItem(LocalStorage.listaProductos, JSON.stringify(listaProductos));
  }

  eliminarProducto(codigoProducto: string) {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaProductos));
    const indexProd = listaProductos.findIndex(producto => producto.codigo === codigoProducto);
    listaProductos.splice(indexProd, 1);
    localStorage.setItem(LocalStorage.listaProductos, JSON.stringify(listaProductos));
  }

  editarProducto(producto: Producto) {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaProductos));
    const indexProd = listaProductos.findIndex(item => item.codigo === producto.codigo);
    listaProductos.splice(indexProd, 1, producto);
    localStorage.setItem(LocalStorage.listaProductos, JSON.stringify(listaProductos));
  }

  obtenerProducto(codigoProducto: string): Producto | undefined {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaProductos));
    const productoBuscado = listaProductos.find(producto => producto.codigo === codigoProducto);
    return productoBuscado;
  }

  obtenerListaProductos(): Producto[] | undefined {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaProductos));
    return listaProductos;
  }

  //-------- TRANSACCIONES -----------
  guardarTransaccion(transaccion: Transaccion) {
    let listaJornadas: Transaccion[] = JSON.parse(localStorage.getItem(LocalStorage.listaJornadas));
    if (!listaJornadas) {
      localStorage.setItem(LocalStorage.listaJornadas, JSON.stringify([]));
      listaJornadas = [];
    }
    const existe = listaJornadas.filter(item => item.fecha === transaccion.fecha);
    if (existe.length > 1) { return; }
    localStorage.setItem(LocalStorage.listaProductos, JSON.stringify(listaJornadas.push()));
  }

  eliminarTransaccion(codigoProducto: string) {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaJornadas));
    const indexProd = listaProductos.findIndex(producto => producto.codigo === codigoProducto);
    listaProductos.splice(indexProd, 1);
    localStorage.setItem(LocalStorage.listaProductos, JSON.stringify(listaProductos));
  }

  editarTransaccion(producto: Producto) {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaJornadas));
    const indexProd = listaProductos.findIndex(item => item.codigo === producto.codigo);
    listaProductos.splice(indexProd, 1, producto);
    localStorage.setItem(LocalStorage.listaProductos, JSON.stringify(listaProductos));
  }

  obtenerTransaccion(codigoProducto: string): Producto | undefined {
    const listaProductos: Producto[] = JSON.parse(localStorage.getItem(LocalStorage.listaJornadas));
    const productoBuscado = listaProductos.find(producto => producto.codigo === codigoProducto);
    return productoBuscado;
  }

  //-------- JORNADA -----------

  obtenerJornada(idJornada: string): Jornada {
    let listaJornadas: Jornada[] = JSON.parse(localStorage.getItem(LocalStorage.listaJornadas));
    if (!listaJornadas) {
      localStorage.setItem(LocalStorage.listaJornadas, JSON.stringify([]));
      listaJornadas = [];
    }
    const jornada = listaJornadas.find(item => item.id === idJornada);
    if (!jornada) {
      listaJornadas.push(new Jornada(idJornada));
      localStorage.setItem(LocalStorage.listaJornadas, JSON.stringify(listaJornadas));
    }
    return jornada;
  }

}
