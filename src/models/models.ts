export class Producto {
    nombre: string;
    precio: number;
    codigo: string;
    constructor() {
        this.nombre = '';
        this.precio = null;
        this.codigo = '324234';
    }
}

export interface Transaccion {
    listaProductos: Producto[];
    total: number;
    id: string;
    idJornada: string;
    fecha: string;
}

export interface Jornada {
    listaTransacciones: Transaccion[];
    total: number;
    fecha: string;
    id: string;
}

export enum LocalStorage {
    listaProductos = 'listaProductos',
    listaJornadas = 'listaJornadas',
}
