import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {ProductService} from '../../_services';
import * as allActions from '../actions';
import {SwalAlert} from "../../utils/SwalAlert";

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private todoService: ProductService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.getProducts),
      exhaustMap(action =>
        this.todoService.getProducts().pipe(
          map(response => {
            console.log("response:::", response)
            return allActions.getProductsSuccess({response})
          }),
          catchError((error: any) => of(allActions.getProductsFailure(error))))
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.createProduct),
      exhaustMap(action =>
        this.todoService.addProduct(action.product).pipe(
          map(response => allActions.createProductSuccess(response)),
          catchError((error: any) => of(allActions.createProductFailure(error))))
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.deleteProduct),
      exhaustMap(action => this.todoService.deleteProduct(action.id).pipe(
        map(response => {
          SwalAlert.close()
          return allActions.deleteProductSuccess(response)
        }),
        catchError((error: any) => of(allActions.deleteProductFailure(error))))
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.updateProduct),
      exhaustMap(action =>
        this.todoService.editProduct(action.product).pipe(
          map(response => allActions.updateProductSuccess(response)),
          catchError((error: any) => of(allActions.updateProductFailure(error))))
      )
    )
  );

}
