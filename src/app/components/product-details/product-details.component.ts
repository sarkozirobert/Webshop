import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { products } from '../../products';
// @ts-ignore
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // @ts-ignore
  product: Product;

  constructor(
    // this.product={ price: 0,name:'',description:'',id: 0};
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
  ) { }

  // tslint:disable-next-line:typedef
  addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    // @ts-ignore
    this.product = products.find(product => product.id === productIdFromRoute);
  }

}
