import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { recipesReducer } from '../reducers/recipesReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(recipesReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;