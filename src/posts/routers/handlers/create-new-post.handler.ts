import { Request, Response } from 'express'
import { HttpStatus } from '../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'

export const createPostHandler = async (req: Request, res: Response) => {
  if (req.body) {
    // ВАЖНО: добавлен return перед res.status
    return res.status(HttpStatus.Created).json(postsRepository.create(req.body))
  }

  // ВАЖНО: добавлен return здесь для консистентности
  return res.sendStatus(HttpStatus.BadRequest)
}
