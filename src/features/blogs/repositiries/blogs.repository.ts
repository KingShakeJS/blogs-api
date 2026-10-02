import { db } from '../../../db/in-memory.db'
import { BlogType } from '../types/blogType'

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

  findById(id: string): BlogType | null {
    // Если ничего не нашли, find вернёт undefined — приводим к null.
    return db.blogs.find((d) => d.id === id) ?? null
  },
  // Принимает доменные поля (без служебных id/createdAt).
  // Возвращает true, если водитель найден и обновлён, иначе false.
  update(id: string, blog: Omit<BlogType, 'id'>): boolean {
    const index = db.blogs.findIndex((d) => d.id === id)

    if (index === -1) {
      return false
    }

    // Обновляем поля, сохраняя служебные id и createdAt.
    db.blogs[index] = { ...db.blogs[index], ...blog }
    return true
  },
  delete(id: string): boolean {
    const index = db.blogs.findIndex((d) => d.id === id)

    if (index === -1) {
      return false
    }

    db.blogs.splice(index, 1)
    return true
  },
}
