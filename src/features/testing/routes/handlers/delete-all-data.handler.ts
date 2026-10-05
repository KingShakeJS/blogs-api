import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { testingRepository } from '../../repositories/testing.repository'

export const deleteAllDataHandler = async (req: Request, res: Response) => {
  try {
    await testingRepository.delete()
    return res.sendStatus(HttpStatus.NoContent)
  } catch {
    return res.sendStatus(HttpStatus.InternalServerError)
  }
}
