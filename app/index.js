import app from './app.js'
import mongoose from './config/database.js'

//console.clear()

// Inicia el servidor solo después de que la conexión a la base de datos se haya establecido
mongoose.connection.once('open', () => {
    app.listen(app.get('port'), app.get('host'), () => {
        console.log(`Servidor corriendo en http://${app.get('host')}:${app.get('port')}`)
    })
})