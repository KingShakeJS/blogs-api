import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { blogsRepository } from '../../repositiries/blogs.repository'
import { createErrorMessages } from '../../../../core/middlewares/validation/input-validation-result.middleware'
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.utils'

export const getBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const blog = await blogsRepository.findById(req.params.id)

    if (!blog) {
      res
        .status(HttpStatus.NotFound)
        .send(createErrorMessages([{ field: 'id', message: 'blog not found' }]))
      return
    }

    res.status(HttpStatus.Ok).send(mapToBlogViewModel(blog))
  } catch {
    res.sendStatus(HttpStatus.InternalServerError)
  }
}
