import {createAction, props} from "@ngrx/store";
import {Product} from "../entities";

export const GET_PRODUCTS = '[Product] Get Products';
export const GET_PRODUCTS_SUCCESS = '[Product] Get Products Success';
export const GET_PRODUCTS_FAILURE = '[Product] Get Products Failure';

export const CREATE_PRODUCT = '[Product] Create Product';
export const CREATE_PRODUCT_SUCCESS = '[Product] Create Product Success';
export const CREATE_PRODUCT_FAILURE = '[Product] Create Product Failure';

export const DELETE_PRODUCT = '[Product] Delete Product';
export const DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success';
export const DELETE_PRODUCT_FAILURE = '[Product] Delete Product Failure';

export const UPDATE_PRODUCT = '[Product] Edit Product';
export const UPDATE_PRODUCT_SUCCESS = '[Product] Edit Product Success';
export const UPDATE_PRODUCT_FAILURE = '[Product] Edit Product Failure';

export const getProducts = createAction(
  GET_PRODUCTS
);

export const getProductsSuccess = createAction(
  GET_PRODUCTS_SUCCESS,
  props<any>()
);

export const getProductsFailure = createAction(
  GET_PRODUCTS_FAILURE,
  props<{any: any}>()
);

export const createProduct = createAction(
  CREATE_PRODUCT,
  props<{product: Product}>()
);

export const createProductSuccess = createAction(
  CREATE_PRODUCT_SUCCESS,
  props<any>()
);

export const createProductFailure = createAction(
  CREATE_PRODUCT_FAILURE,
  props<{any: any}>()
);

export const deleteProduct = createAction(
  DELETE_PRODUCT,
  props<{id: number}>()
);

export const deleteProductSuccess = createAction(
  DELETE_PRODUCT_SUCCESS,
  props<any>()
);

export const deleteProductFailure = createAction(
  DELETE_PRODUCT_FAILURE,
  props<{any: any}>()
);

export const updateProduct = createAction(
  UPDATE_PRODUCT,
  props<{product: Product}>()
);

export const updateProductSuccess = createAction(
  UPDATE_PRODUCT_SUCCESS,
  props<any>()
);

export const updateProductFailure = createAction(
  UPDATE_PRODUCT_FAILURE,
  props<{any: any}>()
);

