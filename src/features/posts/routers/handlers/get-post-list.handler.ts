import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'
import { mapToPostViewModel } from '../mappers/map-to-post-view-model'

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
    const postsViewModel = postsWithBlogName.map((post) => {
      return {
        ...mapToPostViewModel(post),
        blogName: post.blogName ? post.blogName : 'NoName',
      }
    })

    res.status(HttpStatus.Ok).send(postsViewModel)
  } catch {
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
