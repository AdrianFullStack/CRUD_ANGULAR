import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {UserService} from '../../_services';
import * as allActions from '../actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private todoService: UserService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.getUsers),
      exhaustMap(action =>
        this.todoService.getUsers().pipe(
          map(response => {
            console.log("response:::", response)
            return allActions.getUsersSuccess({response})
          }),
          catchError((error: any) => of(allActions.getUsersFailure(error))))
      )
    )
  );
}
