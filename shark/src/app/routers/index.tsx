import React from 'react'
import { Router, Link, RouteComponentProps } from "@reach/router"
import ParkingPage from 'app/container/parkingPage'
import LoginPage from './../container/login';


let Parking = (props: RouteComponentProps) => <ParkingPage />
let About = (props: RouteComponentProps) => {
    return (
        <div> ccq present! </div>
    )
}

let Login =(props:RouteComponentProps) => <LoginPage></LoginPage>

const HomePage = () => {


    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">登录</Link>
                    </li>
                    <li>
                        <Link to="parking">停车</Link>
                    </li>
                    <li>
                        <Link to="about">关于</Link>
                    </li>
                </ul>
            </nav>

            <Router>
                <Login path='/'></Login>
                <Parking path="parking"></Parking>
                <About path='about'></About>
            </Router>
        </div>
    )
}

export default HomePage;