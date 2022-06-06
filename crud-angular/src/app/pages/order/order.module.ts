import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from './order.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderComponent
  ],
    imports: [
      CommonModule,
      OrderRoutingModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class OrderModule { }
