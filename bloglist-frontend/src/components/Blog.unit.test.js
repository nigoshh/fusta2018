import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {

  let blogComponent
  const user = {
    id: '32',
    name: 'yo'
  }
  const blog = {
    title: 'Javascript and such',
    author: 'JSus',
    url: 'http://fakeJSfake',
    likes: 5,
    user
  }
  const fakeFunc = () => {}

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={blog}
        handleLike={fakeFunc}
        loggedInUser={user}
        remove={fakeFunc}
      />)
  })

  it('renders blog\'s title, author, url, user and likes', () => {
    const nameDiv = blogComponent.find('div[onClick]')
    const detailsDiv = blogComponent.find('.tab')
    const detailsDivtext = detailsDiv.text()
    expect(nameDiv.text()).toContain(`${blog.title} – ${blog.author}`)
    expect(detailsDivtext).toContain(blog.url)
    expect(detailsDivtext).toContain(`added by ${blog.user.name}`)
    expect(detailsDivtext).toContain(`${blog.likes} likes`)
  })

  it('at start the details are not displayed', () => {
    const detailsDiv = blogComponent.find('.tab')
    expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('clicking a blog\' name toggles its details', () => {
    const nameDiv = blogComponent.find('div[onClick]')
    for (let i = 0; i < 7; i++) {
      nameDiv.simulate('click')
      let detailsDiv = blogComponent.find('.tab')
      expect(detailsDiv.getElement().props.style).toEqual({ display: '' })
      nameDiv.simulate('click')
      detailsDiv = blogComponent.find('.tab')
      expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
    }
  })
})
