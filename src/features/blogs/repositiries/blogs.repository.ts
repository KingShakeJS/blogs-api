// import { db } from '../../../db/in-memory.db.depreceted'
import { ObjectId, WithId } from 'mongodb'
import { BlogType } from '../types/blogType'
import { blogCollection } from '../../../db/collections'

export const blogsRepository = {
  async findAll(): Promise<WithId<BlogType>[]> {
    return blogCollection.find().toArray()
  },
  async create(newBlog: Omit<BlogType, '_id'>): Promise<WithId<BlogType>> {
    const insertResult = await blogCollection.insertOne(newBlog)
    return { ...newBlog, _id: insertResult.insertedId }
  },

  async findById(id: string): Promise<WithId<BlogType> | null> {
    // Если ничего не нашли, find вернёт undefined — приводим к null.
    return blogCollection.findOne({ _id: new ObjectId(id) }) || null
  },

  async update(id: string, blog: Omit<BlogType, 'id'>): Promise<boolean> {
    const updateResult = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: blog },
    )

    return updateResult.matchedCount > 0
  },
  async delete(id: string): Promise<boolean> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    })

    return deleteResult.deletedCount > 0
  },
}
