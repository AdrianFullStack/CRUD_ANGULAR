import {Action, createReducer, on} from '@ngrx/store';
import {Product} from '../entities';
import * as allActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../localStorage';

export interface State {
  products?: Product[];
  currentProduct?: Product;
  deleteProductId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  products: storage.getItem('all').products,
  currentProduct: {},
  deleteProductId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const productReducer = createReducer(
  initialState,

  // GetProducts
  on(allActions.getProducts, (state) => ({...state, isLoading: true})),
  on(allActions.getProductsSuccess, (state, result) => ({
    products: result.response, isLoading: false, isLoadingSuccess: true
  })),

  // Create Product Reducers
  on(allActions.createProduct, (state, {product}) => ({...state, isLoading: true, currentProduct: product})),
  on(allActions.createProductSuccess, (state, result) => {
    const products = undefined !== state.products ? _.cloneDeep(state.products) : [];
    products.push(result);
    return {
      products,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Product Reducers
  on(allActions.deleteProduct, (state, {id}) => ({...state, isLoading: true, deleteProductId: id})),
  on(allActions.deleteProductSuccess, (state, result) => {
    let products = undefined !== state.products ? _.cloneDeep(state.products) : [];
    if (result.status) {
      // products = products.filter((product: Product) => product.id !== state.deleteProductId);
      products = products.map((product: Product) => {
        if(product.id === state.deleteProductId) {
          product.status = !product.status
        }
        return product
      });
    }
    return {
      products,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Edit Product Reducers
  on(allActions.updateProduct, (state, {product}) => ({...state, isLoading: true, currentProduct: product})),
  on(allActions.updateProductSuccess, (state, result) => {
    let products = undefined !== state.products ? _.cloneDeep(state.products) : [];
    products = products.map((product: Product) => {
      if (product.id === result.id) {
        product = result;
      }
      return product;
    });
    return {
      products,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return productReducer(state, action);
}

export const getProducts = (state: State) => {
  return {
    products: state.products,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
