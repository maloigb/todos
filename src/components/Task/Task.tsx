import { ITask } from "../../App";
import './Task.css';

interface Props {
    task: ITask,
    toggleCompleteTask: (id: number) => void
}
const Task = ({ task, toggleCompleteTask }: Props) => {
    return (
        <div className="container-task">
            <input
                className="container-task_checkbox"
                checked={task.completed}
                type="checkbox"
                onChange={() => toggleCompleteTask(task.id)}
            />
            <h3
                className={`container-task_text ${task.completed ? "completed" : ""}`}>
                {task.name}
            </h3>
        </div>
    )
}

export default Task;