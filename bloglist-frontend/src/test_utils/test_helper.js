export const blogs = [{
  id: '5b2b843c78c7482a2031d9eb',
  title: 'Paperopoli',
  author: 'Zio',
  url: 'httpke',
  likes: 7,
  comments: ['yo', 'cheers', 'mate'],
  user: {
    id: '5b2acb1f140b1521cc5b5e34',
    adult: true,
    username: 'Nonna',
    name: 'Papera'
  }
},
{
  id: '5b2b849178c7482a2031d9ed',
  title: 'Cash',
  author: 'Spitty',
  url: 'httpmah',
  likes: 23,
  comments: ['nice stuff'],
  user: {
    id: '5b2acb1f140b1521cc5b5e36',
    adult: false,
    username: 'Ame',
    name: 'Lia'
  }
},
{
  id: '5b2bbd95423e6c3af4c4aaa4',
  title: 'Jam',
  author: 'Jazz',
  url: 'httpb',
  likes: 0,
  comments: [],
  user: {
    id: '5b2acb1f140b1521cc5b5e36',
    adult: false,
    username: 'Ame',
    name: 'Lia'
  }
}]

export const loggedInUser = {
  id: '5b2acb1f140b1521cc5b5e36',
  name: 'Lia',
  token: 'fakeT',
  username: 'Ame'
}

export const users = [{
  id: '5b2acb1f140b1521cc5b5e36',
  adult: false,
  username: 'Ame',
  name: 'Lia',
  blogs: [{
    id: '5b2b849178c7482a2031d9ed',
    title: 'Cash',
    author: 'Spitty',
    url: 'httpmah',
    likes: 23,
    comments: ['nice stuff'],
  },
  {
    id: '5b2bbd95423e6c3af4c4aaa4',
    title: 'Jam',
    author: 'Jazz',
    url: 'httpb',
    likes: 0,
    comments: []
  }]
},
{
  id: '5b2acb1f140b1521cc5b5e34',
  adult: true,
  username: 'Nonna',
  name: 'Papera',
  blogs: [{
    id: '5b2b843c78c7482a2031d9eb',
    title: 'Paperopoli',
    author: 'Zio',
    url: 'httpke',
    likes: 7,
    comments: ['yo', 'cheers', 'mate']
  }]
},
{
  id: '5b2acb1f140b1521cc5b5e37',
  adult: false,
  username: 'Pape',
  name: 'Rino',
  blogs: []
}]
