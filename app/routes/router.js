import { Router } from 'express'
import taskRoutes from './task.routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../config/swaggerConfig.js'

const router = Router()

router.use(taskRoutes)

// Ruta para la documentación de Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router