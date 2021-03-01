import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../interfaces/product';
import {timeout} from 'rxjs/operators';
import { PurchasedClothesList } from 'src/app/interfaces/purchasedClothesList';
import {Sizes} from '../../interfaces/sizes';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  purchasedClothesList: PurchasedClothesList;
  product: Product;
  sizes: Sizes;
  allItem: PurchasedClothesList[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService
  ) {
    this.product = {
      id: 0,
      name: '',
      details: '',
      price: 0,
      color: '',
      gender: '',
      imageId: 0,
      type: '',
      size: {
        sizeS: 0,
        sizeM: 0,
        sizeL: 0,
        sizeXl: 0
      }
    };
    this.sizes = {sizeS: 0, sizeM: 0, sizeL: 0, sizeXl: 0};
    // @ts-ignore
    this.purchasedClothesList = {id: 0, name: '', imageId: 0, price: 0, size: '', quantity: 0, subTotal: 0};
    this.allItem = [];
  }

  // tslint:disable-next-line:typedef
  addToCart(orderedItem: Product) {
    this.cartService.addToCart({
      // @ts-ignore
      id: this.product.id,
      name: this.product.name,
      imageId: this.product.imageId,
      price: this.product.price,
      size: this.purchasedClothesList.size,
      quantity: this.purchasedClothesList.quantity,
      subTotal: this.product.price * this.purchasedClothesList.quantity
    });
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.productService.getProductByID(productIdFromRoute).subscribe(p => this.product = p);
    this.productService.getProductSizeAndQuantity(productIdFromRoute).subscribe(p => this.sizes = p);
  }
}
