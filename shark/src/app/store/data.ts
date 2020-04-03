import {Week, UserState, ParkState} from 'app/types'

export const EmptyUser =  {
    name : "无用户",
    uid : "empty",
    phone: 0,
    parkState : {
        license : "无车牌",
        signedDate : [ Week.Monday,Week.Tuesday, Week.Wednesday,Week.Thursday,Week.Friday]
    } as ParkState
} as UserState;