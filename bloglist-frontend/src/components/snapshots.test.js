import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { blogs, loggedInUser, users } from '../test_utils/test_helper'
import { BrowserRouter as Router } from 'react-router-dom'
import { Blog } from './Blog'
import { BlogForm } from './BlogForm'
import { BlogList } from './BlogList'
import { CommentForm } from './CommentForm'
import { LoginForm } from './LoginForm'
import NavBar from './NavBar'
import NoMatch from './NoMatch'
import Notification from './Notification'
import SimpleBlog from './SimpleBlog'
import Togglable from './Togglable'
import { User } from './User'
import { UserList } from './UserList'

const fc = <div/>
const ff = () => {}
const fo = {}
const fs = 's'

it('renders <Blog/> correctly', () => {
  blogs.forEach(b => {
    const component = shallow(
      <Blog
        blog={b} history={fo} like={ff} loggedInUser={loggedInUser} remove={ff}
      />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})

it('renders <BlogForm/> correctly', () => {
  const tree = renderer
    .create(<BlogForm newBlog={ff} history={fo} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <BlogList/> correctly', () => {
  const tree = renderer
    .create(<Router><BlogList blogs={blogs} /></Router>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <CommentForm/> correctly', () => {
  const tree = renderer
    .create(<CommentForm blogId={blogs[0].id} history={fo} newComment={ff} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <LoginForm/> correctly', () => {
  const tree = renderer
    .create(<LoginForm focusRef={ff} history={fo} login={ff} url={fs} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <NavBar/> correctly', () => {
  const tree = renderer
    .create(<Router><NavBar loginInfo={fc} logoutButton={fc} /></Router>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <NoMatch/> correctly', () => {
  const tree = renderer
    .create(<NoMatch/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <Notification/> correctly', () => {
  ['error', 'message'].forEach(s => {
    const tree = renderer
      .create(<Notification message={s} className={s} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

it('renders <SimpleBlog/> correctly', () => {
  const tree = renderer
    .create(<SimpleBlog blog={blogs[0]} onClick={ff} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <Togglable/> correctly', () => {
  const tree = renderer
    .create(<Togglable buttonLabel={fs}>{fc}</Togglable>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <User/> correctly', () => {
  const tree = renderer
    .create(<User user={users[0]} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders <UserList/> correctly', () => {
  const tree = renderer
    .create(<Router><UserList users={users} /></Router>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
