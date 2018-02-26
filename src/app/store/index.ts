import { ActionReducerMap, createSelector, ActionReducer, MetaReducer } from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store'
import { Action } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'

import * as fromUser from './user/user.reducers'

export interface ApplicationState {
  userState: fromUser.UserState
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  userState: fromUser.INITIAL_USER_STATE
}

export const reducers: ActionReducerMap<ApplicationState> = {
  userState: fromUser.userReducer
}

export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return function(state: ApplicationState, action: any): ApplicationState {
    console.log('state', state)
    console.log('action', action)
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<ApplicationState>[] = [logger, storeFreeze]

//   export const getRouterState = (state: ApplicationState) => state.routerState;
// export const getCurrentUrl = createSelector(getRouterState,
//   (state: fromRouter.RouterReducerState<RouterStateUrl>) => {
//     if (state.state && state.state.url) {
//       return state.state.url;
//     } else {
//       return null;
//     }
//   });
