import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  let blog
  beforeAll(() => {
    blog = {
      title: 'Javascript and such',
      author: 'JSus',
      url: 'http://fakeJSfake',
      likes: 5
    }
  })

  it('renders title, author and likes', () => {
    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const sBlogInfoDiv = simpleBlogComponent.find('.sBlogInfo')
    const sBlogLikesDiv = simpleBlogComponent.find('.sBlogLikes')
    expect(sBlogInfoDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(sBlogLikesDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  it('clicking the like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()
    const simpleBlogComponent =
      shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
