import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoNuevoPage } from '../pages/producto-nuevo/producto-nuevo.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public modalController: ModalController,
  ) { }

  async nuevoProducto() {
    const modal = await this.modalController.create({
      component: ProductoNuevoPage,
    });
    return await modal.present();
  }
}
