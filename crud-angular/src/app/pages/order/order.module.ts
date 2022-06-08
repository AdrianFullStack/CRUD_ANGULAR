import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from './order.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "../../shared/table/table.module";


@NgModule({
  declarations: [
    OrderComponent
  ],
    imports: [
      CommonModule,
      OrderRoutingModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      TableModule
    ]
})
export class OrderModule { }
