import React from 'react';

interface TaskStatsProps {
    total: number;
    pending: number;
    completed: number;
}

const TaskStats: React.FC<TaskStatsProps> = ({
    total,
    pending,
    completed,
}) => {
    return (
        <section className="task-stats">
            <div className="stat-card">
                <span>Total</span>
                <strong>{total}</strong>
            </div>

            <div className="stat-card">
                <span>Pendientes</span>
                <strong>{pending}</strong>
            </div>

            <div className="stat-card">
                <span>Completadas</span>
                <strong>{completed}</strong>
            </div>
        </section>
    );
};

export default TaskStats;