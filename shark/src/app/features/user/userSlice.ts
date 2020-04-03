import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserState } from 'app/types';

type ChangePhoneType = {
    uid : string;
    phone : number;
}

const userSlice = createSlice({
    name :'user',
    initialState : {} as {[key:string]:UserState},
    reducers : {
        changeUserPhone : (state, action: PayloadAction<ChangePhoneType>) => {
            const payload = action.payload as   ChangePhoneType;
            if(state[payload.uid] !== undefined){
                state[payload.uid] = {
                    ...state[payload.uid],
                    phone:payload.phone
                }
            }

            return state;
        }
    }
})


export const {changeUserPhone} = userSlice.actions;

const userReducer = userSlice.reducer

export default userReducer