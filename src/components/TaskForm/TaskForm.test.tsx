import React from "react";
import { render, screen } from "@testing-library/react";
import TaskForm from "./TaskForm";
import userEvent from "@testing-library/user-event";

describe("TaskForm component", () => {
	it("Task Form", () => {
		const createTask = jest.fn();
		render(<TaskForm createTask={createTask} />);
		userEvent.type(
			screen.getByPlaceholderText(/What needs to be do/i),
			"Todo1",
		);
		userEvent.click(screen.getByTestId("add"));
		expect(createTask).toHaveBeenCalledWith("Todo1");
	});
});
