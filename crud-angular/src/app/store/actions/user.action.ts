import {createAction, props} from "@ngrx/store";

export const GET_USERS = '[User] Get Users';
export const GET_USERS_SUCCESS = '[User] Get Users Success';
export const GET_USERS_FAILURE = '[User] Get Users Failure';

export const getUsers = createAction(
  GET_USERS
);

export const getUsersSuccess = createAction(
  GET_USERS_SUCCESS,
  props<any>()
);

export const getUsersFailure = createAction(
  GET_USERS_FAILURE,
  props<{any: any}>()
);
