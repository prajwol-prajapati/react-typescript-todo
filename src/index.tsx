import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './Reducers/allReducer';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
// import AuthExample from './App';
import MainWrapper from './Containers/MainWrapper';
import { persistStore, persistReducer } from 'redux-persist';
import * as storage from 'redux-persist/lib/storage';
// import allReducer from './Reducers/allReducer';
import { PersistGate } from 'redux-persist/lib/integration/react';

const persistConfig = {
	key: 'root',
	storage: storage
}

console.log(storage.default.getItem);

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<MainWrapper />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
// registerServiceWorker();
