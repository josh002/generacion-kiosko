import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listaCodigos: string[] = [];
  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  escanearProducto() {
    this.barcodeScanner.scan({ showTorchButton: true }).then(barcodeData => {
      this.listaCodigos.push(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
