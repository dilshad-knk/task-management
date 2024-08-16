import { useState } from "react";
import { useBoardState } from "../utils/BoardUtils";
import instance from "../axios/axios";

interface props {
  toggleModalCreate: () => void;
}

const Create: React.FC<props> = ({ toggleModalCreate }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
    deadline: "",
  });

  const { fetchBoard } = useBoardState();

  const handleSave = async () => {
    await createTask(newTask);
    toggleModalCreate();
  };

  const createTask = async (newTask) => {
    try {
      const response = await instance.post(`/api/v1/tasks/create`, newTask);
      fetchBoard();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateStatus = (
    e: React.MouseEvent<HTMLButtonElement>,
    status: string,
  ) => {
    e.preventDefault();
    setNewTask({ ...newTask, status });
  };

  return (
    <div className="fixed text-black inset-0 flex items-center justify-center bg-slate-900 bg-opacity-90">
      <div className="p-6 rounded shadow-lg w-3/5 h-5/6 flex flex-col justify-between bg-slate-100">
        <form>
          <div className="pb-5 md:flex justify-center md:gap-5 flex flex-wrap gap-2">
            <button
              className={`${newTask.status === "todo" ? "bg-purple-800" : "border border-black"} p-1`}
              onClick={(e) => updateStatus(e, "todo")}
            >
              To do{" "}
            </button>
            <button
              className={`${newTask.status === "in_progress" ? "bg-purple-800" : "border border-black"} p-1`}
              onClick={(e) => updateStatus(e, "in_progress")}
            >
              In Progress{" "}
            </button>
            <button
              className={`${newTask.status === "under_review" ? "bg-purple-800" : "border border-black"} p-1`}
              onClick={(e) => updateStatus(e, "under_review")}
            >
              Under Review{" "}
            </button>
            <button
              className={`${newTask.status === "finished" ? "bg-purple-800" : "border border-black"} p-1`}
              onClick={(e) => updateStatus(e, "finished")}
            >
              Finished{" "}
            </button>
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="mt-1 text-black w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="mt-1 md:min-h-52 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
        <div className="flex justify-center gap-10">
          <button
            onClick={toggleModalCreate}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
