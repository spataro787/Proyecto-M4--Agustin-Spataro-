import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';

import { db } from './firebase';
import type { Task, TaskInput } from '../types/task';

const tasksCollection = collection(db, 'tasks');

export async function createTask(
    userId: string,
    taskInput: TaskInput
): Promise<string> {
    const taskData = {
        userId,
        title: taskInput.title,
        description: taskInput.description,
        priority: taskInput.priority,
        dueDate: taskInput.dueDate || '',
        completed: false,
        createdAt: Date.now(),
        completedAt: null,
    };

    const document = await addDoc(tasksCollection, taskData);

    return document.id;
}

export async function getUserTasks(userId: string): Promise<Task[]> {
    const tasksQuery = query(
        tasksCollection,
        where('userId', '==', userId)
    );

    const snapshot = await getDocs(tasksQuery);

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
    })) as Task[];
}

export async function updateTask(
    taskId: string,
    updates: Partial<Task>
): Promise<void> {
    const taskReference = doc(db, 'tasks', taskId);

    await updateDoc(taskReference, updates);
}

export async function deleteTask(taskId: string): Promise<void> {
    const taskReference = doc(db, 'tasks', taskId);

    await deleteDoc(taskReference);
}