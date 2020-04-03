import { UserState } from './user';


export enum Week {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}


export interface SystemData {
    nowDate : Date;
    users : UserState[];
    weekDay : Week;
}

export interface ParkingSpace {
    uid : string; //停车牌uid
    name : string; // 停车牌名称
    user: UserState; //当前使用用户
}