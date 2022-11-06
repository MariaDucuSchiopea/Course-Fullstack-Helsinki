const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(
    (newblog) => new Blog(newblog)
  )
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is favorite', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Favorite')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)
  expect(title).toContain('New blog')
})

test('a HTTP POST request creates a new blog post', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Javascript',
    url: 'http://callbackhell.com/',
    likes: 158
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain('async/await simplifies making async calls')
})

test('there is a unique identifier named id', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body.map((r) => r.id)
  expect(id).toBeDefined()
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'undefined',
    url: 'some url but no title'
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'there is no url here',
    author: 'undefined'
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog without likes has 0 as default', async () => {
  const newBlog = {
    title: 'blog post title',
    author: 'blog post author',
    url: 'blog post url'
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('a HTTP PUT request updates a specific blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToUpdate = blogsAtStart[1]

  const newBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 158
  }
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)

  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(title).toContain(blogToUpdate.title)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body.title).toEqual(processedBlogToView.title)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const id = blogsAtEnd.map((r) => r.id)

  expect(id).not.toContain(blogToDelete.id)
})

afterAll(() => {
  mongoose.connection.close()
})
