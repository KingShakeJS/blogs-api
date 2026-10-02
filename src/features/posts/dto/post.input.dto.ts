import { PostType } from '../types/postType'

export type BlogType = Omit<PostType, 'id'>
