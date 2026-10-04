import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { BlogType } from '../../dto/post.input.dto'
import { createErrorMessages } from '../../../../core/middlewares/validation/input-validation-result.middleware'

export const updatePostHandler = (
  req: Request<{ id: string }, {}, BlogType>,
  res: Response,
) => {
  const isUpdated = postsRepository.update(req.params.id, req.body)

  if (!isUpdated) {
    return res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post Not Found' }]))
  }

  return res.sendStatus(HttpStatus.NoContent)
}
