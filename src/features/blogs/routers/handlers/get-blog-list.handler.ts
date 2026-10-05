import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { blogsRepository } from '../../repositiries/blogs.repository'
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.utils'

// 1. Делаем функцию асинхронной с помощью async
export const getBlogListHandler = async (req: Request, res: Response) => {
  try {
    // 2. Дожидаемся выполнения запроса к БД с помощью await
    const blogs = await blogsRepository.findAll()
    const blogsViewModel = blogs.map(mapToBlogViewModel)

    // 3. Отправляем успешный статус и полученные данные
    res.status(HttpStatus.Ok).send(blogsViewModel)
  } catch (error) {
    // 4. Логируем ошибку и возвращаем 500 статус в случае сбоя базы данных

    res.sendStatus(HttpStatus.InternalServerError)
  }
}
