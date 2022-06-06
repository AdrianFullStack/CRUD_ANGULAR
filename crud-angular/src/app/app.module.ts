import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "./store/app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {OrderEffects, ProductEffects} from "./store/effects";
import {HttpClientModule} from "@angular/common/http";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faEdit, faTrashAlt, faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {ModalModule} from "ngx-bootstrap/modal";
import {UserEffects} from "./store/effects/user.effect";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([OrderEffects, ProductEffects, UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPlus,
      faTrashAlt,
      faEdit,
      faCheckCircle
    )
  }
}
