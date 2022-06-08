import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductComponent} from "./product.component";
import {TableModule} from "../../shared/table/table.module";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class ProductModule { }
