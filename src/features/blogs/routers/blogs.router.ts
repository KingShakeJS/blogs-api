import { Router } from 'express'
import { BLOGS_ROUTES } from '../constants/blogs.path'
import { getBlogListHandler } from './handlers/get-blog-list.handler'
import { superAdminGuardMiddleware } from '../../../auth/middlewares/super-admin.guard.middleware'
import { createNewBlogHandler } from './handlers/create-new-blog.handler'
import { blogInputDtoValidation } from '../validation/blog.input-dto.validation-middlewares'
import { inputValidationResultMiddleware } from '../../../core/middlewares/validation/input-validation-result.middleware'
import { getBlogHandler } from './handlers/get-blog.handler'
import { idValidation } from '../../../core/middlewares/validation/params-id.validation.middleware'
import { updateBlogHandler } from './handlers/update-blog.handler'
import { deleteBlogHandler } from './handlers/delete-blog.handler'

export const blogsRouter = Router()

blogsRouter
  // .use(superAdminGuardMiddleware)
  .get(BLOGS_ROUTES.ROOT, getBlogListHandler)
  .get(
    BLOGS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getBlogHandler,
  )
  .post(
    BLOGS_ROUTES.ROOT,
    superAdminGuardMiddleware,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    createNewBlogHandler,
  )
  .put(
    BLOGS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )
  .delete(
    BLOGS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  )
