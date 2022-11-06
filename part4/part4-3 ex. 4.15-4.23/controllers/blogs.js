const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (
//     authorization &&
//     authorization.toLowerCase().startsWith('bearer ')
//   ) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body
    const token = request.token

    if (!token) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    if (!request.user) {
      return response.status(401).json({ error: 'invalid user' })
    }

    const user = request.user
    // exercise 4.17
    //const user = await User.findOne({ username })

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
)

blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    if (!request.token) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }

    if (!request.user) {
      return response.status(401).json({ error: 'invalid user' })
    }
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response
        .status(401)
        .json({ error: 'user has not rights to delete' })
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    {
      new: true
    }
  )
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
