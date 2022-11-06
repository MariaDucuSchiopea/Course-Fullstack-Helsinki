const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Favorite',
    author: 'Mery',
    url: 'http://',
    likes: 18,
    id: 1
  },
  {
    title: 'New blog',
    author: 'Bogdan',
    url: 'http://',
    id: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'author',
    url: '',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}
