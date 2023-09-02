import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Task } from "..";

afterEach(cleanup);

describe("Task Component", () => {
  it("should render textarea element and should be able to show input value when user types anything.", () => {
    render(<Task />);
    const textAreaElement = screen.getByPlaceholderText(
      /title.../i
    ) as HTMLTextAreaElement;
    fireEvent.change(textAreaElement, { target: { value: "Adding Task" } });
    expect(textAreaElement.value).toBe("Adding Task");
    expect(textAreaElement).toBeInTheDocument();
  });

  it("should have Edit/Save button in the dom.", () => {
    render(<Task />);
    const buttonElement = screen.getByTestId("create-edit-task");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render datepicker component on click of select-date picker", async () => {
    render(<Task />);
    const dateButton = await screen.findByTestId("select-date");
    fireEvent.click(dateButton);
    const datePicker = await screen.findByTestId("calender");
    expect(datePicker).toBeInTheDocument();
  });
});
