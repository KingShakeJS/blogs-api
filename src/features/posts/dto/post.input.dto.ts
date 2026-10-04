import { PostType } from '../types/postType'

export type PostInputDto = Omit<PostType, 'id'>
