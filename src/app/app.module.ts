import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/card/card.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {RouterModule} from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import {CartPageComponent} from './components/cart-page/cart-page.component';
import {PurchaseFormComponent} from './components/purchase-form/purchase-form.component';
import {ProductRowComponent} from './components/product-row/product-row.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductsFilterPipe } from './pipes/products-filter.pipe';
import { GenderCardComponent } from './components/gender-card/gender-card.component';
import { GenderFilterPipe } from './pipes/gender-filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { OrderRowComponent } from './components/order-row/order-row.component';
// import { ProductFilterPipe } from './pipes/product-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainSiteComponent,
    CardComponent,
    TopBarComponent,
    ProductListComponent,
    CartComponent,
    ProductDetailsComponent,
    RegistrationModalComponent,
    SignInComponent,
    FooterComponent,
    CartPageComponent,
    PurchaseFormComponent,
    UserProfileComponent,
    PurchaseFormComponent,
    ProductRowComponent,
    ProductsFilterPipe,
    GenderCardComponent,
    GenderFilterPipe,
    FilterComponent,
    OrderRowComponent,
    LogoutComponent,
    ConfirmAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
