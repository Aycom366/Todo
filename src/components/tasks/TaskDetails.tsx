import { motion } from "framer-motion";
import { TasksData } from "~/types";
import { slideIn } from "~/utils/framer";
import CloseIcon from "assets/images/darkClose.png";
import Calender from "assets/images/blueCalender.png";
import Clock from "assets/images/blueClock.png";
import { format } from "date-fns";
import { convertToAmPm } from "~/utils/functions";

interface IProps {
  setTask: React.Dispatch<React.SetStateAction<TasksData>>;
  task: TasksData;
  setTasks: React.Dispatch<React.SetStateAction<TasksData[]>>;
  setIsEditingTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskDetails = ({
  setTask,
  setTasks,
  task,
  setIsEditingTask,
}: IProps) => {
  function closeTask() {
    setTask({} as TasksData);
  }

  return (
    <motion.form
      {...slideIn}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='w-full sm:border border-[#F2F4F7] h-full gap-4  flex flex-col rounded-lg font-workSans p-4 px-6 sm:px-8 sm:shadow-form-shadow bg-white'
    >
      <header className='flex justify-end gap-4 w-full'>
        <button onClick={closeTask}>
          <img src={CloseIcon} alt='Close Icon' />
        </button>
      </header>
      <article className='flex flex-col gap-8'>
        <h3 className='text-[18px] font-satoshi text-[#101828] font-bold leading-[21.6px]'>
          {task?.title}
        </h3>
        <div className='flex gap-2 flex-col'>
          <p className='flex gap-2 leading-[19.2px]  items-center'>
            <img src={Calender} alt='Calender Icon' />
            <span>{format(task.date, "do MMMM, yyyy")}</span>
          </p>
          <p className='flex uppercase leading-[19.2px] gap-2 items-center'>
            <img src={Clock} alt='Clock Icon' />
            <span>
              {convertToAmPm(task.startTime)} - {convertToAmPm(task.endTime)}
            </span>
          </p>
        </div>
      </article>
      <footer className='flex-row-between pt-4 font-workSans gap-3'>
        <button
          onClick={() => {
            setTasks((prev) => {
              return prev.filter((taskData) => taskData.id !== task.id);
            });
            closeTask();
          }}
          className=' w-full font-semibold leading-[20px] text-sm rounded-lg p-[10px_16px_10px_16px] text-[#344054] border-[#D0D5DD] hover:bg-transparent border bg-white'
        >
          Delete
        </button>
        <button
          onClick={() => setIsEditingTask(true)}
          className='button w-full'
        >
          Edit
        </button>
      </footer>
    </motion.form>
  );
};
