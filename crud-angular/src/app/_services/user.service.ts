import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:8080/api/v1';

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }
}
