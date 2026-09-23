import { db } from '../../db/in-memory.db.js'
import { BlogType } from '../types/blogType.js'

export const blogsRepository = {
  findAll(): BlogType[] {
    return db.blogs
  },
}
