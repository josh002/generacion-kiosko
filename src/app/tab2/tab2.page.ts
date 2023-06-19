import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/services/local-storage.service';
import readXlsxFile from 'read-excel-file'
import { UploadInfo } from 'src/models/models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('inputFile') inputFile: HTMLIonInputElement;
  listItems: any = [];
  lastDoc: UploadInfo;
  newDoc: UploadInfo;

  constructor(
    public modalController: ModalController,
    public localStorageService: LocalStorageService,
  ) {
    this.lastDoc = localStorageService.getLastDocInfo();
  }

  ionViewWillEnter() {
  }

  public changeListener(ev: any) {
    const files: FileList = ev.target.files;
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0) as any;
      let auxProducts: UploadInfo = {
        date: new Date().toLocaleDateString('es-ES', { day: "numeric", month: "long", weekday: "long", year: "numeric" }),
        productQuantity: 0,
        docName: file.name,
        rows: []
      }
      readXlsxFile(file).then((rows) => {
        auxProducts.rows = rows;
        auxProducts.productQuantity = rows.length - 2;
        this.newDoc = auxProducts;
        console.log(this.newDoc)
      })
    }
  }

  async clickToInput() {
    const inputEl = await this.inputFile.getInputElement();
    inputEl.click();
  }

  onSave() {
    this.localStorageService.saveDocInfo(this.newDoc);
    this.lastDoc = null;
    this.newDoc = null;
    this.lastDoc = this.localStorageService.getLastDocInfo();
  }
}

