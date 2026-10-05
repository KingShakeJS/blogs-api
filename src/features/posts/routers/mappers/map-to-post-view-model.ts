import { PostType } from '../../types/postType'
import { WithId } from 'mongodb'
import { PostViewModelType } from '../../types/post-view-model'

export const mapToPostViewModel = (
  post: WithId<PostType>,
): Omit<PostViewModelType, 'blogName'> => {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    createdAt: post.createdAt,
  }
}
