// import {UserState}
import { UserState } from './user';

export interface StoreData {
   users: {[key: string] : UserState};
}