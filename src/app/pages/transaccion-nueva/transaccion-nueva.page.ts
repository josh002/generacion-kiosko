import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Producto, Transaccion } from 'src/models/models';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-transaccion-nueva',
  templateUrl: './transaccion-nueva.page.html',
  styleUrls: ['./transaccion-nueva.page.scss'],
})
export class TransaccionNuevaPage implements OnInit {
  @ViewChild('searchbar') searchbar: IonSearchbar;
  transaccionNueva = new Transaccion();
  listaProductos: Producto[] = [];
  filtroProductos: Producto[] = [];


  constructor(
    private barcodeScanner: BarcodeScanner,
    public localStorageService: LocalStorageService,
    public modalController: ModalController,
  ) { }

  ionViewWillEnter() {
    this.obtenerProductos();
  }

  ngOnInit() {
  }

  borrarProducto(producto: Producto) {
    const indexProduct = this.transaccionNueva.listaProductos.findIndex(item => item.codigo === producto.codigo);
    this.transaccionNueva.listaProductos.splice(indexProduct, 1);
    this.calcularTotal();
  }

  agregarProducto() {
    this.barcodeScanner.scan({ showTorchButton: true, resultDisplayDuration: 0 }).then(barcodeData => {
      const producto = this.localStorageService.obtenerProducto(barcodeData.text);
      if (producto) { this.transaccionNueva.listaProductos.push(producto); }
      this.calcularTotal();
    });
  }

  guardarTransaccion() {
    if (this.transaccionNueva.total === 0) { return; }
    const hora = new Date().toLocaleTimeString('Es-Ar').split(':');
    this.transaccionNueva.hora = hora[0] + ':' + hora[1];
    this.localStorageService.guardarTransaccion(this.transaccionNueva);
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
    this.transaccionNueva.listaProductos.forEach(producto => { this.transaccionNueva.total += Number(producto.precio); });
  }

  onSearchChange(ev) {
    if (ev.detail.value) {
      this.filtroProductos = this.listaProductos.filter(producto =>
        producto.nombre.toLocaleLowerCase().includes(ev.detail.value.toLocaleLowerCase())
      );
    }
  }

  productoSeleccionado(producto: Producto) {
    this.filtroProductos = [];
    this.transaccionNueva.listaProductos.push(producto);
    this.searchbar.value = null;
    this.calcularTotal();
  }

  onSearchClear() {
    this.filtroProductos = [];
  }
}
