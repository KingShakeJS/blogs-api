import { Request, Response } from 'express'
import { HttpStatus } from '../../../core/types/http-statuses.js'
import { blogsRepository } from '../../repositiries/blogs.repository.js'
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware'

export const getBlogHandler = (req: Request<{ id: string }>, res: Response) => {
  const blog = blogsRepository.findById(req.params.id)

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'blog not found' }]))
    return
  }

  res.status(HttpStatus.Ok).send(blog)
}
