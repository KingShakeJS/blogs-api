import { Router } from 'express'
import { POSTS_ROUTES } from '../constants/posts.path'
import { getPostListHandler } from './handlers/get-post-list.handler'
import { createPostHandler } from './handlers/create-new-post.handler'
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware'

export const postsRouter = Router()

postsRouter
  .get(POSTS_ROUTES.ROOT, getPostListHandler)
  .post(POSTS_ROUTES.ROOT, superAdminGuardMiddleware, createPostHandler)
