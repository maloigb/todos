import { useState } from "react";
import './TodoForm.css';
import IconToButton from './iconToButton.png'

const TodoForm = ({ createTask } : {createTask : (text : string) => void}) => {
    const [textInput, setTextInput] = useState('');
    const handleChange = () => {
      createTask(textInput);
      setTextInput('');
    }
    return (
      <div className="container-form">
        <button disabled={textInput ? false : true} className="container-form_button" onClick={handleChange}>
          <img src={IconToButton} alt="Проблемы с загрузкой изображения" />
        </button>
        <input value={textInput} className="container-form_input" placeholder="What needs to be done?" onChange={(e) => setTextInput(e.target.value)} type="text" />
      </div>
    )
}

export default TodoForm;