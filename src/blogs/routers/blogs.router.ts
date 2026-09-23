import { Router } from 'express'
import { BLOGS_ROUTES } from '../constants/blogs.path.js'
import { getBlogListHandler } from './handlers/get-blog-list.handler.js'

export const blogsRouter = Router()

blogsRouter
  // .use(superAdminGuardMiddleware)
  .get(BLOGS_ROUTES.ROOT, getBlogListHandler)
