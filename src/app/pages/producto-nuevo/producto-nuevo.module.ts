import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoNuevoPageRoutingModule } from './producto-nuevo-routing.module';

import { ProductoNuevoPage } from './producto-nuevo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoNuevoPageRoutingModule
  ],
  declarations: [ProductoNuevoPage]
})
export class ProductoNuevoPageModule {}
