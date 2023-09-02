import { HTMLAttributes } from "react";
import { TasksData } from "~/types";
import { classNames, convertToAmPm, formatDate } from "~/utils/functions";
import { motion } from "framer-motion";
import { taskItem } from "~/utils/framer";
import { useStore } from "~/store";

interface IProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  taskInfo: TasksData;
  selected: boolean;
}

export const TaskItem = ({ taskInfo, selected, ...rest }: IProps) => {
  const updateCompletedTask = useStore((state) => state.updateCompletedTask);

  return (
    <motion.li
      layout
      variants={taskItem}
      transition={{ type: "spring" }}
      className='w-full'
    >
      <div
        tabIndex={0}
        role='button'
        className={classNames(
          "w-full h-[72px] flex-row-between bg-[#F9FAFB] py-4 px-6 border-b border-[#EAECF0]",
          selected && "bg-[#eaecfe]"
        )}
        {...rest}
      >
        <div className='flex w-full gap-3 items-center'>
          <input
            onClick={(e) => e.stopPropagation()}
            checked={taskInfo.completed}
            onChange={() => updateCompletedTask(taskInfo.id)}
            type='checkbox'
            className='rounded-[6px] text-[#3F5BF6] w-5 h-5  border-[#D0D5DD] bg-white '
          />
          <div
            className={classNames(
              "flex items-start text-sm leading-[20px] flex-col gap-1",
              taskInfo.completed && "line-through text-[#D0D5DD] font-inter"
            )}
          >
            <p
              className={classNames(
                "font-medium line-clamp-1 text-ellipsis text-[#101828] ",
                taskInfo.completed && "text-[#D0D5DD]"
              )}
            >
              {taskInfo.title}
            </p>
            <span
              className={`${
                taskInfo.completed ? "text-[#D0D5DD]" : "text-[#475467]"
              }`}
            >
              {convertToAmPm(taskInfo.startTime)} -{" "}
              {convertToAmPm(taskInfo.endTime)}
            </span>
          </div>
        </div>
        <p className='leading-[20px] min-w-fit text-sm text-[#475467]'>
          {formatDate(taskInfo.date)}
        </p>
      </div>
    </motion.li>
  );
};
