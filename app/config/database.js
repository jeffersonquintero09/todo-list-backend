import mongoose from 'mongoose'
import config from './configuration.js'

// URL de la base de datos
const dbURI = config.mongo.url()

// Conexión a la base de datos
mongoose.connect(dbURI)
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error(err))

// Exporta la conexión
export default mongoose