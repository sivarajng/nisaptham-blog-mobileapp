import combinedReducers from './combinedReducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
const initialState = require('./initialState.json');

console.log('initialState ',initialState)
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
storeFactory = applyMiddleware(thunk)(createStore)(combinedReducers,initialState)
//DEBUG
// storeFactory = applyMiddleware(thunk, consoleMessages)(createStore)(combinedReducers,initialState)
// storeFactory = createStore(combinedReducers,initialState,applyMiddleware(thunk, consoleMessages))
export default storeFactory



