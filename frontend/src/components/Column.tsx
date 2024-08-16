import { Droppable } from "react-beautiful-dnd";
import { Task } from "./PersonalBoard";
import { TaskList } from "./TaskList";


interface colprops {
    title: string;
    status: string;
    tasks: Task[]

}


export function Column({ title, tasks,status }: colprops) {

   
    return (
        <>
            <div className="text-center px-2 md:h-screen w-4/5 pt-3 ">
                <h3 className="bg-violet-800 font-semibold text-sm p-3 rounded text-white">{title}</h3>
                
                <Droppable droppableId={status}>
                    {(provided,snapshot) => (
                        <div  
                        ref={provided.innerRef} 
                        {...provided.droppableProps} 
                        className={` border my-2  p-2 h-3/5   ${snapshot.isDraggingOver? ' border-blue-300 duration-200': 'border-black'}`}>
                            <TaskList tasks={tasks}  />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </div>
        </>
    )
}
