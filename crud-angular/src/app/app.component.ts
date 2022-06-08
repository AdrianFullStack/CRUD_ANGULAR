import {Component} from '@angular/core';
import {AppState} from "./store/app.reducer";
import {Store} from "@ngrx/store";
import {getOrders, getProducts, getUsers} from "./store/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-angular';

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(getUsers())
  }
}
