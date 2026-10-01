import { db } from '../../db/in-memory.db.js'
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
}
