import authReducer from './auth.reducer'
import { combineReducers } from 'redux'
import timelineReducer from './timeline.reducer'
import userinfoReducer from './userinfo.reducer'

const rootReducer = combineReducers({
	auth: authReducer,
	timeline:timelineReducer,
	userinfo:userinfoReducer,
})

export default rootReducer