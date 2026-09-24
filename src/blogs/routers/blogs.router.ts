import { Router } from 'express'
import { BLOGS_ROUTES } from '../constants/blogs.path.js'
import { getBlogListHandler } from './handlers/get-blog-list.handler.js'
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware'
import { createNewBlogHandler } from './handlers/create-new-blog.handler'

export const blogsRouter = Router()

blogsRouter
  // .use(superAdminGuardMiddleware)
  .get(BLOGS_ROUTES.ROOT, getBlogListHandler)
  .post(BLOGS_ROUTES.ROOT, superAdminGuardMiddleware, createNewBlogHandler)
