import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'

export const getPostHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const post = await postsRepository.findById(req.params.id)
    if (post) {
      const currentBlog = await blogsRepository.findById(post.blogId)

      return res
        .status(HttpStatus.Ok)
        .json({ ...post, blogName: currentBlog ? currentBlog.name : 'NoName' })
    }
    return res.sendStatus(HttpStatus.NotFound)
  } catch {
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
