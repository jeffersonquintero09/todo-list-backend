import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from './config/configuration.js'
import router from './routes/router.js'
import errorHandler from './middleware/errorHandler.js'

// Crea una aplicación  en Express
const app = express()

// Configura el puerto y el host de la aplicación
app.set('port', config.server.port)
app.set('host', config.server.host)

// Utiliza morgan para registrar las solicitudes en la consola
app.use(morgan('dev'))

// Parse application/json
app.use(bodyParser.json())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Uso de las rutas modulares
app.use(router)

// Middleware para manejar errores
app.use(errorHandler)

export default app