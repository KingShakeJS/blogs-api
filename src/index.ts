// создание приложения
import express from 'express'
import { setupApp } from './setup-app.js'
import { SETTINGS } from './settings/config.js'

const app = express()
setupApp(app)

const PORT = SETTINGS.PORT

// ф-ия listen - запускает сервер и начинает прослушивать входящие запросы на указанном порту.
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
