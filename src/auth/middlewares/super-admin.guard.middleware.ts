import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../../core/types/http-statuses.js'
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../settings/config.js'

export const superAdminGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers['authorization'] as string // 'Basic xxxx'
  if (!auth) {
    res.sendStatus(HttpStatus.Unauthorized)
    return
  }

  const [authType, token] = auth.split(' ')

  // ЗАЩИТА: Проверяем тип авторизации И наличие токена
  if (authType !== 'Basic' || !token) {
    res.sendStatus(HttpStatus.Unauthorized)
    return
  }

  try {
    // Декодируем base64 и разбираем на логин и пароль.
    const credentials = Buffer.from(token, 'base64').toString('utf-8')

    // Дополнительная проверка на валидность формата 'username:password'
    if (!credentials.includes(':')) {
      res.sendStatus(HttpStatus.Unauthorized)
      return
    }

    const [username, password] = credentials.split(':')
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      res.sendStatus(HttpStatus.Unauthorized)
      return
    }

    next()
  } catch (error) {
    // На случай, если Buffer.from всё равно упадет на некорректных символах
    res.sendStatus(HttpStatus.Unauthorized)
  }
}
