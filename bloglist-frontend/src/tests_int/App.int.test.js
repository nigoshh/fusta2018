import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import LoginForm from '../components/LoginForm'
import blogService from '../services/blogs'

describe('<App />', () => {

  let app
  const user = {
    username: 'ttesttt',
    token: '6969',
    name: 'Testa Di Tester'
  }

  describe('when user is not logged in', () => {

    beforeEach(() => {
      localStorage.clear()
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const loginFormComponent = app.find(LoginForm)
      const blogFormComponent = app.find(BlogForm)
      const blogComponents = app.find(Blog)
      expect(loginFormComponent.length).toEqual(1)
      expect(blogFormComponent.length).toEqual(0)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged in', () => {

    beforeEach(() => {
      localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('only blogs and blog form are rendered', () => {
      app.update()
      const loginFormComponent = app.find(LoginForm)
      const blogFormComponent = app.find(BlogForm)
      const blogComponents = app.find(Blog)
      expect(loginFormComponent.length).toEqual(0)
      expect(blogFormComponent.length).toEqual(1)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
