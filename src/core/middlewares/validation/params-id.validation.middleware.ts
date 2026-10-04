import { param } from 'express-validator'

// В in-memory-хранилище id — обычное число, поэтому проверяем, что параметр
// присутствует и является числовой строкой.
export const idValidation = param('id')
  .exists()
  .withMessage('ID is required') // Проверка на наличие
  .isString()
  .withMessage('ID must be a string') // Проверка, что это строка
  .isMongoId()
  .withMessage('Incorrect format of ObjectId')
