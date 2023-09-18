import { useState } from "react";
import './TaskForm.css';
import IconToButton from './iconToButton.png'

const TodoForm = ({ createTask } : {createTask : (text : string) => void}) => {
    const [taskName, setTaskName] = useState('');
    const handleCreate = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createTask(taskName);
      setTaskName('');
    }
    return (
      <form onSubmit={(e) => handleCreate(e)} className="container-form">
        <button disabled={taskName ? false : true} className="container-form_button">
          <img src={IconToButton} alt="arrow to down" />
        </button>
        <input value={taskName} className="container-form_input" placeholder="What needs to be done?" onChange={(e) => setTaskName(e.target.value)} type="text" />
      </form>
    )
}

export default TodoForm;