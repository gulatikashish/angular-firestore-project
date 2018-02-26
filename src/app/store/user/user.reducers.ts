import * as user from './user.action';

import { User } from '../../models'
import { INITIAL_APPLICATION_STATE } from '../index';

export interface UserState {
    users: User[];
};

export const INITIAL_USER_STATE: UserState = {
    users: [],
};
export function userReducer(state = INITIAL_USER_STATE, action: user.UsersActions): UserState {

    switch (action.type) {
        case user.ADD_USER: {
            console.log("ADD REDUCER", state.users, action.payload)
            console.log("REDUCERSSSS", action.payload, state.users, state);
            // let x={ ...state, users: [...state.users, action.payload] }
            // console.log("return",x);
            return { ...state, users: [...state.users, action.payload] };
        }
        case user.UPDATE_USER: {
            console.log("UPDATE REDUCER", state, action.payload)
            return { ...state, users: state.users.map(user => user._id != action.payload._id ? user : action.payload) }
        }
        case user.DELETE_USER: {
            console.log("DELETE REDUCER", state, action.payload, state.users)
            return {
                ...state, users: state.users.filter(user => {
                    if (user._id !== action.payload) { 
                    return user; } })
            };
        }
        case user.LOAD_ALL_USER: {
            // let x={ ...state, users: [...action.payload] };
            // console.log("return",x);
            return { ...state, users: [...action.payload] };
        }
        // case user.LOAD_USER: {
        //     return state;
        // }
        // case course.UPDATE_ADD_COURSE_STATE: {
        //     return { ...state, add_course_state: action.payload }
        // }
        // case course.ADD_SELECTED_COURSE_STATE: {
        //     return { ...state, selected_course: action.payload };
        // }
        default: {
            return state;
        }
    }
}
