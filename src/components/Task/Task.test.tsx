import React from "react";
import { render, screen } from "@testing-library/react";
import Task from "./Task";


describe("Task component", () => {
	it("Task Renders", () => {
		const toggleCompleteTask = jest.fn();
		const task = {
			id: 1,
			name: "Todo2",
			completed: false
		};
		render(<Task task={task} toggleCompleteTask={toggleCompleteTask} />);
		expect(screen.getByText("Todo2")).toBeInTheDocument();
	});
});
