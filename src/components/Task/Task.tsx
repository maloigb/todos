import { useState } from "react";
import { ITask } from "../../App";
import "./Task.css";
import iconEditButtons from "../../icons/iconEditButtons.png";

interface Props {
  task: ITask;
  editTask : (task: ITask) => void;
}

enum modeNames {
	initial,
	editing
}

const Task = ({ task, editTask }: Props) => {
	const [mode, setMode] = useState(modeNames.initial);
	const [nameModifiedTask, setNameModifiedTask] = useState(task.name);

	const handleEditSaveClick = () => {
		editTask({...task, name: nameModifiedTask});
		setMode(modeNames.initial);
	};

	const handleToggleComplete = () => {
		editTask({ ...task, completed: !task.completed });
	};

	const cancelEditing = () => {
		setNameModifiedTask(task.name);
		setMode(modeNames.initial);
	};
	const editMode = () => {
		return (
			<div>
				<input 
					type="text" 
					value={nameModifiedTask}
					onChange={(e) => setNameModifiedTask(e.target.value)}
				/>
				<button onClick={handleEditSaveClick}>Сохарнить</button>
				<button onClick={cancelEditing}>X</button>
			</div>
		);
	};

	const initialMode = () => {
		return (
			<div className="container-task">
				<input
					className="container-task_checkbox"
					checked={task.completed}
					type="checkbox"
					onChange={handleToggleComplete}
				/>
				<h3
					className={`container-task_text ${task.completed ? "completed" : ""}`}
				>
					{task.name}
				</h3>
				<button
					data-testid="add"
					className="container-task_button"
					onClick={() => setMode(modeNames.editing)}
				>
					<img src={iconEditButtons} alt="arrow to down" />
				</button>
			</div>
		);
	};

	const displayDendingNdMode = () => {
		if (mode === modeNames.initial) {
			return initialMode();
		} 

		return editMode();
	};

	return displayDendingNdMode();
};

export default Task;
