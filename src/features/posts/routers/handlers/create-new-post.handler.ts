import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { postsRepository } from '../../repositories/posts.repository'
import { blogsRepository } from '../../../blogs/repositiries/blogs.repository'
import { mapPostInputDtoToPost } from '../mappers/map-post-input-dto-to-post.utils'
import { mapToPostViewModel } from '../mappers/map-to-post-view-model'

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const targetBlog = await blogsRepository.findById(req.body.blogId)

    const a = mapPostInputDtoToPost(req.body)

    const createdPost = await postsRepository.create({
      ...a,
      createdAt: new Date().toISOString(),
    })

    return res.status(HttpStatus.Created).json({
      ...mapToPostViewModel(createdPost),
      blogName: targetBlog ? targetBlog.name : 'NoName',
    })
  } catch (error) {
    console.error(error)
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
