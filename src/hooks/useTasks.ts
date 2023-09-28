import { useMemo, useState } from "react";
import { taskModeNames } from "../utils/constants";

export interface ITask {
    id: number;
    name: string;
    completed: boolean;
}

const useTasks = () => {

	const [tasks, setTasks] = useState<ITask[]>([]);

	const [showTasksMode, setShowTasksMode] = useState(taskModeNames.All);

	const createTask = (name: string) => {
		setTasks((prev) => [
			{
				id: Date.now(),
				name: name,
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

	const hanleClearCompleted = () => {
		setTasks((prev) => prev.filter((task) => !task.completed));
	};

	const remainingTasks = useMemo(
		() => tasks.filter((task) => !task.completed),
		[tasks],
	);

	const tasksDependingOnMode = useMemo(() => {
		const config = {
			[taskModeNames.All]: tasks,
			[taskModeNames.Active]: tasks.filter((task) => !task.completed),
			[taskModeNames.Completed]: tasks.filter(
				(task) => task.completed,
			),
		};
		return config[showTasksMode];
	}, [showTasksMode, tasks]);

	return {
		createTask,
		toggleCompleteTask,
		hanleClearCompleted,
		remainingTasks,
		tasksDependingOnMode,
		showTasksMode,
		setShowTasksMode
	};
};

export default useTasks;