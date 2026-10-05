import { BlogType } from '../../types/blogType'
import { BlogInputDtoType } from '../../dto/blog.input.dto'

export function mapBlogInputDtoToBlog(dto: BlogInputDtoType): BlogType {
  return {
    name: dto.name,
    description: dto.description,
    websiteUrl: dto.websiteUrl,
  }
}
