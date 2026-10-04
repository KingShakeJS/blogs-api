import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'

import { createErrorMessages } from '../../../../core/middlewares/validation/input-validation-result.middleware'

export const deletePostHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const post = postsRepository.delete(req.params.id)
  if (!post) {
    return res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post Not Found' }]))
  }

  return res.sendStatus(HttpStatus.NoContent)
}
