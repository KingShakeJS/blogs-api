import { BlogType } from '../../types/blogType'
import { blogsRepository } from '../../repositiries/blogs.repository'
import { HttpStatus } from '../../../core/types/http-statuses'
import { BlogInputDtoType } from '../../dto/blog.input.dto'
import { Request, Response } from 'express'

export const createNewBlogHandler = (
  req: Request<{}, {}, BlogInputDtoType>, // Типизируем req.body, чтобы TypeScript не ругался на blogsRepository.create
  res: Response,
) => {
  if (req.body && req.body.name) {
    // Дополнительно проверяем, что в body пришли нужные данные
    // ВАЖНО: добавлен return перед res.status
    return res.status(HttpStatus.Created).json(blogsRepository.create(req.body))
  }

  // ВАЖНО: добавлен return здесь для консистентности
  return res.sendStatus(HttpStatus.BadRequest)
}
