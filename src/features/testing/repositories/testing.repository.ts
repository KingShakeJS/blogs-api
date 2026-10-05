// import { db } from '../../../db/in-memory.db.depreceted'

import { blogCollection, postCollection } from '../../../db/collections'

export const testingRepository = {
  async delete(): Promise<boolean> {
    try {
      // Запускаем удаление в обеих коллекциях одновременно
      await Promise.all([
        blogCollection.deleteMany({}),
        postCollection.deleteMany({}),
      ])

      return true
    } catch (error) {
      console.error('Error during database clearing:', error)
      return false
    }
  },
}
