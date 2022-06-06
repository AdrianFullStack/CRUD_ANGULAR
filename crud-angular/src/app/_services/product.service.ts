import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:8080/api/v1';

  getProducts() {
    return this.http.get(this.rootURL + '/products');
  }

  addProduct(product: any) {
    return this.http.post(this.rootURL + '/products', product);
  }

  editProduct(product: any) {
    return this.http.put(`${this.rootURL}/products/${product.id}`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.rootURL}/products/${id}`);
  }
}
