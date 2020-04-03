import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import HomePage from './routers'

function App() {

    return (
        <Provider store={store}>
        <div>
            <header>App</header>
            <HomePage></HomePage>
        </div>

        </Provider>
       
    )
}

export default App;

