/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePopper } from "react-popper";
import { useState } from "react";
import { Calender } from "../calender/Calender";
import { format } from "date-fns";
import CalenderIcon from "assets/images/calendar.png";

interface IProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  showingDatePicker: boolean;
  setShowingDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DatePickerComponent = ({
  selectedDate,
  setSelectedDate,
  showingDatePicker,
  setShowingDatePicker,
}: IProps) => {
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <>
      <button
        data-testid='select-date'
        onClick={() => setShowingDatePicker((prev) => !prev)}
        ref={setReferenceElement}
        className='button-transparent'
      >
        <img src={CalenderIcon} alt='calender Icon' />
        <span> {format(selectedDate, "MMM dd")}</span>
      </button>
      {showingDatePicker && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className='w-full  flex flex-col items-center   max-w-[350px] bg-white relative z-10 shadow-lg'
        >
          <Calender
            setShowingDatePicker={setShowingDatePicker}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      )}
    </>
  );
};
