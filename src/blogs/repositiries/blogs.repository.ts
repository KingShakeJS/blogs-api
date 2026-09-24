import { db } from '../../db/in-memory.db.js'
import { BlogType } from '../types/blogType.js'

export const blogsRepository = {
  findAll(): BlogType[] {
    return db.blogs
  },
  create(newBlog: Omit<BlogType, 'id'>): BlogType {
    const lastBlogId = db.blogs.at(-1)?.id
    const createdBlog: BlogType = {
      id: lastBlogId ? (+lastBlogId + 1).toString() : '1',
      ...newBlog,
    }
    db.blogs.push(createdBlog)
    return createdBlog
  },
}
