import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it('displays all "Create a new task" buttons', async () => {
    render(<App />);
    const createTaskButtons = screen.getAllByText(/Create a new task/i);
    expect(createTaskButtons).toHaveLength(2);
  });

  it("should have only one 'My Tasks' in the dom", async () => {
    render(<App />);
    const titleElement = screen.getByText(/My Tasks/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("should have the tailwind class sm:hidden and should be in the document", async () => {
    render(<App />);
    const sheetElement = screen.getByTestId("bottom-sheet");
    expect(sheetElement).toBeInTheDocument();
    expect(sheetElement).toHaveClass("sm:hidden");
  });
});
