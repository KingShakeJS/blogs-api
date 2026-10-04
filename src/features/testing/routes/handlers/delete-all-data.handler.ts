import { Request, Response } from 'express'
import { HttpStatus } from '../../../../core/types/http-statuses'
import { testingRepository } from '../../repositories/testing.repository'

export const deleteAllDataHandler = (req: Request, res: Response) => {
  testingRepository.delete()
  res.sendStatus(HttpStatus.NoContent)
}
