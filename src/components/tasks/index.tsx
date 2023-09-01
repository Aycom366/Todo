/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "assets/images/close.png";
import BellIcon from "assets/images/bell.png";
import { useEffect, useState } from "react";
import { TimePickerComponent } from "../picker/TimePickerComponent";
import { DatePickerComponent } from "../picker/DatePickerComponent";
import { startOfDay } from "date-fns";
import { motion } from "framer-motion";
import { slideIn } from "~/utils/framer";
import { TasksData } from "~/types";
import { toast } from "react-hot-toast";

interface IProps {
  setTask: React.Dispatch<React.SetStateAction<TasksData>>;
  setTasks: React.Dispatch<React.SetStateAction<TasksData[]>>;
  task?: TasksData;
  setIsEditingTask: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingTask: boolean;
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Task = ({
  setTask,
  setShowTask,
  setTasks,
  isEditingTask,
  setIsEditingTask,
  task,
}: IProps) => {
  const [startTimeValue, setStartTimeValue] = useState(
    task?.startTime ? task.startTime : "00:00"
  );
  const [showingStartCalender, setShowingStartCalender] = useState(false);
  const [endTimeValue, setEndTimeValue] = useState(
    task?.endTime ? task.endTime : "00:00"
  );
  const [title, setTitle] = useState(task?.title);
  const [showingEndCalender, setShowingEndCalender] = useState(false);
  const [showingBefore, setShowingBefore] = useState(true);
  const [showingDate, setShowingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    startOfDay(task?.date ?? new Date())
  );

  useEffect(() => {
    if (showingStartCalender) {
      setShowingEndCalender(false);
      setShowingDate(false);
    }
  }, [showingStartCalender]);

  useEffect(() => {
    if (showingEndCalender) {
      setShowingStartCalender(false);
      setShowingDate(false);
    }
  }, [showingEndCalender]);

  useEffect(() => {
    if (showingDate) {
      setShowingEndCalender(false);
      setShowingStartCalender(false);
    }
  }, [showingDate]);

  function closeTask() {
    setTask({} as TasksData);
    setShowTask(false);
    setIsEditingTask(false);
  }

  function updateTasks() {
    if (!title) return toast.error("Title is required.");
    const newTask = {
      completed: task?.completed ?? false,
      date: selectedDate,
      endTime: endTimeValue,
      startTime: startTimeValue,
      id: task?.id ?? Math.random(),
      title: title,
    } as TasksData;

    if (isEditingTask) {
      setTasks((prev) => {
        return prev.map((item) => {
          if (item.id === newTask.id) {
            return newTask;
          }
          return item;
        });
      });
    } else setTasks((prev) => [...prev, { ...newTask }]);
    closeTask();
  }

  return (
    <motion.form
      {...slideIn}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='w-full h-full  border border-[#F2F4F7] gap-4  flex flex-col rounded-lg font-workSans p-4 px-8 shadow-form-shadow bg-white'
    >
      <header className='flex-row-between'>
        <h3 className='text-[18px] text-[#101828] font-semibold leading-[28px]'>
          {isEditingTask ? "Edit Task" : "Add Task"}
        </h3>
        <button onClick={closeTask}>
          <img src={CloseIcon} alt='Close Icon' />
        </button>
      </header>
      <textarea
        placeholder='title...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='py-[12px] bg-[#F9FAFB] border-[#D0D5DD] shadow-text-area border  rounded-[8px] px-[14px] resize-none h-[140px]'
      />

      <div className='flex flex-col gap-3 w-full'>
        <div className='flex-row-between'>
          <DatePickerComponent
            showingDatePicker={showingDate}
            setShowingDatePicker={setShowingDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <TimePickerComponent
            timeValue={startTimeValue}
            setTimeValue={setStartTimeValue}
            showingCalender={showingStartCalender}
            setShowingCalender={setShowingStartCalender}
          />

          <TimePickerComponent
            timeValue={endTimeValue}
            setTimeValue={setEndTimeValue}
            showingCalender={showingEndCalender}
            setShowingCalender={setShowingEndCalender}
          />
        </div>
        {showingBefore && (
          <div className='flex-row-between'>
            <div className='flex items-center gap-2'>
              <div>
                <img src={BellIcon} alt='Bell Icon' />
              </div>
              <p className='text-[#667085] font-medium font-inter'>
                10 Minutes before
              </p>
            </div>
            <button onClick={() => setShowingBefore(false)} className='w-4 h-4'>
              <img src={CloseIcon} alt='Close Icon' />
            </button>
          </div>
        )}
      </div>

      <footer className='flex-row-between pt-4 font-workSans gap-3'>
        <button
          onClick={closeTask}
          className=' w-full font-semibold leading-[20px] text-sm rounded-lg p-[10px_16px_10px_16px] text-[#344054] border-[#D0D5DD] hover:bg-transparent border bg-white'
        >
          Cancel
        </button>
        <button onClick={updateTasks} className='button w-full'>
          {isEditingTask ? "Save" : "Add"}
        </button>
      </footer>
    </motion.form>
  );
};
