import { useState } from "react";
import { Task } from "./PersonalBoard";

interface props {
  toggleModal: () => void;

  isModalOpen: Boolean;
  task: Task
  updateTask: (updatedTask: Task) => Promise<void>;
}

const Edit: React.FC<props> = ({ toggleModal, isModalOpen, task, updateTask }) => {



  const [currentTask, setCurrentTask] = useState<Task>(task);


  if (!isModalOpen) return null;

  const handleSave = () => {
    updateTask(currentTask);
    toggleModal();

  };

  const updateStatus = (e: any, status: any) => {
    e.preventDefault()
    setCurrentTask(prev => ({ ...prev, status }))

  }

  if (!isModalOpen) return null;
  return (
    <div className="fixed text-black inset-0 flex items-center justify-center bg-slate-900 bg-opacity-90">
      <div className="p-6 rounded shadow-lg  flex flex-col justify-between bg-slate-100">

        <form >
          <div className="pb-5 flex justify-center gap-5">
            <button className={`${currentTask.status == 'todo' ? 'bg-purple-800' : 'border border-black'} p-1`} onClick={(e) => updateStatus(e, 'todo')}>To do </button>
            <button className={`${currentTask.status == 'in_progress' ? 'bg-purple-800' : 'border border-black'} p-1`} onClick={(e) => updateStatus(e, 'in_progress')}>In Progress </button>
            <button className={`${currentTask.status == 'under_review' ? 'bg-purple-800' : 'border border-black'} p-1`} onClick={(e) => updateStatus(e, 'under_review')}>Under Review </button>
            <button className={`${currentTask.status == 'finished' ? 'bg-purple-800' : 'border border-black'} p-1`} onClick={(e) => updateStatus(e, 'finished')}>Finished </button>

          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              className="mt-1 text-black  w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              className="mt-1 min-h-52 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              value={currentTask.priority}
              onChange={(e: any) => setCurrentTask({ ...currentTask, priority: e.target.value })}
              className="mt-1  w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={currentTask.deadline}
              onChange={(e) => setCurrentTask({ ...currentTask, deadline: e.target.value })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

        </form>
        <div className="flex justify-center gap-10">
          <button
            onClick={toggleModal}
            className="bg-red-500 me-5 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Edit
