import { Collection, Db } from 'mongodb'
import { BlogType } from '../features/blogs/types/blogType'
import { PostType } from '../features/posts/types/postType'

export const BLOG_COLLECTION_NAME = 'blogs'
export const POST_COLLECTION_NAME = 'posts'

// Коллекции инициализируются один раз в initCollections() после подключения к БД.
// До этого момента они undefined, поэтому обращаться к ним можно только после runDB().
export let blogCollection: Collection<BlogType>
export let postCollection: Collection<PostType>

// Создаём объекты коллекций из подключённой базы.
export function initCollections(db: Db): void {
  blogCollection = db.collection<BlogType>(BLOG_COLLECTION_NAME)
  postCollection = db.collection<PostType>(POST_COLLECTION_NAME)
}

// Список всех коллекций считаем в МОМЕНТ вызова (уже после initCollections),
// а не на этапе загрузки модуля — иначе сюда попали бы ещё не инициализированные (undefined) коллекции.
export function getAllCollections(): Collection<any>[] {
  return [blogCollection, postCollection]
}
