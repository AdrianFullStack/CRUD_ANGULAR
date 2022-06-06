import {Action, createReducer, on} from '@ngrx/store';
import {User} from '../entities';
import * as allActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../localStorage';

export interface State {
  users?: User[];
  currentUser?: User;
  deleteUserId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  users: storage.getItem('all').users,
  currentUser: {},
  deleteUserId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const userReducer = createReducer(
  initialState,

  // GetUsers
  on(allActions.getUsers, (state) => ({...state, isLoading: true})),
  on(allActions.getUsersSuccess, (state, result) => ({
    users: result.response,
    isLoading: false, isLoadingSuccess: true
  })),
);

export function reducer(state: State | undefined, action: Action): any {
  return userReducer(state, action);
}

export const getUsers = (state: State) => {
  return {
    users: state.users,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
