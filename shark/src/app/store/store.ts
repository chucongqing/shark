import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from 'app/features'

export const store = configureStore({
    reducer : rootReducer
})