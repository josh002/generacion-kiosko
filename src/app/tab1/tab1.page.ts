import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UploadInfo } from 'src/models/models';
import { LocalStorageService } from 'src/services/local-storage.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lastDoc: UploadInfo;
  foundElement;
  filteredElements: any[];

  handleBackButton: () => Promise<void>;

  constructor(
    public localStorageService: LocalStorageService,
    public modalController: ModalController,
    private alertController: AlertController
  ) {
  }

  async ionViewDidEnter() {
    this.lastDoc = this.localStorageService.getLastDocInfo();
    console.log(this.lastDoc)
    document.addEventListener("ionBackButton", this.handleBackButton = async () => {
      document.querySelector('body').style.visibility = "visible";
      await BarcodeScanner.stopScan();
    })
  }

  ionViewDidLeave() {
    document.removeEventListener("ionBackButton", this.handleBackButton);
  }

  async scan() {
    document.querySelector('body').style.visibility = "hidden";
    await BarcodeScanner.checkPermission({ force: true });
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.searchItem(result.content);
    }
    await BarcodeScanner.stopScan();
    document.querySelector('body').style.visibility = "visible";
  }

  searchItem(content: string) {
    const found = this.lastDoc.rows.find(r => content.includes(r[0]));
    if (found) {
      this.filteredElements = [];
      this.foundElement = found;
      console.log(this.foundElement);
    } else {
      this.foundElement = undefined;
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Producto no encontrado',
      buttons: ['OK'],
    });

    await alert.present();
  }

  onSearchChange(ev) {
    if (ev.detail.value === "") return;
    this.filteredElements = this.lastDoc.rows.filter(r =>
      r[0]?.includes(ev.detail.value)
    );
  }

  selectItem(item) {
    this.foundElement = item;
    this.filteredElements = [];
  }

  onClear() {
    this.filteredElements = [];
  }
}
