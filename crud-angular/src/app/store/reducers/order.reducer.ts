import {Action, createReducer, on} from '@ngrx/store';
import {Order} from '../entities';
import * as allActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../localStorage';

export interface State {
  orders?: Order[];
  currentOrder?: Order;
  deleteOrderId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  orders: storage.getItem('all').orders,
  currentOrder: {},
  deleteOrderId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const orderReducer = createReducer(
  initialState,

  // GetOrders
  on(allActions.getOrders, (state) => ({...state, isLoading: true})),
  on(allActions.getOrdersSuccess, (state, result) => ({
    orders: result.response,
    isLoading: false, isLoadingSuccess: true
  })),

  // Create Order Reducers
  on(allActions.createOrder, (state, {order}) => ({...state, isLoading: true, currentOrder: order})),
  on(allActions.createOrderSuccess, (state, result) => {
    const orders = undefined !== state.orders ? _.cloneDeep(state.orders) : [];
    orders.push(result);
    return {
      orders,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Order Reducers
  on(allActions.deleteOrder, (state, {id}) => ({...state, isLoading: true, deleteOrderId: id})),
  on(allActions.deleteOrderSuccess, (state, result) => {
    let orders = undefined !== state.orders ? _.cloneDeep(state.orders) : [];
    if (result.status) {
      // orders = orders.filter((order: Order) => order.id !== state.deleteOrderId);
      orders = orders.map((order: Order) => {
        if (order.id === state.deleteOrderId) {
          order.status = !order.status
        }
        return order
      });
    }
    return {
      orders,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Edit Order Reducers
  on(allActions.updateOrder, (state, {order}) => ({...state, isLoading: true, currentOrder: order})),
  on(allActions.updateOrderSuccess, (state, result) => {
    let orders = undefined !== state.orders ? _.cloneDeep(state.orders) : [];
    orders = orders.map((order: Order) => {
      if (order.id === result.id) {
        order = result;
      }
      return order;
    });
    return {
      orders,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return orderReducer(state, action);
}

export const getOrders = (state: State) => {
  return {
    orders: state.orders,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
