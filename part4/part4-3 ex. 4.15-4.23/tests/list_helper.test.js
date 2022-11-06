const totalLikes = require('../utils/list_helper').totalLikes
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '6347e6f3770e448d94b130f2',
      title: 'New blog',
      author: 'Mery',
      url: '...',
      likes: 55,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      _id: '6347e6f3770e448d94b130f2',
      title: 'New blog',
      author: 'Mery',
      url: '...',
      likes: 30,
      __v: 0
    },
    {
      _id: '6347e70b770e448d94b130f4',
      title: 'Another blog',
      author: 'Mery',
      url: '...',
      likes: 40,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(55)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(70)
  })

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  const listWithManyBlogs = [
    {
      _id: '6347e6f3770e448d94b130f2',
      title: 'Favorite',
      author: 'Mery',
      url: '...',
      likes: 50,
      __v: 0
    },
    {
      _id: '6347e70b770e448d94b130f4',
      title: 'Another blog',
      author: 'Mery',
      url: '...',
      likes: 40,
      __v: 0
    },
    {
      _id: '6347e70b770e448d94b130f4',
      title: 'Own blog',
      author: 'Bogdan',
      url: '...',
      likes: 40,
      __v: 0
    }
  ]

  test('favorite blog of a multiple blogs list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    const favorite = { title: 'Favorite', author: 'Mery', likes: 50 }
    expect(result).toEqual(favorite)
  })
})

describe('most blogs and most likes', () => {
  const listWithManyBlogs = [
    {
      _id: '6347e6f3770e448d94b130f2',
      title: 'New blog',
      author: 'Mery',
      url: '...',
      likes: 30,
      __v: 0
    },
    {
      _id: '6347e70b770e448d94b130f4',
      title: 'Another blog',
      author: 'Mery',
      url: '...',
      likes: 40,
      __v: 0
    },
    {
      _id: '6347e70b770e448d94b130f4',
      title: 'Own blog',
      author: 'Bogdan',
      url: '...',
      likes: 40,
      __v: 0
    }
  ]

  test('most blogs', () => {
    const result = listHelper.authorBlogs(listWithManyBlogs)
    const mostBlogs = { author: 'Mery', blogs: 2 }
    expect(result).toEqual(mostBlogs)
  })

  test('most likes', () => {
    const result = listHelper.authorLikes(listWithManyBlogs)
    const mostLikes = { author: 'Mery', likes: 70 }
    expect(result).toEqual(mostLikes)
  })
})
