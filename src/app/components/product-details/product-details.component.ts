import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../interfaces/product';
import {timeout} from 'rxjs/operators';
import { OrderedItem } from 'src/app/interfaces/ordered-item';
import {Sizes} from '../../interfaces/sizes';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  orderedItem: OrderedItem;
  product: Product;
  sizes: Sizes;
  allItem: OrderedItem[];

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
    this.orderedItem = {id: 0, name: '', imageId: 0, price: 0, size: '', quantity: 0, subTotal: 0};
    this.allItem = [];
  }

  // tslint:disable-next-line:typedef
  addToCart(orderedItem: Product) {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      imageId: this.product.imageId,
      price: this.product.price,
      size: this.orderedItem.size,
      quantity: this.orderedItem.quantity,
      subTotal: this.product.price * this.orderedItem.quantity
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
