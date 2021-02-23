import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfaces/product';


@Pipe({
  name: 'productsFilter'
})

export class ProductsFilterPipe implements PipeTransform {

  transform(list: Product[], value: string): any{
    if (value != null || list != null) {
      const productSearch = list.filter(p => p.name.search(new RegExp(value, 'i')) >= 0);
      if (productSearch.length !== 0) {
        return productSearch;
      }
      else {
        return list;
      }
    }
  }
}
