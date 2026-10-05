import { blogsRepository } from '../../repositiries/blogs.repository'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { BlogInputDtoType } from '../../dto/blog.input.dto'
import { Request, Response } from 'express'
import { mapBlogInputDtoToBlog } from '../mappers/map-blog-input-dto-to-blog.util'
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.utils'
import { BlogType } from '../../types/blogType'

export const createNewBlogHandler = async (
  req: Request<{}, {}, BlogInputDtoType>, // Типизируем req.body, чтобы TypeScript не ругался на blogsRepository.create
  res: Response,
) => {
  try {
    const newBlog: BlogType = {
      ...mapBlogInputDtoToBlog(req.body),
      createdAt: new Date().toISOString(),
    }
    const createdBlog = await blogsRepository.create(newBlog)
    const driverViewModel = mapToBlogViewModel(createdBlog)

    res.status(HttpStatus.Created).send(driverViewModel)
  } catch {}
}

// export async function createDriverHandler(
//   req: Request<{}, {}, DriverInputDto>,
//   res: Response,
// ) {
//   try {
//     // Проекция DTO -> доменная модель; дату создания добавляем здесь.
//     const newDriver: Driver = {
//       ...mapDriverInputDtoToDriver(req.body),
//       createdAt: new Date(),
//     }
//
//     const createdDriver = await driversRepository.create(newDriver)
//     const driverViewModel = mapToDriverViewModel(createdDriver)
//     res.status(HttpStatus.Created).send(driverViewModel)
//   } catch {
//     res.sendStatus(HttpStatus.InternalServerError)
//   }
// }
