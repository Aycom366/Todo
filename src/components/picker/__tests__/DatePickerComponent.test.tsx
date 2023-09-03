import { render, screen } from "@testing-library/react";
import { DatePickerComponent } from "../DatePickerComponent";

describe("DatePickerComponent", () => {
  it("should show calender popover if showingDatePicker is true", async () => {
    render(
      <DatePickerComponent
        selectedDate={new Date()}
        setSelectedDate={() => {}}
        showingDatePicker={true}
        setShowingDatePicker={() => {}}
      />
    );

    const popoverDatePicker = await screen.findByTestId("calender-popover");
    expect(popoverDatePicker).toBeInTheDocument();
  });

  it("should not show calender popover if showingDatePicker is false", () => {
    render(
      <DatePickerComponent
        selectedDate={new Date()}
        setSelectedDate={() => {}}
        showingDatePicker={false}
        setShowingDatePicker={() => {}}
      />
    );

    const popoverDatePicker = screen.queryByTestId("calender-popover");
    expect(popoverDatePicker).not.toBeInTheDocument();
  });
});
