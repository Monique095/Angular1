import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../product-lists/product';


export class ProductData implements InMemoryDbService {

  createDb(): { products: Product[]} {
    const products: Product[] = [
      {
        id: 1,
        productName: 'Leaf Rake',
        description: 'Leaf rake with 48-inch wooden handle',
        price: 19.95,
        releaseDate: '2020-02-08',
      },
      {
        id: 2,
        productName: 'Garden Cart',
        description: '15 gallon capacity rolling garden cart',
        price: 32.95,
        releaseDate: '2020-02-06',
      },
      {
        id: 3,
        productName: 'Hammer',
        description: 'Curved claw steel hammer',
        price: 8.95,
        releaseDate: '2020-03-02',
      },
      {
        id: 4,
        productName: 'Saw',
        description: '15-inch steel blade hand saw',
        price: 11.55,
        releaseDate: '2020-03-10',
      },
      {
        id: 5,
        productName: 'Video Game Controller',
        description: 'Standard two-button video game controller',
        price: 35.95,
        releaseDate: '2020-11-06',
      }
    ];
      
    return { products };
  }
}

