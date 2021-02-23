import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../interfaces/product';

@Pipe({
  name: 'genderFilter'
})
export class GenderFilterPipe implements PipeTransform {

  transform(list: Product[], value: string): Product[] | any{
    if (value !== null || list != null) {
      const genderChoose = list.filter(p => p.gender);
      if (genderChoose !== null) {
        return genderChoose;
      } else {
        return list;
      }
    }
  }
}
