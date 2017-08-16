
import { combineReducers } from 'redux'
import {Get,Blog,Text,Settings} from './reducers'




export default combineReducers({
    Get,
    Text,
    Blog,
    Settings,
})