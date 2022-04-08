export class Producto {
    nombre: string;
    precio: number;
    codigo: string;
    constructor() {
        this.nombre = '';
        this.precio = null;
        this.codigo = '';
    }
}

export class Transaccion {
    listaProductos: Producto[];
    total: number;
    id: string;
    idJornada: string;
    hora: string;

    constructor() {
        this.listaProductos = [];
        this.total = 0;
        this.idJornada = new Date().toLocaleDateString('ES-AR');;
        this.hora = '';
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
        this.fecha = id;
        this.id = id;
    }
}

export enum LocalStorage {
    listaProductos = 'listaProductos',
    listaJornadas = 'listaJornadas',
}
