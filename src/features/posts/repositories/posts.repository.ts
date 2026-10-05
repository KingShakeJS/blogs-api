// import { db } from '../../../db/in-memory.db.depreceted'
import { PostType } from '../types/postType'
import { postCollection } from '../../../db/collections'
import { ObjectId, WithId } from 'mongodb'

export const postsRepository = {
  async findAll(): Promise<WithId<PostType>[]> {
    return postCollection.find().toArray()
  },
  async findById(id: string): Promise<WithId<PostType> | null> {
    return (await postCollection.findOne({ _id: new ObjectId(id) })) || null
  },

  async create(newPost: PostType): Promise<WithId<PostType>> {
    // Делаем копию, чтобы не мутировать исходный объект аргумента

    const insertResult = await postCollection.insertOne(newPost)

    return {
      ...newPost,
      _id: insertResult.insertedId,
    }
  },

  async update(id: string, body: PostType): Promise<boolean> {
    const updateResult = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body },
    )
    return updateResult.matchedCount > 0
  },

  async delete(id: string): Promise<boolean> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    })
    return deleteResult.deletedCount > 0
  },
}
