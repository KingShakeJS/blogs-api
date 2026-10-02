import { db } from '../../../db/in-memory.db'
import { PostType } from '../types/postType'

export const postsRepository = {
  findAll(): PostType[] {
    return db.posts
  },
  findById(id: string): PostType | null {
    const post = db.posts.find((post) => post.id === id)
    return post ? post : null
  },
  create(newPost: Omit<PostType, 'id'>): PostType {
    const lastPostId = db.posts.at(-1)?.id
    const createdPost: PostType = {
      id: lastPostId ? (+lastPostId + 1).toString() : '1',
      ...newPost,
    }
    db.posts.push(createdPost)
    return createdPost
  },
  update(id: string, body: Omit<PostType, 'id'>): boolean {
    const index = db.posts.findIndex((post) => post.id === id)
    if (index === -1) {
      return false
    }
    db.posts[index] = { ...db.posts[index], ...body }
    return true
  },
  delete(id: string): boolean {
    const index = db.posts.findIndex((post) => post.id === id)
    if (index === -1) {
      return false
    }
    db.posts.splice(index, 1)
    return true
  },
}
