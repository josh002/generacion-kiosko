import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { Jornada } from 'src/models/models';
import { LocalStorageService } from 'src/services/local-storage.service';
import { TransaccionNuevaPage } from '../pages/transaccion-nueva/transaccion-nueva.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  jornada: Jornada;
  idJornada: string;
  constructor(
    public localStorageService: LocalStorageService,
    public modalController: ModalController,
  ) {
    this.idJornada = new Date().toLocaleDateString('ES-AR');
    this.obtenerJornada();
  }

  ionViewWillEnter() {
  }

  obtenerJornada() {
    this.jornada = this.localStorageService.obtenerJornada(this.idJornada);
  }

  async nuevoProducto() {
    const modal = await this.modalController.create({
      component: TransaccionNuevaPage,
    });
    await modal.present();
    await modal.onDidDismiss().then(() => this.obtenerJornada());
  }

}
