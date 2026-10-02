import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'

export const getPostHandler = (req: Request<{ id: string }>, res: Response) => {
  const post = postsRepository.findById(req.params.id)
  if (post) {
    const blogName = blogsRepository
      .findAll()
      .find((blog) => blog.id === post.blogId)?.name
    return res
      .status(HttpStatus.Ok)
      .json({ ...post, blogName: blogName ? blogName : 'NoName' })
  }
  return res.sendStatus(HttpStatus.NotFound)
}
