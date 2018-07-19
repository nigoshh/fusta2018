// @flow
import blogService from '../services/blogs'
import { notifyError, notifyMessage } from './notificationReducer'

import type { UserType } from './userReducer'
export type BlogType = {
  author: string,
  comments: Array<string>,
  id: string,
  likes: number,
  title: string,
  url: string,
  user: UserType
}

type BlogAction = {
  blogs: Array<BlogType>,
  blog: BlogType,
  comments: Array<string>,
  id: number,
  type: string
}

const blogReducer =
  (state: Array<BlogType> = [], action: BlogAction): Array<BlogType> => {
    switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'LIKE_BLOG': {
      const { blog } = action
      const blogs: Array<BlogType> = state.filter(b => b.id !== blog.id)
      blogs.push(blog)
      return blogs.sort(sortByLikes)
    }
    case 'NEW_BLOG':
      return state.concat(action.blog).sort(sortByLikes)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.id)
    case 'SET_COMMENTS':
      return state.map(b => b.id === action.id ?
        { ...b, comments: action.comments } : b
      )
    case 'LOGOUT':
      return []
    default:
      return state
    }
  }

const sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes

const handleGenericError = (e: Object, dispatch: Object => void) => {
  let error: string = e.response.data.error
  error = typeof error === 'string' ? error : JSON.stringify(error)
  notifyError(error, 5000)(dispatch)
}

export const initBlogs = () => async (dispatch: Object => void) => {
  const blogs: Array<BlogType> = await blogService.getAll()
  blogs.sort(sortByLikes)
  dispatch({ type: 'INIT_BLOGS', blogs })
}

export const likeBlog =
  (blog: BlogType, history: Object) =>
    async (dispatch: Object => void) => {
      try {
        blog.likes++
        // can't use blog directly because of Flow's type checking
        const blogToUpdate: Object = { ...blog }
        if (blogToUpdate.user)
          blogToUpdate.user = blogToUpdate.user.id
        const updatedBlog: BlogType =
          await blogService.update(blogToUpdate.id, blogToUpdate)
        dispatch({ type: 'LIKE_BLOG', blog: updatedBlog })
      } catch(e) {
        if (e.response.status === 404) {
          await dispatch({ type: 'REMOVE_BLOG', id: blog.id })
          history.push('/blogs')
        }
        handleGenericError(e, dispatch)
      }
    }

export const newBlog = (blog: BlogType, cleanForm: () => void, history: Object) =>
  async (dispatch: Object => void) => {
    try {
      const createdBlog: BlogType = await blogService.create(blog)
      await dispatch({ type: 'NEW_BLOG', blog: createdBlog })
      cleanForm()
      const { author, title } = createdBlog
      const message = `new blog added: ${title} by ${author}`
      notifyMessage(message, 5000)(dispatch)
      history.push(`/blogs/${createdBlog.id}`)
    } catch(e) {
      handleGenericError(e, dispatch)
    }
  }

export const newComment =
  (id: string, comment: string, cleanForm: () => void, history: Object) =>
    async (dispatch: Object => void) => {
      try {
        const comments = await blogService.comment(id, comment)
        if (!comments.includes(comment))
          return notifyError('something went wrong', 5000)(dispatch)
        await dispatch({ type: 'SET_COMMENTS', id, comments })
        cleanForm()
        const message = `new comment added: "${comment}"`
        notifyMessage(message, 5000)(dispatch)
      } catch(e) {
        if (e.response.status === 404) {
          await dispatch({ type: 'REMOVE_BLOG', id })
          history.push('/blogs')
        }
        handleGenericError(e, dispatch)
      }
    }

export const removeBlog = (blog: BlogType, history: Object) =>
  async (dispatch: Object => void) => {
    if (!window.confirm(`delete "${blog.title}" by ${blog.author}?`))
      return
    try {
      await blogService.remove(blog.id)
      await dispatch({ type: 'REMOVE_BLOG', id: blog.id })
      const message = `successfully deleted "${blog.title}"`
      notifyMessage(message, 5000)(dispatch)
      history.push('/blogs')
    } catch(e) {
      if (e.response.status === 404) {
        await dispatch({ type: 'REMOVE_BLOG', id: blog.id })
        const message = `"${blog.title}" was already deleted from the server`
        notifyMessage(message, 5000)(dispatch)
        history.push('/blogs')
      } else
        handleGenericError(e, dispatch)
    }
  }

export default blogReducer
