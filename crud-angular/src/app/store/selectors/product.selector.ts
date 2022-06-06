import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as productReducer from '../reducers/product.reducer';

const feature = createFeatureSelector<productReducer.State>('product');

export const selectProducts = createSelector(
  feature,
  productReducer.getProducts
);
