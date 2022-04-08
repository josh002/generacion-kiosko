export class Producto {
    nombre: string;
    precio: number;
    codigo: string;
    constructor() {
        this.nombre = '';
        this.precio = 0;
        this.codigo = '';
    }
}

export class Transaccion {
    listaProductos: Producto[];
    total: number;
    id: string;
    idJornada: string;
    fecha: string;

    constructor() {
        this.listaProductos = [];
        this.total = 0;
        this.id = '';
        this.idJornada = '';
        this.fecha = '';
    }
}

export class Jornada {
    listaTransacciones: Transaccion[];
    total: number;
    fecha: string;
    id: string;
    constructor(id: string) {
        this.listaTransacciones = [];
        this.total = 0;
        this.fecha = '';
        this.id = id;
    }
}

export enum LocalStorage {
    listaProductos = 'listaProductos',
    listaJornadas = 'listaJornadas',
}
