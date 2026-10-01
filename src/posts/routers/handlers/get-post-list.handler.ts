import { Request, Response } from 'express'
import { HttpStatus } from '../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'

export const getPostListHandler = (req: Request, res: Response) => {
  const posts = postsRepository.findAll()
  const blogs = blogsRepository.findAll()

  const postsWithBlogName = posts.map((p) => {
    const blogName = blogs.find((blog) => blog.id === p.blogId)?.name

    return {
      ...p,
      blogName: blogName ? blogName : 'NoName',
    }
  })

  res.status(HttpStatus.Ok).send(postsWithBlogName)
}
