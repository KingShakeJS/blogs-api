import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'

export const createPostHandler = async (req: Request, res: Response) => {
  if (req.body) {
    const blogName = blogsRepository
      .findAll()
      .find((blog) => blog.id === req.body.blogId)?.name
    return res
      .status(HttpStatus.Created)
      .json({
        ...postsRepository.create(req.body),
        blogName: blogName ? blogName : 'NoName',
      })
  }

  return res.sendStatus(HttpStatus.BadRequest)
}
