/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWindowDimension } from "utils/hooks";
import AddIcon from "assets/images/add.png";
import Microphone from "assets/images/microphone.png";
import { Header } from "components/header";
import { Task } from "components/tasks";
import { useEffect, useMemo, useState } from "react";
import { Calender } from "components/calender/Calender";
import { CalenderRowList } from "components/calender/CalenderRowList";
import { AnimatePresence } from "framer-motion";
import { TaskItem } from "./components/tasks/TaskItem";
import { TaskDetails } from "./components/tasks/TaskDetails";
import { Pagination } from "./components/tasks/Pagination";
import { motion } from "framer-motion";
import { taskContainer } from "./utils/framer";
import { toast } from "react-hot-toast";
import Sheet from "react-modal-sheet";
import { useStore } from "./store";
import { format, startOfDay } from "date-fns";

function App() {
  const { height } = useWindowDimension();
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  const isEditingTask = useStore((state) => state.isEditingTask);
  const setIsEditingTask = useStore((state) => state.setIsEditingTask);

  const showTask = useStore((state) => state.showTask);
  const setShowTask = useStore((state) => state.setShowTask);

  const tasks = useStore((state) => state.tasks);
  const setTasks = useStore((state) => state.setTasks);

  const task = useStore((state) => state.task);
  const setTask = useStore((state) => state.setTask);

  const [isloading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [snapPoints, setSnapPoints] = useState([1, 0.85]);
  const pageSize = 5;

  const currentTableData = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return tasks?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tasks]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsloading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todo = await res.json();
        setTasks(
          todo.slice(0, 5).map(({ id, completed, title }: any) => ({
            id,
            completed,
            title,
            date: new Date(),
            startTime: "07:00",
            endTime: "12:00",
          }))
        );
      } catch (error) {
        toast.error("An error has occured");
      } finally {
        setIsloading(false);
      }
    }
    fetchTodos();
  }, []);

  function closeSheet() {
    setIsEditingTask(false);
    setTask({} as any);
    setShowTask(false);
  }

  function openTaskComponent() {
    setShowTask(true);
    setSnapPoints([1, 0.55]);
  }

  return (
    <>
      <Sheet
        disableDrag
        className='sm:hidden'
        isOpen={showTask || isEditingTask || !!task.title}
        onClose={closeSheet}
        snapPoints={snapPoints}
        initialSnap={1}
      >
        <Sheet.Container className='rounded-3xl'>
          <Sheet.Content>
            {task.title && !(showTask || isEditingTask) && <TaskDetails />}
            {(showTask || isEditingTask) && <Task />}
            {!task.title && !showTask && (
              <Calender
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
      <main style={{ height }} className='w-full py-[25px] sm:py-0 mx-auto '>
        <Header />
        <section className='max-w-[1440px] pb-[24px] sm:pb-[96px]  pt-[32px] w-full sm:py-[48px] flex flex-col gap-8 mx-auto px-4 xl:px-[164px]'>
          <header className='w-full flex-row-between'>
            <div className='flex-col font-workSans items-start'>
              <h2 className=' font-semibold text-[24px] leading-[32px] sm:text-[30px] sm:leading-[38px] text-[#101828]'>
                Good morning.
              </h2>
              <p className='leading-6  text-[#475467]'>
                you've got some tasks todo.
              </p>
            </div>
            <button
              onClick={openTaskComponent}
              className='button hidden sm:flex'
            >
              <img src={AddIcon} alt='Add Icon' />
              <span>Create a new task</span>
            </button>
          </header>
          {isloading ? (
            <div
              data-testid='loading-spinner'
              className='py-[100px] grid w-full h-full place-items-center'
            >
              <div className='loader'></div>
            </div>
          ) : (
            <section
              data-testid='task-list'
              className='w-full  items-start grid grid-cols-1 sm:grid-cols-4  lg:grid-cols-5 sm:pr-4  gap-6'
            >
              <section className='w-full sm:border-r border-[#EAECF0] sm:pr-6 flex flex-col gap-8 col-span-1 sm:col-span-2 lg:col-span-3'>
                <CalenderRowList
                  setSelectedDate={setSelectedDate}
                  date={selectedDate}
                />
                <section className='font-workSans flex flex-col gap-4'>
                  <h3 className='text-[#101828] font-semibold'>My Tasks</h3>
                  <div className='w-full gap-4 flex flex-col'>
                    {currentTableData.length > 0 ? (
                      <div className='w-full flex gap-4 sm:gap-8 flex-col'>
                        <motion.ul
                          variants={taskContainer}
                          initial='initial'
                          animate='animate'
                          className='w-full gap-4 flex flex-col'
                        >
                          <AnimatePresence>
                            {currentTableData.map((taskInfo) => (
                              <TaskItem
                                onClick={() => {
                                  setTask(taskInfo);
                                  setShowTask(false);
                                  setSnapPoints([1, 0.85]);
                                }}
                                selected={task.id === taskInfo.id}
                                taskInfo={taskInfo}
                                key={taskInfo.id}
                              />
                            ))}
                          </AnimatePresence>
                        </motion.ul>
                        {tasks.length > 5 && (
                          <>
                            <hr />
                            <Pagination
                              currentPage={currentPage}
                              onPageChange={(page) => setCurrentPage(page)}
                              totalCount={tasks.length}
                              pageSize={pageSize}
                            />
                          </>
                        )}
                      </div>
                    ) : (
                      <div className='w-full gap-1 h-full py-[50px] grid  place-items-center'>
                        <p>
                          No Task Available for{" "}
                          {format(selectedDate, "do MMMM, yyyy")}
                        </p>
                        <button
                          onClick={openTaskComponent}
                          className='button py-1'
                        >
                          <img src={AddIcon} alt='Add Icon' />
                          <span>Create a new task</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={openTaskComponent}
                    className='flex h-[48px] rounded-lg shadow-[0px_1px_2px_0px_#1018280D] px-3 flex-row-between bg-[#F9FAFB] sm:hidden border border-[#D0D5DD]'
                  >
                    <span className='text-[#475467]'>Input task</span>
                    <img src={Microphone} alt='Microphone Icon' />
                  </button>
                </section>
              </section>
              <aside className='w-full hidden sm:flex flex-1 min-w-[394px]  col-span-2'>
                <AnimatePresence mode='wait'>
                  {task.title && !(showTask || isEditingTask) && (
                    <TaskDetails />
                  )}
                  {(showTask || isEditingTask) && <Task />}
                  {!task.title && !showTask && (
                    <Calender
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                  )}
                </AnimatePresence>
              </aside>
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
