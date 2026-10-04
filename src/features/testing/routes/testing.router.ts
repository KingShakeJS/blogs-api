import { Router } from 'express'
import { deleteAllDataHandler } from './handlers/delete-all-data.handler'
import { TESTING_ROUTES } from '../constants/testing.path'

export const testingRouter = Router()

testingRouter.delete(TESTING_ROUTES.ALL_DATA, deleteAllDataHandler)
