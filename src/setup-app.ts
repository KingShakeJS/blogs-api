import express, { Express, Request, Response } from 'express'
import { HttpStatus } from './core/types/http-statuses.js'
import { blogsRouter } from './features/blogs/routers/blogs.router.js'
import { BLOGS_PATH } from './features/blogs/constants/blogs.path.js'
import { postsRouter } from './features/posts/routers/posts.router'
import { POSTS_PATH } from './features/posts/constants/posts.path'
import { testingRouter } from './features/testing/routes/testing.router'
import { TESTING_PATH } from './features/testing/constants/testing.path'

export const setupApp = (app: Express) => {
  // express.json() парсит JSON из тела запроса и кладёт его в req.body.
  app.use(express.json())

  // Health-check: простой ответ, что сервер жив.
  app.get('/', (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send('дороу world!')
  })
  app.use(BLOGS_PATH, blogsRouter)
  app.use(POSTS_PATH, postsRouter)
  app.use(TESTING_PATH, testingRouter)
  return app
}
