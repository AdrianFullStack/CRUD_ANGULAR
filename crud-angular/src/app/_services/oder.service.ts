import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:8080/api/v1';

  getOrders() {
    return this.http.get(this.rootURL + '/orders');
  }

  addOrder(order: any) {
    return this.http.post(this.rootURL + '/orders', order);
  }

  editOrder(order: any) {
    return this.http.put(`${this.rootURL}/orders/${order.id}`, order);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.rootURL}/orders/${id}`);
  }
}
