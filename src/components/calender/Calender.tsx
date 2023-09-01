/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import LeftIcon from "assets/images/left.png";
import RightIcon from "assets/images/right.png";
import { classNames } from "~/utils/functions";
import { motion } from "framer-motion";
import { slideIn } from "~/utils/framer";

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface IProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  sectionClasses?: string;
  setShowingDatePicker?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Calender = ({
  selectedDate,
  setSelectedDate,
  setShowingDatePicker,
  sectionClasses,
}: IProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const newDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(currentMonth)),
    });
  }, [currentMonth]);

  return (
    <motion.section
      {...slideIn}
      className={classNames(
        "w-full py-[20px] border border-[#F2F4F7] shadow-form-shadow px-6 font-workSans max-w-md gap-2 flex flex-col rounded-lg",
        sectionClasses
      )}
    >
      <header className='flex flex-col gap-4'>
        <div className='flex-row-between'>
          <button onClick={prevMonth}>
            <img src={LeftIcon} alt='Right Icon' />
          </button>
          <h2 className='font-semibold leading-[24px] text-[#344054]'>
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button onClick={nextMonth}>
            <img src={RightIcon} alt='Right Icon' />
          </button>
        </div>
        <div className='flex-row-between  gap-4'>
          <p className='w-full text-[#101828] border-[#D0D5DD] p-[8px_14px_8px_14px] border rounded-[8px]'>
            {format(selectedDate, "MMM d, yyyy")}
          </p>
          <button
            onClick={() => {
              setSelectedDate(startOfDay(new Date()));
              setCurrentMonth(new Date());
            }}
            className='button-transparent text-[#344054] '
          >
            Today
          </button>
        </div>
      </header>
      <section className='flex flex-col'>
        <header className='grid  grid-cols-7 '>
          {days.map((day) => {
            return (
              <h3
                key={day}
                className='w-[40px] rounded-[20px] items-center justify-center flex h-[40px] font-medium text-[#344054] text-[14px]'
              >
                {day}
              </h3>
            );
          })}
        </header>
        <ul className='grid grid-cols-7  grid-rows-5 gap-1'>
          {newDays.map((date) => (
            <li key={date.toISOString()}>
              <button
                onClick={() => {
                  setSelectedDate(date);
                  setShowingDatePicker?.(false);
                }}
                className={`w-[40px] cursor-pointer rounded-[20px] h-[40px] items-center justify-center flex relative
                ${!isEqual(date, selectedDate) && "hover:bg-[#F9FAFB]"}
                 ${isEqual(date, selectedDate) && "bg-[#3F5BF6] text-white"}
                ${
                  isSameMonth(date, new Date())
                    ? "text-[#344054]"
                    : "text-[#667085]"
                }`}
              >
                <time dateTime={format(date, "yyyy-MM-dd")}>
                  {format(date, "d")}
                </time>
                {isToday(date) && (
                  <div className='w-[5px] bottom-1 rounded-full bg-[#3F5BF6] absolute  h-[5px]' />
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </motion.section>
  );
};
