import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { errorReducer, messageReducer } from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { loggedInUserReducer, usersReducer } from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  error: errorReducer,
  loggedInUser: loggedInUserReducer,
  message: messageReducer,
  users: usersReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
