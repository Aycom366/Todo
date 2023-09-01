/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePopper } from "react-popper";
import { TimePicker } from ".";
import { useState } from "react";
import TimeIcon from "assets/images/time.png";

interface IProps {
  showingCalender: boolean;
  timeValue: string;
  setTimeValue: React.Dispatch<React.SetStateAction<string>>;
  setShowingCalender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TimePickerComponent = ({
  setShowingCalender,
  timeValue,
  showingCalender,
  setTimeValue,
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

  const [hourIndex, setHourIndex] = useState(Number(timeValue.split(":")[0]));
  const [minutesIndex, setMinutesIndex] = useState(
    Number(timeValue.split(":")[1])
  );

  return (
    <>
      <button
        onClick={() => setShowingCalender((prev) => !prev)}
        ref={setReferenceElement}
        className='button-transparent'
      >
        <img src={TimeIcon} alt='Time Icon' />
        <span>{timeValue}</span>
      </button>
      {showingCalender && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className='w-full flex flex-col items-center gap-2 max-w-[250px] p-2 bg-white relative z-10 shadow-lg border'
        >
          <div className='embla'>
            <TimePicker
              selectedIndex={hourIndex}
              setSelectedIndex={setHourIndex}
              slideCount={24}
              loop
              label='hours'
            />
            <TimePicker
              selectedIndex={minutesIndex}
              setSelectedIndex={setMinutesIndex}
              slideCount={60}
              loop
              label='min'
            />
          </div>
          <button
            onClick={() => {
              setTimeValue(
                `${String(hourIndex).padStart(2, "0")}:${String(
                  minutesIndex
                ).padStart(2, "0")}`
              );
              setShowingCalender(false);
            }}
            className='button py-1 max-w-fit'
          >
            OK
          </button>
        </div>
      )}
    </>
  );
};
