import { PostInputDto } from '../../dto/post.input.dto'
import { PostType } from '../../types/postType'

export const mapPostInputDtoToPost = (
  post: PostInputDto,
): Omit<PostType, 'createdAt'> => {
  return {
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
  }
}
