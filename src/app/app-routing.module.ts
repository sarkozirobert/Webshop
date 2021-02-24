import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {MainSiteComponent} from './components/main-site/main-site.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {CartPageComponent} from './components/cart-page/cart-page.component';
import {PurchaseFormComponent} from './components/purchase-form/purchase-form.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', component: MainSiteComponent},
  {path: 'product-list', component: ProductListComponent },
  {path: 'product-details/:productId', component: ProductDetailsComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'purchase-form', component: PurchaseFormComponent},
  {path: 'user-profile/:id', component: UserProfileComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
