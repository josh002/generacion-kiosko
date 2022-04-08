import { Component, OnChanges, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { Producto, Transaccion } from 'src/models/models';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-transaccion-nueva',
  templateUrl: './transaccion-nueva.page.html',
  styleUrls: ['./transaccion-nueva.page.scss'],
})
export class TransaccionNuevaPage implements OnInit {
  transaccionNueva = new Transaccion();
  listaProductos: Producto[] = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    public localStorageService: LocalStorageService,
    public modalController: ModalController,
  ) { }

  ionViewWillEnter() {
    this.obtenerProductos();
    this.transaccionNueva.listaProductos = this.listaProductos; //borrar solo para testing
  }

  ngOnInit() {
  }

  borrarProducto(producto: Producto) {
    const indexProduct = this.transaccionNueva.listaProductos.findIndex(item => item.codigo === producto.codigo);
    this.transaccionNueva.listaProductos.splice(indexProduct, 1);
    this.calcularTotal();
  }

  agregarProducto() {
    this.barcodeScanner.scan({ showTorchButton: true }).then(barcodeData => {
      const producto = this.localStorageService.obtenerProducto(barcodeData.text);
      if (producto) { this.transaccionNueva.listaProductos.push(producto); }
    });
    this.calcularTotal();
  }

  guardarTransaccion() {
    this.modalController.dismiss();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  obtenerProductos() {
    this.listaProductos = this.localStorageService.obtenerListaProductos() ?? [];
  }

  calcularTotal() {
    this.transaccionNueva.total = 0;
    this.listaProductos.forEach(producto => { this.transaccionNueva.total += Number(producto.precio); });
  }
}
