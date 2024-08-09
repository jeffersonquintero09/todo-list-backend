import Task from '../models/task.js'

// Función para obtener todas las tareas
export const getTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query // Leer parámetros de paginación
    try {
        const tasks = await Task.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Función para obtener una tarea por su id
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' }).env
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la tarea: ${error.message}` })
    }
}

// Función para crear una tarea
export const createTask = async (req, res) => {
    const task = new Task(req.body)
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Función para actualizar una tarea por su id
export const updateTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ message: `Error al actualizar la tarea: ${error.message}` })
    }
}

// Función para eliminar una tarea por su id
export const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada para eliminar' })

        res.status(200).json({ message: 'Tarea eliminada' })
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar la tarea: ${error.message}` })
    }
}

// Función para eliminar todas las tareas
export const deleteAllTasks = async (req, res) => {
    try {
        const result = await Task.deleteMany()
        res.status(200).json({ message: `Tareas eliminadas: ${result.deletedCount}` })
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar las tareas: ${error.message}` })
    }
}

// Función para obtener las tareas completadas
export const getCompletedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ completed: true })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Función para obtener las tareas pendientes
export const getPendingTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ completed: false })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Función para obtener las tareas por tipo
export const getTasksByType = async (req, res) => {
    const { type } = req.params
    try {
        const tasks = await Task.find({ type })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Función para obtener las tareas por prioridad
export const getTasksByPriority = async (req, res) => {
    const { priority } = req.params
    try {
        const tasks = await Task.find({ priority })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: `Error al obtener las tareas por prioridad: ${error.message}` })
    }
}

// Función para obtener las tareas por etiqueta
export const getTasksByTag = async (req, res) => {
    const { tag } = req.params
    try {
        const tasks = await Task.find({ tags: tag })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Función para obtener las tareas por asignado
export const getTasksByAssignee = async (req, res) => {
    const { assignee } = req.params
    try {
        const tasks = await Task.find({ assignee })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
