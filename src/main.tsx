import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { persistor, store } from './redux/store.ts'

import App from './App.tsx'
import AntdProvider from './components/AntdProvider.tsx'
import { AuthProvider } from './components/AuthProvider.tsx'

import './index.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
                <AuthProvider>
                        <AntdProvider>
                                <Provider store={store}>
                                        <PersistGate
                                                loading={<h2>loading...</h2>}
                                                persistor={persistor}
                                        >
                                                <App />
                                        </PersistGate>
                                </Provider>
                        </AntdProvider>
                </AuthProvider>
        </React.StrictMode>
)
