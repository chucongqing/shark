import React from 'react'
import { Card } from 'antd'
import { UserState } from 'app/types';

const {Meta} = Card;

type Props = {
    license : string;
    user: UserState;
}

export default function ParkingSpaceComp (props: Props) {

    return (
        <div>
            <Card title={"车位:" + props.license} extra={<a href="#">More</a>} style={{width:300}}>
                <p>车牌号:{props.user.parkState.license}</p>
                <p>使用人:{props.user.name}</p>
                {/* <Meta title="车位号" description={props.license}/> */}
            </Card>
        </div>
    )
}