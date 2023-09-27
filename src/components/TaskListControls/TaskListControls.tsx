import "./TaskListControls.css";
import { taskModeNames } from "../../utils/constants";
import { ITask } from "../../App";

interface Props {
    remainingTasks: ITask[];
    handleClear: () => void;
    showTasksMode: taskModeNames;
    setShowTasksMode: (taskMode : taskModeNames) => void
}

const TaskListControls = ({ remainingTasks, handleClear, showTasksMode,  setShowTasksMode } : Props) => {

	return (
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
	);
};


export default TaskListControls;