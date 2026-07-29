import React from 'react';
import type { TaskInput } from '../types/task';

interface TaskFormProps {
    form: TaskInput;
    setForm: React.Dispatch<React.SetStateAction<TaskInput>>;
    onSubmit: (event: React.FormEvent) => Promise<void>;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
    form,
    setForm,
    onSubmit,
    onCancel,
}) => {
    return (
        <form className="card task-form" onSubmit={onSubmit}>
            <h2>Nueva tarea</h2>

            <input
                type="text"
                placeholder="Título de la tarea"
                value={form.title}
                onChange={(event) =>
                    setForm({
                        ...form,
                        title: event.target.value,
                    })
                }
                required
            />

            <textarea
                placeholder="Descripción"
                value={form.description}
                onChange={(event) =>
                    setForm({
                        ...form,
                        description: event.target.value,
                    })
                }
            />

            <select
                value={form.priority}
                onChange={(event) =>
                    setForm({
                        ...form,
                        priority: event.target.value as TaskInput['priority'],
                    })
                }
            >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
            </select>

            <input
                type="date"
                value={form.dueDate}
                onChange={(event) =>
                    setForm({
                        ...form,
                        dueDate: event.target.value,
                    })
                }
            />

            <div className="task-form-actions">
                <button type="submit" className="btn-primary">
                    Crear tarea
                </button>

                <button
                    type="button"
                    className="btn-secondary"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default TaskForm;