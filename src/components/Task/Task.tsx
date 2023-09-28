import { useState } from "react";
import { ITask } from "../../App";
import "./Task.css";
import iconEditButtons from "../../icons/iconEditButtons.png";

interface Props {
  task: ITask;
  toggleCompleteTask: (id: number) => void;
}
const Task = ({ task, toggleCompleteTask }: Props) => {
	const [state, setState] = useState<string | null>(null);
	
	return (
		<div className="container-task">
			<input
				className="container-task_checkbox"
				checked={task.completed}
				type="checkbox"
				onChange={() => toggleCompleteTask(task.id)}
			/>
			<h3
				className={`container-task_text ${task.completed ? "completed" : ""}`}
			>
				{task.name}
			</h3>
			<button
				data-testid="add"
				className="container-task_button"
			>
				<img src={iconEditButtons} alt="arrow to down" />
			</button>
		</div>
	);
};

export default Task;
