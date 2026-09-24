import { BlogType } from '../types/blogType'

export type BlogInputDtoType = Omit<BlogType, 'id'>
