import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as orderReducer from '../reducers/order.reducer';

const feature = createFeatureSelector<orderReducer.State>('order');

export const selectOrders = createSelector(
  feature,
  orderReducer.getOrders
);
