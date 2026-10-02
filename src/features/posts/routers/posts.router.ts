import { Router } from 'express'
import { POSTS_ROUTES } from '../constants/posts.path'
import { getPostListHandler } from './handlers/get-post-list.handler'
import { createPostHandler } from './handlers/create-new-post.handler'
import { superAdminGuardMiddleware } from '../../../auth/middlewares/super-admin.guard.middleware'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'
import { postInputValidation } from '../validation/post.input-dto.validation-middleware'
import { idValidation } from '../../../core/middlewares/validation/params-id.validation.middleware'
import { getPostHandler } from './handlers/get-blog.handler'
import { updatePostHandler } from './handlers/update-post.handler'
import { deletePostHandler } from './handlers/delete-post.handler'

export const postsRouter = Router()

postsRouter
  .get(POSTS_ROUTES.ROOT, getPostListHandler)

  .get(
    POSTS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getPostHandler,
  )

  .post(
    POSTS_ROUTES.ROOT,
    superAdminGuardMiddleware,
    postInputValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )
  .put(
    POSTS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    postInputValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )
  .delete(
    POSTS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  )
