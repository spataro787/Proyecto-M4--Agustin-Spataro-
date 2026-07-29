import React from 'react';
import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onToggle,
    onDelete,
}) => {
    return (
        <article
            className={`task-card ${task.completed ? 'task-completed' : ''}`}
        >
            <div className="task-content">
                <button
                    className="task-checkbox"
                    onClick={() => onToggle(task)}
                    aria-label="Cambiar estado de tarea"
                >
                    {task.completed ? '✓' : ''}
                </button>

                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <span className={`priority priority-${task.priority}`}>
                        Prioridad:{' '}
                        {task.priority === 'high'
                            ? 'Alta'
                            : task.priority === 'medium'
                                ? 'Media'
                                : 'Baja'}
                    </span>
                </div>
            </div>

            <button
                className="btn-delete"
                onClick={() => onDelete(task.id)}
            >
                Eliminar
            </button>
        </article>
    );
};

export default TaskCard;