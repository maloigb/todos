import React from "react";
import { render, screen } from "@testing-library/react";
import Task from "./Task";

describe("Task component", () => {
	it("Task Renders", () => {
		const editTask = jest.fn();
		const task = {
			id: 1,
			name: "Todo2",
			completed: false,
		};
		render(<Task task={task} editTask={editTask}/>);
		expect(screen.getByText("Todo2")).toBeInTheDocument();
	});
});
