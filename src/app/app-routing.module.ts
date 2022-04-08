import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'producto-nuevo',
    loadChildren: () => import('./pages/producto-nuevo/producto-nuevo.module').then( m => m.ProductoNuevoPageModule)
  },
  {
    path: 'editar-producto',
    loadChildren: () => import('./pages/editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'transaccion-nueva',
    loadChildren: () => import('./pages/transaccion-nueva/transaccion-nueva.module').then( m => m.TransaccionNuevaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
