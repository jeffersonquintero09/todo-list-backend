import mongoose from 'mongoose'

// Se define el esquema de la tarea
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: { type: String, required: true, trim: true, minLength: 3, maxLength: 100 },
    description: { type: String, trim: true },
    type: { type: String, required: true, enum: ['por-hacer', 'en-progreso', 'completado'], default: 'por-hacer' },
    dueDate: { type: Date },
    tags: { type: [String], default: [] },
    priority: { type: String, enum: ['baja', 'media', 'alta'], default: 'baja' },
    completed: { type: Boolean, default: false },
    assignee: { type: String }
}, { timestamps: true })

// Se agregan índices al esquema
taskSchema.index({ dueDate: 1 }) // Índice en el campo `dueDate`
taskSchema.index({ title: 1, priority: -1 }) // Índice compuesto en `title` y `priority`
taskSchema.index({ type: 1 }) // Índice en el campo `type`

export default mongoose.model('Task', taskSchema)