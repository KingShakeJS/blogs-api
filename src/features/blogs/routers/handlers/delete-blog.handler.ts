import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { blogsRepository } from '../../repositiries/blogs.repository'
import { createErrorMessages } from '../../../../core/middlewares/validation/input-validation-result.middleware'

export const deleteBlogHandler = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const blog = blogsRepository.delete(req.params.id)

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'blog not found' }]))
    return
  }

  res.sendStatus(HttpStatus.NoContent)
}
