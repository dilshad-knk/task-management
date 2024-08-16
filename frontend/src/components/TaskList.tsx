import { Draggable } from "react-beautiful-dnd";
import { Task } from "./PersonalBoard";
import { useState } from "react";
import Edit from "./Edit";
import { FaEdit } from "react-icons/fa";
import instance from "../axios/axios";
import { useBoardState } from "../utils/BoardUtils";
import { priorityBg } from "../utils/priorityBg";


interface TaskListProps {
    tasks: Task[];
}


export function TaskList({ tasks }: TaskListProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const { fetchBoard } = useBoardState();

    const toggleModal = (task: Task | null = null) => {
        setIsModalOpen(!isModalOpen);
        setSelectedTask(task);
    };
  

    const updateTask = async (updatedTask:Task) => {
        try {

            const response =  await instance.put(`/api/v1/tasks/${updatedTask._id}`,updatedTask)
            fetchBoard()
           
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }






    return (

        <><div>


            {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`border group my-3 text-sm flex justify-between items-center rounded text-white p-2 ${snapshot.isDragging ? 'bg-zinc-600' : 'bg-indigo-950'}`}
                            >
                                <div className="text-wrap p-1">{task.title}</div>
                                <div className="p-1">
                                    <span className={`group-hover:hidden ${priorityBg(task.priority)} py-1 px-3`}>{task.priority}</span>
                                    <FaEdit className="hidden group-hover:block text-xl mx-4" onClick={() => toggleModal(task)} />
                                </div>
                                {isModalOpen && selectedTask && (
                                    <Edit toggleModal={toggleModal} isModalOpen={isModalOpen} task={selectedTask} updateTask={updateTask} />
                                )}


                            </div>
                        )}
                    </Draggable>
                ))
            ) : (
                <button className="text-white border-transparent font-medium border group my-3 text-sm flex justify-center items-center rounded mx-auto p-2 " >Empty</button>
               
            )}


           



        </div>
        </>
    )
}