import {createAction, props} from "@ngrx/store";
import {Order} from "../entities";

export const GET_ORDERS = '[Order] Get Orders';
export const GET_ORDERS_SUCCESS = '[Order] Get Orders Success';
export const GET_ORDERS_FAILURE = '[Order] Get Orders Failure';

export const CREATE_ORDER = '[Order] Create Order';
export const CREATE_ORDER_SUCCESS = '[Order] Create Order Success';
export const CREATE_ORDER_FAILURE = '[Order] Create Order Failure';

export const DELETE_ORDER = '[Order] Delete Order';
export const DELETE_ORDER_SUCCESS = '[Order] Delete Order Success';
export const DELETE_ORDER_FAILURE = '[Order] Delete Order Failure';

export const UPDATE_ORDER = '[Order] Edit Order';
export const UPDATE_ORDER_SUCCESS = '[Order] Edit Order Success';
export const UPDATE_ORDER_FAILURE = '[Order] Edit Order Failure';

export const getOrders = createAction(
  GET_ORDERS
);

export const getOrdersSuccess = createAction(
  GET_ORDERS_SUCCESS,
  props<any>()
);

export const getOrdersFailure = createAction(
  GET_ORDERS_FAILURE,
  props<{any: any}>()
);

export const createOrder = createAction(
  CREATE_ORDER,
  props<{order: Order}>()
);

export const createOrderSuccess = createAction(
  CREATE_ORDER_SUCCESS,
  props<any>()
);

export const createOrderFailure = createAction(
  CREATE_ORDER_FAILURE,
  props<{any: any}>()
);

export const deleteOrder = createAction(
  DELETE_ORDER,
  props<{id: number}>()
);

export const deleteOrderSuccess = createAction(
  DELETE_ORDER_SUCCESS,
  props<any>()
);

export const deleteOrderFailure = createAction(
  DELETE_ORDER_FAILURE,
  props<{any: any}>()
);

export const updateOrder = createAction(
  UPDATE_ORDER,
  props<{order: Order}>()
);

export const updateOrderSuccess = createAction(
  UPDATE_ORDER_SUCCESS,
  props<any>()
);

export const updateOrderFailure = createAction(
  UPDATE_ORDER_FAILURE,
  props<{any: any}>()
);
