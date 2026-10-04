import { db } from '../../../db/in-memory.db.depreceted'

export const testingRepository = {
  delete() {
    db.posts = []
    db.blogs = []
    return true
  },
}
