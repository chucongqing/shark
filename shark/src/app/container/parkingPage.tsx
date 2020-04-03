import React from 'react'
import ParkingSpaceComp from 'app/components/parkingspace';
import { EmptyUser } from './../store/data';

export default function ParkingPage() {
    return (
        <div>
            <ParkingSpaceComp license="148" user={EmptyUser}></ParkingSpaceComp>
            <ParkingSpaceComp license="158" user={EmptyUser}></ParkingSpaceComp>
        </div>
    )
}