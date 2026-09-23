import express, { Express, Request, Response } from 'express'
import { HttpStatus } from './core/types/http-statuses.js'
import { blogsRouter } from './blogs/routers/blogs.router.js'
import { BLOGS_PATH } from './blogs/constants/blogs.path.js'

export const setupApp = (app: Express) => {
  // express.json() парсит JSON из тела запроса и кладёт его в req.body.
  app.use(express.json())

  // Health-check: простой ответ, что сервер жив.
  app.get('/', (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send('дороу world!')
  })
  app.use(BLOGS_PATH, blogsRouter)
  return app
}
