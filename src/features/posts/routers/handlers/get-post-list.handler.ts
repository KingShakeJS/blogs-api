import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'

export const getPostListHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postsRepository.findAll()
    const blogs = await blogsRepository.findAll()

    const postsWithBlogName = posts.map((p) => {
      const blogName = blogs.find(
        (blog) => blog._id.toString() === p.blogId,
      )?.name

      return {
        ...p,
        blogName: blogName ? blogName : 'NoName',
      }
    })

    res.status(HttpStatus.Ok).send(postsWithBlogName)
  } catch {
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
