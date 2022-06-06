import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'orders', loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule) },
  { path: 'products', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
