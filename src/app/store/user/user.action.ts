import { Action } from '@ngrx/store'
import { User } from '../../models'
// Action Types

export const ADD_USER = '[USERS] added'
export const UPDATE_USER = '[USERS] modified'
export const DELETE_USER = '[USERS] removed'
export const LOAD_USER = 'LOAD_USERS'
export const LOAD_ALL_USER = 'LOAD_ALL_USERS'
// export const UPDATE_ADD_COURSE_STATE = 'ADD_COURSE_STATE';
// export const ADD_SELECTED_COURSE_STATE = 'ADD_SELECTED_COURSE_STATE';

export class AddUser implements Action {
  readonly type = ADD_USER
  constructor(public payload: User) {}
}
export class UpdateUser implements Action {
  readonly type = UPDATE_USER
  constructor(public payload: User) {}
}
export class DeleteUser implements Action {
  readonly type = DELETE_USER
  constructor(public payload: string) {}
}
export class LoadUser implements Action {
  readonly type = LOAD_USER
  constructor(public payload: string) {}
}

export class LoadAllUser implements Action {
  readonly type = LOAD_ALL_USER
  constructor(public payload: User[]) {}
}

// export class UpdateAddCourseState implements Action{
//     readonly type = UPDATE_ADD_USER;
//     constructor(public payload: string) {
//     }
// }

// export class AddSelectedCourse implements Action{
//     readonly type = ADD_SELECTED_COURSE_STATE;
//     constructor(public payload: Course){}

// }

export type UsersActions = AddUser | UpdateUser | DeleteUser | LoadUser | LoadAllUser
//  | UpdateAddCourseState | AddSelectedCourse
