import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import TaskStats from '../components/TaskStats';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

import { useAuth } from '../hooks/useAuth';

import {
  createTask,
  deleteTask,
  getUserTasks,
  updateTask,
} from '../services/taskService';

import type { Task, TaskInput } from '../types/task';


const initialForm: TaskInput = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};


export const Tasks: React.FC = () => {

  const { user } = useAuth();


  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState<TaskInput>(initialForm);


  // Estados para email
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');



  useEffect(() => {

    if (!user) return;


    const loadTasks = async () => {

      try {

        const userTasks = await getUserTasks(user.uid);

        setTasks(userTasks);


      } catch (error) {

        console.error(
          'Error cargando tareas:',
          error
        );


      } finally {

        setLoading(false);

      }

    };


    loadTasks();


  }, [user]);




  const handleCreateTask = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();


    if (!user || !form.title.trim()) return;


    try {


      const taskId = await createTask(
        user.uid,
        form
      );


      const newTask: Task = {

        id: taskId,

        userId: user.uid,

        title: form.title,

        description: form.description,

        priority: form.priority,

        dueDate: form.dueDate,

        completed: false,

        createdAt: Date.now(),

        completedAt: null,

      };


      setTasks((currentTasks) => [
        newTask,
        ...currentTasks
      ]);


      setForm(initialForm);

      setIsCreating(false);



    } catch (error) {

      console.error(
        'Error creando tarea:',
        error
      );

    }

  };





  const handleToggleTask = async (
    task: Task
  ) => {


    const completed = !task.completed;


    try {


      await updateTask(
        task.id,
        {
          completed,
          completedAt:
            completed
              ? Date.now()
              : null,
        }
      );



      setTasks((currentTasks) =>

        currentTasks.map(
          (currentTask) =>

            currentTask.id === task.id

              ? {
                ...currentTask,
                completed,
                completedAt:
                  completed
                    ? Date.now()
                    : null,
              }

              : currentTask

        )

      );



    } catch (error) {


      console.error(
        'Error actualizando tarea:',
        error
      );


    }

  };






  const handleDeleteTask = async (
    taskId: string
  ) => {


    try {


      await deleteTask(taskId);



      setTasks((currentTasks) =>

        currentTasks.filter(
          task => task.id !== taskId
        )

      );



    } catch (error) {


      console.error(
        'Error eliminando tarea:',
        error
      );


    }


  };






  const handleSendSummary = async () => {

    if (!user?.email) {

      setEmailStatus(
        '❌ Usuario sin email configurado'
      );

      return;

    }


    try {

      setSendingEmail(true);

      setEmailStatus('');


      const response = await fetch(
        '/api/send-summary',
        {

          method: 'POST',

          headers: {

            'Content-Type':
              'application/json',

          },


          body: JSON.stringify({

            email: user.email,

            tasks,

          }),

        }

      );



      const text = await response.text();



      console.log(
        "RESPUESTA API:",
        response.status,
        text
      );



      let data;


      try {

        data = JSON.parse(text);

      } catch {

        throw new Error(
          "La API no devolvió JSON válido"
        );

      }



      if (!response.ok) {

        throw new Error(
          data.message ||
          "Error enviando resumen"
        );

      }



      setEmailStatus(
        '✅ Resumen enviado correctamente'
      );



    } catch (error: any) {


      console.error(
        "ERROR ENVIANDO RESUMEN:",
        error
      );


      setEmailStatus(
        `❌ ${error.message}`
      );


    } finally {


      setSendingEmail(false);


    }

  };






  const completedTasks =
    tasks.filter(
      task => task.completed
    ).length;



  const pendingTasks =
    tasks.length - completedTasks;





  if (loading) {

    return (
      <p>
        Cargando tareas...
      </p>
    );

  }






  return (

    <div className="app-layout">


      <Navbar />



      <main className="app-main">


        <header className="content-header">


          <div>

            <h1>
              Mis Tareas
            </h1>


            <p>
              Organiza tus actividades y maximiza tu productividad diaria.
            </p>


          </div>





          <div className="header-actions">


            <button

              className="btn-secondary"

              onClick={handleSendSummary}

              disabled={sendingEmail}

            >

              {
                sendingEmail
                  ? 'Enviando...'
                  : 'Enviar resumen'
              }


            </button>





            <button

              className="btn-primary create-task-button"

              onClick={() => setIsCreating(true)}

            >

              + Nueva tarea


            </button>


          </div>


        </header>





        {
          emailStatus && (

            <p className="email-status">

              {emailStatus}

            </p>

          )
        }






        <TaskStats

          total={tasks.length}

          pending={pendingTasks}

          completed={completedTasks}

        />






        {
          isCreating && (

            <TaskForm

              form={form}

              setForm={setForm}

              onSubmit={handleCreateTask}

              onCancel={() =>
                setIsCreating(false)
              }

            />

          )
        }







        <section className="tasks-list">



          {
            tasks.length === 0 ? (


              <div className="card empty-state">


                <h2>
                  No tienes tareas todavía
                </h2>


                <p>
                  Creá tu primera tarea para comenzar a organizarte.
                </p>


              </div>



            ) : (


              tasks.map((task) => (


                <TaskCard

                  key={task.id}

                  task={task}

                  onToggle={handleToggleTask}

                  onDelete={handleDeleteTask}

                />


              ))


            )

          }



        </section>



      </main>



    </div>


  );

};



export default Tasks;