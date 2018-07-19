import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'
import { blogs } from '../test_utils/test_helper'

describe('blogReducer', () => {

  const initialState = []

  it('returns a proper initial state when called with undefined state', () => {
    const action = { type: 'DO_NOTHING' }
    const newState = blogReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('initializes blogs', () => {
    const action = { type: 'INIT_BLOGS', blogs }
    const state = [...initialState]
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toEqual(blogs)
  })

  it('likes a blog', () => {
    const state = [...blogs]
    let { likes, ...rest } = state[0]
    likes++
    const blog = { likes, ...rest }
    const action = { type: 'LIKE_BLOG', blog }
    deepFreeze(state)
    const newState = blogReducer(state, action)
    const newBlogs = [...blogs]
    newBlogs[0] = blog
    newBlogs.forEach(nb => expect(newState).toContainEqual(nb))
  })

  it('adds a blog', () => {
    const action = { type: 'NEW_BLOG', blog: blogs[1] }
    const state = [...initialState]
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toEqual([blogs[1]])
  })

  it('removes a blog', () => {
    const action = { type: 'REMOVE_BLOG', id: blogs[0].id }
    const state = [...blogs]
    deepFreeze(state)
    const newState = blogReducer(state, action)
    const newBlogs = [...blogs]
    newBlogs.shift()
    expect(newState.length).toEqual(newBlogs.length)
    newBlogs.forEach(nb => expect(newState).toContainEqual(nb))
  })

  it('sets a blog\'s comments', () => {
    const comments = [...blogs[0].comments]
    const newComment = 'new comment yo'
    comments.push(newComment)
    const action = { type: 'SET_COMMENTS', id: blogs[0].id , comments }
    const state = [{ ...blogs[0] }]
    deepFreeze(state)
    const newState = blogReducer(state, action)
    const newBlogs = [{ ...blogs[0], comments }]
    expect(newState).toEqual(newBlogs)
  })

  it('resets to initial state when users logs out', () => {
    const action = { type: 'LOGOUT' }
    const state = [...blogs]
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})
