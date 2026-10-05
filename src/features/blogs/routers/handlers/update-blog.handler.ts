import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { blogsRepository } from '../../repositiries/blogs.repository'
import { BlogInputDtoType } from '../../dto/blog.input.dto'
import { createErrorMessages } from '../../../../core/middlewares/validation/input-validation-result.middleware'

export const updateBlogHandler = async (
  req: Request<{ id: string }, {}, BlogInputDtoType>,
  res: Response,
) => {
  try {
    const isUpdated = await blogsRepository.update(req.params.id, req.body)

    if (!isUpdated) {
      res
        .status(HttpStatus.NotFound)
        .send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]))
      return
    }

    res.sendStatus(HttpStatus.NoContent)
  } catch {
    res.sendStatus(HttpStatus.InternalServerError)
  }
}
