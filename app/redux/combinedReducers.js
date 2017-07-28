
import { combineReducers } from 'redux'
import {reducers ,text,blog} from './reducers'
// import text from './reducers/text'



export default combineReducers({
    Get:reducers,
    Text:text,
    Blog:blog,
})