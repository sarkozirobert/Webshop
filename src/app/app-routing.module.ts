import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {MainSiteComponent} from './components/main-site/main-site.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', component: MainSiteComponent},
  {path: 'product-list', component: ProductListComponent },
  {path: 'product-details/:productId', component: ProductDetailsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
