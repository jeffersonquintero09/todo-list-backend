import swaggerJSDoc from 'swagger-jsdoc'
import config from './configuration.js'

// Opciones de configuración de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo List API',
            version: '1.0.0',
            description: 'API para gestionar una lista de tareas',
        },
        servers: [
            {
                url: `http://${config.server.host}:${config.server.port}`,
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID de la tarea',
                        },
                        title: {
                            type: 'string',
                            description: 'Título de la tarea',
                        },
                        description: {
                            type: 'string',
                            description: 'Descripción de la tarea',
                        },
                        type: {
                            type: 'string',
                            description: 'Tipo de la tarea',
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de vencimiento de la tarea',
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Etiquetas de la tarea',
                        },
                        priority: {
                            type: 'string',
                            description: 'Prioridad de la tarea',
                        },
                        completed: {
                            type: 'boolean',
                            description: 'Estado de la tarea',
                        },
                        assignee: {
                            type: 'string',
                            description: 'Persona asignada a la tarea',
                        },
                        comments: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Comentarios de la tarea',
                        },
                    },
                    required: ['title', 'type'],
                },
            },
        },
    },
    apis: ['./app/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec