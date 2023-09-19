import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
 
describe("App component", () => {
	it("App Renders", async () => {
		render(<App />);
		userEvent.type(
			screen.getByPlaceholderText(/What needs to be do/i),
			"React",
		);
		userEvent.click(screen.getByTestId("add"));
		await waitFor(() => expect(screen.getByText("React")).toBeInTheDocument());
	});
});
