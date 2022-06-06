import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {OrderService} from '../../_services';
import * as allActions from '../actions';
import {SwalAlert} from "../../utils/SwalAlert";

@Injectable()
export class OrderEffects {

  constructor(
    private actions$: Actions,
    private todoService: OrderService
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.getOrders),
      exhaustMap(action =>
        this.todoService.getOrders().pipe(
          map(response => {
            console.log("response:::", response)
            return allActions.getOrdersSuccess({response})
          }),
          catchError((error: any) => of(allActions.getOrdersFailure(error))))
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.createOrder),
      exhaustMap(action =>
        this.todoService.addOrder(action.order).pipe(
          map(response => allActions.createOrderSuccess(response)),
          catchError((error: any) => of(allActions.createOrderFailure(error))))
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.deleteOrder),
      exhaustMap(action => this.todoService.deleteOrder(action.id).pipe(
        map(response => {
          SwalAlert.close();
          return allActions.deleteOrderSuccess(response)
        }),
        catchError((error: any) => of(allActions.deleteOrderFailure(error))))
      )
    )
  );

  editOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.updateOrder),
      exhaustMap(action =>
        this.todoService.editOrder(action.order).pipe(
          map(response => allActions.updateOrderSuccess(response)),
          catchError((error: any) => of(allActions.updateOrderFailure(error))))
      )
    )
  );

}
