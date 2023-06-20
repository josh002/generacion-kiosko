import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  handleBackButton: () => Promise<void>;

  constructor(
    public localStorageService: LocalStorageService,
    public modalController: ModalController,
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
    const found = this.lastDoc.rows.find(r => r[0] == content);
    if (found) {
      this.foundElement = found;
      console.log(this.foundElement);
    } else {
      this.foundElement = undefined;
    }
  }
}
