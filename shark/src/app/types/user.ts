import {Week} from './data'

export interface UserState {
    name : string;
    uid : string;
    phone: number;
    parkState : ParkState;
}

export interface ParkState {
    license : string;
    // usingToday : boolean;
    usingParkingSpace : string;
    signedDate : Week[]; //规定的停车时间
}

