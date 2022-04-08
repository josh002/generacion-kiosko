import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/models/models';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ProductoNuevoPage } from '../pages/producto-nuevo/producto-nuevo.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listaProductos: Producto[] = [];
  constructor(
    public modalController: ModalController,
    public localStorageService: LocalStorageService,
  ) { }

  ionViewWillEnter() {
    this.obtenerProductos();
  }

  async nuevoProducto() {
    const modal = await this.modalController.create({
      component: ProductoNuevoPage,
    });
    await modal.present();
    await modal.onDidDismiss().then(() => this.obtenerProductos());
  }

  obtenerProductos() {
    this.listaProductos = this.localStorageService.obtenerListaProductos() ?? [];
  }

  async editarProducto(producto: Producto) {
    // this.localStorageService.editarProducto(producto);
  }

  eliminarProducto(producto: Producto) {
    this.localStorageService.eliminarProducto(producto.codigo);
    this.obtenerProductos();
  }
}
