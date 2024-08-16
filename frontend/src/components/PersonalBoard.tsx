import { useEffect, useState } from "react";
import instance from "../axios/axios";
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from "./Column";
import { useBoardState } from "../utils/BoardUtils";
import Create from "./Create";




export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "high" | "urgent";
  deadline: string;
  status: 'todo' | 'under_review' | 'in_progress' | 'finished';
}



const PersonalBoard = () => {

  const { fetchBoard, groupedTasks,setGroupedTasks } = useBoardState();
  const [createModalOpen, setCreateModalOpen] = useState(false);





  const statusDisplayNames: { [key: string]: string } = {
    todo: 'To Do',
    in_progress: 'In Progress',
    under_review: 'Under Review',
    finished: 'Finished'
  };


  useEffect(() => {

    fetchBoard();
  }, []);






  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await instance.put(`/api/v1/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };


  const toggleModalCreate = () => {
    setCreateModalOpen(!createModalOpen);
  };





  function onDragEnd (result : any)  {
    const{destination,source} = result;

    if(!destination){return}


    if(
      destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return;
    }
    //when dragging between the coloumns
    if (  destination.droppableId !== source.droppableId ){

      let removedTask;

      setGroupedTasks(prevState => {
        // Create a shallow copy of the state
        const newState = { ...prevState };


        const sourceColumnTasks = [...newState[source.droppableId]];

        [removedTask] = sourceColumnTasks.splice(source.index, 1);


        const destinationColumnTasks = [...newState[destination.droppableId]];


        destinationColumnTasks.splice(destination.index, 0, removedTask);

        // Update the new state with the modified columns
        newState[source.droppableId] = sourceColumnTasks;
        newState[destination.droppableId] = destinationColumnTasks;

        return newState;
      });



      updateTaskStatus(removedTask!._id, destination.droppableId);


      //when dragginh within colouns 

    } else {




      setGroupedTasks(prevState => {
        const newState = { ...prevState };


        const sourceColumnTasks = [...newState[source.droppableId]];
        const [removedTask] = sourceColumnTasks.splice(source.index, 1);

        console.log(sourceColumnTasks,'after removing');


        sourceColumnTasks.splice(destination.index, 0, removedTask);
        console.log(sourceColumnTasks,'after adding another index');


        newState[source.droppableId] = sourceColumnTasks;


        return newState;
      });


    }
  }








  return (
    <>
      <h1 className="text-white font-bold text-4xl text-center py-8">Personal Task Board</h1>
        <button className="bg-slate-500 font-medium border group my-3 text-sm flex justify-center items-center rounded mx-auto p-2 " onClick={() => toggleModalCreate()}>Create a Task</button>
        <DragDropContext onDragEnd={onDragEnd} >
          <div className="md:flex md:flex-row flex flex-col justify-center items-center  ">
            {Object.keys(groupedTasks).map(status => (
              <Column key={status} status={status} title={statusDisplayNames[status]} tasks={groupedTasks[status]} />
            ))}
          </div>
        </DragDropContext>

        {createModalOpen && 
          <Create toggleModalCreate={toggleModalCreate} />
      }

      </>

  )
}

export default PersonalBoard





