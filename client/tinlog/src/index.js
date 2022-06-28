import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persitor } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persitor}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
