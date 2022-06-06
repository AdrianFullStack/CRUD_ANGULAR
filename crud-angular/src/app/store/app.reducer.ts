import * as orderReducer from './reducers/order.reducer'
import * as productReducer from './reducers/product.reducer'
import * as userReducer from './reducers/user.reducer'
import {localStorageSync} from 'ngrx-store-localstorage';
import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";

export interface AppState {
  product: productReducer.State,
  order: orderReducer.State
  user: userReducer.State,
}

export const reducers: ActionReducerMap<AppState> = {
  product: productReducer.reducer,
  order: orderReducer.reducer,
  user: userReducer.reducer,
};

const reducerKeys = ['product', 'order', 'user'];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];
