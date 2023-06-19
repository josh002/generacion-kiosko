import { Injectable } from '@angular/core';
import { Jornada, LocalStorage, Producto, Transaccion, UploadInfo } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  //-------- PRODUCTOS -----------
  saveDocInfo(doc: UploadInfo) {
    localStorage.setItem(LocalStorage.docInfo, JSON.stringify(doc));
  }

  getLastDocInfo(): UploadInfo | undefined {
    return JSON.parse(localStorage.getItem(LocalStorage.docInfo));
  }

  //-------- TRANSACCIONES -----------
  guardarTransaccion(transaccion: Transaccion) {
    let listaJornadas: Jornada[] = JSON.parse(localStorage.getItem(LocalStorage.listaJornadas));
    listaJornadas = listaJornadas.map(item => {
      if (item.id === transaccion.idJornada) {
        item.listaTransacciones.push(transaccion);
      }
      return item;
    });
    localStorage.setItem(LocalStorage.listaJornadas, JSON.stringify(listaJornadas));
  }
}
