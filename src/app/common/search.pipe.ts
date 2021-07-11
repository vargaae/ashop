import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
products: Product[];

transform(products: Product[], filterQuery: any): any[] {
  if (!filterQuery) return products;
  return this.products.filter(item => item.title.toLowerCase().includes(filterQuery.toLowerCase()));
}

}