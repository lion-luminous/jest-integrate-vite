import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { persistor, store } from './redux/store.ts'

import App from './App.tsx'
import AntdProvider from './components/AntdProvider.tsx'

import './index.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
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
	</React.StrictMode>
)
