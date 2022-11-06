const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  let numberOfLikes = array.map((item) => item.likes)
  const favLikes = Math.max(...numberOfLikes)
  const favTitle = array[numberOfLikes.indexOf(favLikes)].title
  const favAuthor = array[numberOfLikes.indexOf(favLikes)].author
  const favoriteResult = {
    title: favTitle,
    author: favAuthor,
    likes: favLikes
  }
  console.log(favoriteResult)
  return favoriteResult
}

const authorLikes = (array) => {
  let sumOfLikes = _(array)
    .groupBy('author')
    .map((objs, key) => {
      return {
        author: key,
        likes: _.sumBy(objs, 'likes')
      }
    })
    .value()
  return sumOfLikes[0]
}

const authorBlogs = (array) => {
  let sumOfBlogs = _(array)
    .countBy('author')
    .map((objs, key) => {
      return {
        author: key,
        blogs: objs
      }
    })
    .value()
  return sumOfBlogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorLikes,
  authorBlogs
}
