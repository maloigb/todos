import { useState } from "react";
import "./TaskForm.css";
import IconToButton from "../../icons/iconToButton.png";

const TaskForm = ({ createTask }: { createTask: (text: string) => void }) => {

	const [taskName, setTaskName] = useState("");

	const handleCreate = () => {
		createTask(taskName);
		setTaskName("");
	};
	
	return (
		<div className="container-form">
			<button
				data-testid="add"
				onClick={handleCreate}
				disabled={!taskName}
				className="container-form_button"
			>
				<img src={IconToButton} alt="arrow to down" />
			</button>
			<input
				value={taskName}
				className="container-form_input"
				placeholder="What needs to be done?"
				onChange={(e) => setTaskName(e.target.value)}
				type="text"
			/>
		</div>
	);
};

export default TaskForm;
