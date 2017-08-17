import combinedReducers from './combinedReducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
const initialState = require('./initialState.json');

import LocalStorage from '../services/localStorage';

console.log('initialState ', initialState)
const consoleMessages = store => next => action => {

    let result

    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('current Prev State', store.getState())
    result = next(action)
    console.log('current Next State', store.getState())
    console.groupEnd()

    return result

}
//RELEASE

LocalStorage.get('state').then((value) => {

    console.log('LocalStorage Get Success', value);
    if (value != null) {
        value = JSON.parse(value);
        initialState.Settings.theme = value.Settings.theme;
    }

    storeFactory = applyMiddleware(thunk)(createStore)(combinedReducers, initialState)

}).catch((error) => {

    console.log('LocalStorage Get Error', error);
    storeFactory = applyMiddleware(thunk)(createStore)(combinedReducers, initialState)
})



storeFactory = applyMiddleware(thunk)(createStore)(combinedReducers, initialState)
//DEBUG
// storeFactory = applyMiddleware(thunk, consoleMessages)(createStore)(combinedReducers,initialState)
// storeFactory = createStore(combinedReducers,initialState,applyMiddleware(thunk, consoleMessages))
export default storeFactory



