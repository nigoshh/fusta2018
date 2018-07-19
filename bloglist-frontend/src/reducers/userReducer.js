// @flow
import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'
import { initBlogs } from './blogReducer'
import { notifyError, notifyMessage } from './notificationReducer'

import type { BlogType } from './blogReducer'
export type UserType = {
  adult: boolean,
  blogs: Array<BlogType>,
  id: string,
  name: string,
  username: string
}

type Cred = { username: string, password: string }
type LoggedInUser = { id: string, name: string, token: string, username: string }
type UserAction = { type: string, user: LoggedInUser, users: Array<UserType> }

export const initUsers = () => async (dispatch: Object => void) => {
  const users: Array<UserType> = await userService.getAll()
  users.sort(sortByBlogs)
  dispatch({ type: 'INIT_USERS', users })
}

const initialLoggedInUser = (): LoggedInUser | null => {
  const loggedInUserString: string =
    window.localStorage.getItem('loggedBlogListUser')
  return loggedInUserString ? JSON.parse(loggedInUserString) : null
}

export const loggedInUserReducer =
  (state: LoggedInUser | null = initialLoggedInUser(), action: UserAction) => {
    switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
    }
  }

export const login =
  (credentials: Cred, cleanForm: () => void, history: Object, url: string) =>
    async (dispatch: Object => void) => {
      try {
        const user: LoggedInUser = await loginService.login(credentials)
        cleanForm()
        window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
        setLoggedInUser(user)(dispatch)
        initBlogs()(dispatch)
        initUsers()(dispatch)
        history.push(url)
      } catch(e) {
        notifyError('wrong username or password', 5000)(dispatch)
      }
    }

export const logout = (focusTextInput: () => void, history: Object) =>
  async (dispatch: Object => void) => {
    window.localStorage.removeItem('loggedBlogListUser')
    blogService.setToken('')
    history.push('/login')
    await dispatch({ type: 'LOGOUT' })
    await notifyMessage('you logged out successfully', 5000)(dispatch)
    focusTextInput()
  }

const setLoggedInUser = (user: LoggedInUser) => (dispatch: Object => void) => {
  blogService.setToken(user.token)
  dispatch({ type: 'LOGIN', user })
}

const sortByBlogs = (user1: UserType, user2: UserType): number =>
  user2.blogs.length - user1.blogs.length

export const usersReducer = (state: Array<UserType> = [], action: UserAction) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
  case 'LOGOUT':
    return []
  default:
    return state
  }
}
