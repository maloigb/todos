import React from "react";
import Task from "./components/Task/Task";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskListControls from "./components/TaskListControls/TaskListControls";
import useTasks from "./hooks/useTasks";

export interface ITask {
	id: number;
	name: string;
	completed: boolean;
}

const App: React.FC = () => {

	const {
		createTask,
		hanleClearCompleted,
		remainingTasks,
		tasksDependingOnMode,
		showTasksMode,
		setShowTasksMode,
		editTask
	} = useTasks();

	return (
		<div className="container">
			<TaskForm createTask={createTask} />
			<div className="container-tasks">
				{tasksDependingOnMode.map((task) => (
					<Task
						key={task.id}
						task={task}
						editTask={editTask}
					/>
				))}
			</div>
			<footer>
				<TaskListControls
					remainingTasks={remainingTasks}
					hanleClearCompleted={hanleClearCompleted}
					showTasksMode={showTasksMode}
					setShowTasksMode={setShowTasksMode}
				/>
			</footer>
		</div>
	);
};

export default App;
