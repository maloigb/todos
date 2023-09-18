import React, { useMemo, useState } from 'react';
import Task from './components/Task/Task';
import './App.css'
import TodoForm from './components/TodoForm/TodoForm';
import { showTasksConstants } from './utils/constants';

export interface ITask {
  id: number,
  nameTask: string,
  completed: boolean
}
const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showTasks, setShowTasks] = useState('All');
  const createTask = (textInput: string) => {
    setTasks([{
      id: (tasks.length + 1),
      nameTask: textInput,
      completed: false
    }, ...tasks])
  }
  const toggleCompleteTask = (taskId: number) => {
    const cloneTasks = [...tasks];
    cloneTasks.forEach((task) => {
      if (taskId === task.id) {
        task.completed = !task.completed;
      }
    });
    setTasks(cloneTasks);
  }
  const handleClear = () => {
    const outstandingTasks = tasks.filter((task) => task.completed === false);
    setTasks(outstandingTasks);
  }

  const remainingTasks = useMemo(
    () => tasks.filter((task) => task.completed === false),
    [tasks]
  )

  const renderTasks = useMemo(
    () => {
      const config = {
        [showTasksConstants.All]: tasks,
        [showTasksConstants.Active]: tasks.filter((task) => task.completed === false),
        [showTasksConstants.Completed]: tasks.filter((task) => task.completed === true),
      }
      return config[showTasks]
    }, [showTasks, tasks]
  )
  return (
    <div className="container">
      <TodoForm createTask={createTask} />
      <div className='container-tasks'>
        {renderTasks.map((task) => <Task toggleCompleteTask={toggleCompleteTask} task={task} />)}
      </div>
      <div className="container-options">
        <div className='container-options_countActiveitems'>
          {`${remainingTasks.length} items left`}
        </div>
        <div className='container-options_showTasks'>
          <button className={showTasks === "All" ? 'active' : 'container-options_showTasks_button'} onClick={() => setShowTasks(showTasksConstants.All)}>All</button>
          <button className={showTasks === "Active" ? 'active' : 'container-options_showTasks_button'} onClick={() => setShowTasks(showTasksConstants.Active)}>Active</button>
          <button className={showTasks === "Completed" ? 'active' : 'container-options_showTasks_button'} onClick={() => setShowTasks(showTasksConstants.Completed)}>Completed</button>
        </div>
        <div className='container-options_clearCompletedTask'>
          <button onClick={handleClear}>Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
