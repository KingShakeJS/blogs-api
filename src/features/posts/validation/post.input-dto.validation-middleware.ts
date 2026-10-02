import { body } from 'express-validator'

// {
//   "title": "string",
//   "shortDescription": "string",
//   "content": "string",
//   "blogId": "string"
// }

const titleValidation = body('title')
  .isString()
  .withMessage('title должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage('длинна title не коректная')

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('длинна shortDescription не коректная')

const contentValidation = body('content')
  .isString()
  .withMessage('content должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage('длинна content не коректная')
const blogIdValidation = body('blogId')
  .isString()
  .withMessage('blogId должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage('длинна blogId не коректная')

export const postInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
]
