import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/services/local-storage.service';
import readXlsxFile, { readSheetNames } from 'read-excel-file'
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

  async changeListener(ev: any) {
    const files: FileList = ev.target.files;
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0);
      let auxProducts: UploadInfo = {
        date: new Date().toLocaleDateString('es-ES', { day: "numeric", month: "long", weekday: "long", year: "numeric" }),
        productQuantity: -2,
        docName: file.name,
        rows: []
      }
      await readSheetNames(file).then(async (sheetNames) => {
        sheetNames.forEach(async (sheetName) => {
          await readXlsxFile(file, { sheet: sheetName }).then((rows) => {
            auxProducts.rows = auxProducts.rows.concat(rows);
            auxProducts.productQuantity += rows.length;
          })
        })
      })
      this.newDoc = auxProducts;
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

