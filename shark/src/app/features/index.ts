import  userReducer from './user/userSlice'

import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    users : userReducer
})