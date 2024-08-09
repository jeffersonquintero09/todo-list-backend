import { body, query, validationResult } from 'express-validator'

// Se definen las validaciones para la creación de una tarea
export const createTaskValidations = [
    body('title').isString().isLength({ min: 3, max: 100 }).trim().notEmpty().withMessage('El título es obligatorio'),
    body('description').isString().trim().optional(),
    body('type').isString().isIn(['por-hacer', 'en-progreso', 'completado']).notEmpty().withMessage('Tipo inválido'),
    body('dueDate').optional().isISO8601().withMessage('Fecha de vencimiento inválida'),
    body('tags').isArray().optional().withMessage('Las etiquetas deben ser un arreglo'),
    body('priority').isString().isIn(['baja', 'media', 'alta']).withMessage('Prioridad inválida'),
    body('completed').isBoolean(),
    body('assignee').isString().optional()
]

// Se definen las validaciones para la actualización de una tarea
export const updateTaskValidations = [
    body('title').isString().isLength({ min: 3, max: 100 }).trim().optional(),
    body('description').isString().trim().optional(),
    body('type').isString().isIn(['por-hacer', 'en-progreso', 'completado']).optional(),
    body('dueDate').optional().isISO8601().withMessage('Fecha de vencimiento inválida'),
    body('tags').isArray().optional().withMessage('Las etiquetas deben ser un arreglo'),
    body('priority').isString().isIn(['baja', 'media', 'alta']).optional(),
    body('completed').isBoolean().optional(),
    body('assignee').isString().optional()
]

// Validaciones para el endpoint de obtener tareas
export const validateGetTasks = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero mayor que 0')
        .toInt(), // Convierte el valor a entero
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El límite debe ser un número entero mayor que 0')
        .toInt() // Convierte el valor a entero
]

// Middleware para validar las reglas de validación
export const validateTask = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    return next()
}