import { Request, Response } from 'express'
import { HttpStatus } from '../../../core/types/http-statuses.js'
import { blogsRepository } from '../../repositiries/blogs.repository.js'

export const getBlogListHandler = (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send(blogsRepository.findAll())
}
