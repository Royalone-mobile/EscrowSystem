import {combineReducers} from 'redux';
import { SAVE_AUTH, SAVE_CLIENT_DASHBOARD,SAVE_ALLUSERS} from "../actions/";

import { createReducer } from 'reduxsauce';


export const initialState ={
  navigator: null,
  spinnerVisible: false,
  briefs: [],
  users: []

}
 
const saveAuthReducer = (state, action) => ({
  ...state,
  token: action.token
});

const saveBriefsReducer = (state, action) => {
  return {
  ...state,
  briefs: action.briefs
}}

const saveUsersReducer = (state, action) => ({
  ...state,
  users: action.users
})

const actionHandlers = {
    SAVE_AUTH: saveAuthReducer,
    SAVE_CLIENT_DASHBOARD: saveBriefsReducer,
    SAVE_ALLUSERS: saveUsersReducer
};
export default createReducer(initialState, actionHandlers);
