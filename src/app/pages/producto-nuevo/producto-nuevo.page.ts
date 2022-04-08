import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
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
    private barcodeScanner: BarcodeScanner,
    public localStorageService: LocalStorageService,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
  }

  guardarProducto() {
    if (!this.validarProducto()) { return; }
    this.localStorageService.guardarProducto(this.productoNuevo);
    this.modalController.dismiss();
  }

  validarProducto(): boolean {
    if (!this.productoNuevo.nombre) { return false; }
    if (!this.productoNuevo.precio) { return false; }
    if (!this.productoNuevo.codigo) { return false; }
    return true;
  }

  escanearCodigo() {
    this.barcodeScanner.scan({ showTorchButton: true }).then(barcodeData => {
      this.productoNuevo.codigo = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
