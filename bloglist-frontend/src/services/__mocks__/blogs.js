const blogs = [
  {
    id: '5b2b83ae5301912cd4f33f2c',
    user: {
      id: '5b2acb1f140b1521cc5b5e34',
      username: 'Nonna',
      name: 'Papera',
      adult: true
    },
    title: 'Magic',
    author: 'Titan',
    url: 'http://fake..1',
    likes: 5
  },
  {
    id: '5b2b84ac78c7482a2031d9ef',
    user: {
      id: '5b2acb1f140b1521cc5b5e35',
      username: 'Topo',
      name: 'Gigio',
      adult: false
    },
    title: 'Argh',
    author: 'Pirate',
    url: 'http://fake..2',
    likes: 1
  },
  {
    id: '5b2bb833dea501093cd22097',
    user: {
      id: '5b2acb1f140b1521cc5b5e36',
      username: 'Ame',
      name: 'Lia',
      adult: true
    },
    title: 'Amelia',
    author: 'Paperone',
    url: 'http://fake..3',
    likes: 102
  },
  {
    id: '5b2bbd95423e6c3af4c4aaa4',
    user: {
      id: '5b2acb1f140b1521cc5b5e38',
      username: 'Pippo',
      name: 'Super',
      adult: false
    },
    title: 'Ahoi',
    author: 'Scono Sciuto',
    url: 'http://fake..4',
    likes: 0
  },
  {
    id: '5b3262fdb7fd2d27ccadc751',
    user: {
      id: '5b2acb1f140b1521cc5b5e36',
      username: 'Ame',
      name: 'Lia',
      adult: true
    },
    title: 'Whales',
    author: 'Dolphin',
    url: 'http://fake..5',
    likes: 12
  },
  {
    id: '5b338e68fb6fc053e6cf9ced',
    title: 'JS',
    author: 'Cript',
    url: 'http://fake..6',
    likes: 0
  },
  {
    id: '5b338e97fb6fc053e6cf9cf6',
    title: 'Has',
    author: 'Kell',
    url: 'http://fake..7',
    likes: 5
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

export default { blogs, getAll, setToken }
