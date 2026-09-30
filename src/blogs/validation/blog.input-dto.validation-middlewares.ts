import { body } from 'express-validator'

//   name: 'string1',
//   description: 'string1',
//   websiteUrl: 'string1',

// pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$

const nameValidation = body('name')
  .isString()
  .withMessage('name должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('длинна name не коректная')

const descriptionValidation = body('description')
  .isString()
  .withMessage('description должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('длинна description не коректная')

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('websiteUrl должно быть строкой')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('длинна websiteUrl не коректная')
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
  )
  .withMessage(
    'websiteUrl должен быть валидным URL-адресом и начинаться с https://',
  )

export const blogInputDtoValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
]
