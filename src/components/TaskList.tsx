import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from '../types/task';

interface TaskListProps {
    tasks: Task[];
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggle,
    onDelete,
}) => {
    if (tasks.length === 0) {
        return (
            <div className="card empty-state">
                <h2>No tienes tareas todavía</h2>
                <p>Creá tu primera tarea para comenzar a organizarte.</p>
            </div>
        );
    }

    return (
        <section className="tasks-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
};

export default TaskList;