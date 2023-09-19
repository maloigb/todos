import React, { useMemo, useState } from "react";
import Task from "./components/Task/Task";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import { taskModeNames } from "./utils/constants";

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
				id: prev.length + 1,
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
			<div className="container-options">
				<div className="container-options_countActiveitems">
					{`${remainingTasks.length} items left`}
				</div>
				<div className="container-options_showTasks">
					<button
						className={
							showTasksMode === taskModeNames.All
								? "active"
								: "container-options_showTasks_button"
						}
						onClick={() => setShowTasksMode(taskModeNames.All)}
					>
            All
					</button>
					<button
						className={
							showTasksMode === taskModeNames.Active
								? "active"
								: "container-options_showTasks_button"
						}
						onClick={() => setShowTasksMode(taskModeNames.Active)}
					>
            Active
					</button>
					<button
						className={
							showTasksMode === taskModeNames.Completed
								? "active"
								: "container-options_showTasks_button"
						}
						onClick={() => setShowTasksMode(taskModeNames.Completed)}
					>
            Completed
					</button>
				</div>
				<div className="container-options_clearCompletedTask">
					<button onClick={handleClear}>Clear completed</button>
				</div>
			</div>
		</div>
	);
};

export default App;
