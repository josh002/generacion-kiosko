import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/models/models';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.page.html',
  styleUrls: ['./producto-nuevo.page.scss'],
})
export class ProductoNuevoPage implements OnInit {
  productoNuevo = new Producto();
  constructor(
    public localStorageService: LocalStorageService,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
  }

  guardarProducto() {
    if (!this.validarProducto()) { return; }
    this.modalController.dismiss();
  }

  validarProducto(): boolean {
    if (!this.productoNuevo.nombre) { return false; }
    if (!this.productoNuevo.precio) { return false; }
    if (!this.productoNuevo.codigo) { return false; }
    return true;
  }

  escanearCodigo() {
 
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  inputChange() {
    console.log(this.productoNuevo.precio[0]);
    if (this.productoNuevo.precio[0] < 1) {
      const arrNumber = this.productoNuevo.precio.toString().split('');
      arrNumber.shift();
      this.productoNuevo.precio = Number(arrNumber.join(''));
    }
  }
}
