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

const store = createStore(allReducers, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<MainWrapper />
	</Provider>,
	document.getElementById('root')
);
// registerServiceWorker();
