
import { db } from '../../../db/in-memory.db'

export const testingRepository ={

  delete() {
    db.posts=[]
    db.blogs=[]
    return true
  },
}