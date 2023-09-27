import React, { useMemo, useState } from "react";
import Task from "./components/Task/Task";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import { taskModeNames } from "./utils/constants";
import TaskListControls from "./components/TaskListControls/TaskListControls";

export interface ITask {
	id: number;
	name: string;
	completed: boolean;
}
const App: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [showTasksMode, setShowTasksMode] = useState(taskModeNames.All);
	const createTask = (textInput: string) => {
		setTasks((prev) => [
			{
				id: Date.now(),
				name: textInput,
				completed: false,
			},
			...prev
		]);
	};
	const toggleCompleteTask = (taskId: number) => {
		setTasks((prev) =>
			prev.map((task) => {
				if (taskId === task.id) {
					return {
						...task,
						completed: !task.completed,
					};
				}
				return task;
			}),
		);
	};
	const handleClear = () => {
		setTasks((prev) => prev.filter((task) => !task.completed));
	};

	const remainingTasks = useMemo(
		() => tasks.filter((task) => !task.completed),
		[tasks],
	);

	const tasksDependingOnMode = useMemo(() => {
		const config = {
			[taskModeNames.All]: tasks,
			[taskModeNames.Active]: tasks.filter((task) => task.completed === false),
			[taskModeNames.Completed]: tasks.filter(
				(task) => task.completed === true,
			),
		};
		return config[showTasksMode];
	}, [showTasksMode, tasks]);
	console.log(tasks);
	return (
		<div className="container">
			<TaskForm createTask={createTask} />
			<div className="container-tasks">
				{tasksDependingOnMode.map((task) => (
					<Task
						key={task.id}
						toggleCompleteTask={toggleCompleteTask}
						task={task}
					/>
				))}
			</div>
			<footer>
				<TaskListControls
					remainingTasks={remainingTasks}
					handleClear={handleClear}
					showTasksMode={showTasksMode}
					setShowTasksMode={setShowTasksMode}
				/>
			</footer>
		</div>
	);
};

export default App;
