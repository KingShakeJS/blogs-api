import { db } from '../../db/in-memory.db.js'
import { PostType } from '../types/postType'

export const postsRepository = {
  findAll(): PostType[] {
    return db.posts
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
