import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionNuevaPage } from './transaccion-nueva.page';

const routes: Routes = [
  {
    path: '',
    component: TransaccionNuevaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransaccionNuevaPageRoutingModule {}
