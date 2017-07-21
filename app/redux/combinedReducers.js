
import { combineReducers } from 'redux'
import reducers from './reducers/reducers'
import text from './reducers/text'



export default combineReducers({
    Get:reducers,
    Text:text,
})