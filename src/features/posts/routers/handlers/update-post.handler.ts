import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { createErrorMessages } from '../../../../core/middlewares/validation/input-validation-result.middleware'
import { PostType } from '../../types/postType'

export const updatePostHandler = async (
  req: Request<{ id: string }, {}, PostType>,
  res: Response,
) => {
  try {
    const isUpdated = await postsRepository.update(req.params.id, req.body)

    if (!isUpdated) {
      return res
        .status(HttpStatus.NotFound)
        .send(createErrorMessages([{ field: 'id', message: 'Post Not Found' }]))
    }

    return res.sendStatus(HttpStatus.NoContent)
  } catch {
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
