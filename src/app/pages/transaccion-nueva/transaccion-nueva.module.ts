import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransaccionNuevaPageRoutingModule } from './transaccion-nueva-routing.module';

import { TransaccionNuevaPage } from './transaccion-nueva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaccionNuevaPageRoutingModule
  ],
  declarations: [TransaccionNuevaPage]
})
export class TransaccionNuevaPageModule {}
