import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isEqual,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";
import { classNames } from "~/utils/functions";

interface IProps {
  date: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}
export const CalenderRowList = ({ date, setSelectedDate }: IProps) => {
  const daysInMonth = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });
  }, [date]);

  return (
    <header className='flex font-workSans flex-col gap-4 w-full'>
      <h3 className='leading-6 text-[#101828] font-semibold'>
        {format(date, "MMMM yyyy")}
      </h3>
      <ul className='w-full overflow-x-auto pb-2 scrollbar-none sm:scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#3F5BF6] scrollbar-track-gray-100 flex gap-[16px]'>
        {daysInMonth.map((day) => (
          <li key={day.toISOString()} className='min-w-[62px] w-full'>
            <button
              onClick={() => setSelectedDate(day)}
              className={classNames(
                "border w-full items-center justify-around h-[68px] rounded-lg flex text-sm py-[10px] flex-col gap-2 ",
                isEqual(day, date) && "button"
              )}
            >
              <span>{format(day, "E")}</span>
              <span>{format(day, "dd")}</span>
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
};
