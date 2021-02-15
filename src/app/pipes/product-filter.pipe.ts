import { Pipe, PipeTransform } from '@angular/core';
import {products} from '../products';

/*
@Pipe({
  name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform {

  transform(list: products, value: string): products {
    if (value != null || list != null) {
      const productSearch = list.filter(p => p.name.search(new RegExp(value, 'i')) >= 0);
      if (productSearch.length !== 0) {
        return productSearch;
      } else {
        return list;
      }
    }
  }
}
*/
