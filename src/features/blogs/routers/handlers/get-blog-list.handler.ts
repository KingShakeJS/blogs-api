import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { blogsRepository } from '../../repositiries/blogs.repository'

// 1. Делаем функцию асинхронной с помощью async
export const getBlogListHandler = async (req: Request, res: Response) => {
  try {
    // 2. Дожидаемся выполнения запроса к БД с помощью await
    const blogs = await blogsRepository.findAll()

    // 3. Отправляем успешный статус и полученные данные
    res.status(HttpStatus.Ok).send(blogs)
  } catch (error) {
    // 4. Логируем ошибку и возвращаем 500 статус в случае сбоя базы данных

    res.sendStatus(HttpStatus.InternalServerError)
  }
}