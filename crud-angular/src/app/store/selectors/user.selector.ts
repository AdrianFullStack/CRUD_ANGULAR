import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as userReducer from '../reducers/user.reducer';

const feature = createFeatureSelector<userReducer.State>('user');

export const selectUsers = createSelector(
  feature,
  userReducer.getUsers
);
