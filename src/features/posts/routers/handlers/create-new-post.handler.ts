import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    // 1. Ищем конкретный блог по ID (в репозитории блогов должен быть метод findById)
    // Не забываем преобразовать строку req.body.blogId в ObjectId внутри findById!
    const targetBlog = await blogsRepository.findById(req.body.blogId)

    // 2. Создаем пост в базе данных
    const createdPost = await postsRepository.create(req.body)

    // 3. Формируем ответ клиенту
    return res.status(HttpStatus.Created).json({
      ...createdPost,
      blogName: targetBlog ? targetBlog.name : 'NoName',
    })
  } catch (error) {
    console.error(error)
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
