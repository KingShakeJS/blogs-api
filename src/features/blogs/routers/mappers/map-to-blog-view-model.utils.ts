import { BlogType } from '../../types/blogType'
import { WithId } from 'mongodb'
import { BlogViewModelType } from '../../types/blog-view-model'

export const mapToBlogViewModel = (
  blog: WithId<BlogType>,
): BlogViewModelType => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  }
}
