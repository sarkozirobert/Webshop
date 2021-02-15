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
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from '@angular/forms';
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
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
