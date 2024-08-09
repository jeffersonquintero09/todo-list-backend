// app/routes/task.routes.js

import { Router } from 'express'
import { createTaskValidations, updateTaskValidations, validateGetTasks, validateTask } from '../middleware/validations.js'
import { 
    getTasks, 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask, 
    deleteAllTasks, 
    getCompletedTasks, 
    getPendingTasks, 
    getTasksByType, 
    getTasksByPriority, 
    getTasksByTag, 
    getTasksByAssignee 
} from '../controllers/taskController.js'

const router = Router()

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas con paginación
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de tareas por página
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks', validateGetTasks, validateTask, getTasks)

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/tasks/:id', getTaskById)

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación de entrada
 */
router.post('/tasks', createTaskValidations, validateTask, createTask)

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: Error de validación de entrada
 */
router.put('/tasks/:id', updateTaskValidations, validateTask, updateTask)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por su ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/tasks/:id', deleteTask)

/**
 * @swagger
 * /tasks:
 *   delete:
 *     summary: Eliminar todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Todas las tareas eliminadas exitosamente
 */
router.delete('/tasks', deleteAllTasks)

/**
 * @swagger
 * /tasks/completed:
 *   get:
 *     summary: Obtener todas las tareas completadas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas completadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks/completed', getCompletedTasks)

/**
 * @swagger
 * /tasks/pending:
 *   get:
 *     summary: Obtener todas las tareas pendientes
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks/pending', getPendingTasks)

/**
 * @swagger
 * /tasks/type/{type}:
 *   get:
 *     summary: Obtener tareas por tipo
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['por-hacer', 'en-progreso', 'completado']
 *         description: Tipo de tarea
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas por tipo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks/type/:type', getTasksByType)

/**
 * @swagger
 * /tasks/priority/{priority}:
 *   get:
 *     summary: Obtener tareas por prioridad
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: priority
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['baja', 'media', 'alta']
 *         description: Prioridad de la tarea
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas por prioridad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks/priority/:priority', getTasksByPriority)

/**
 * @swagger
 * /tasks/tag/{tag}:
 *   get:
 *     summary: Obtener tareas por etiqueta
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Etiqueta de la tarea
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas por etiqueta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks/tag/:tag', getTasksByTag)

/**
 * @swagger
 * /tasks/assignee/{assignee}:
 *   get:
 *     summary: Obtener tareas por asignado
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: assignee
 *         required: true
 *         schema:
 *           type: string
 *         description: Persona asignada a la tarea
 *     responses:
 *       200:
 *         description: Lista de tareas filtradas por asignado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error del servidor
 */
router.get('/tasks/assignee/:assignee', getTasksByAssignee)

export default router
