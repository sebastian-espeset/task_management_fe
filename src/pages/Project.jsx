import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(["he", "she", "they"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectResponse = await axios.get(`/api/projects/${id}`, {
          withCredentials: true,
        });
        setProject(projectResponse.data);

        const tasksResponse = await axios.get(`/api/projects/${id}/tasks`, {
          withCredentials: true,
        });
        setTasks(tasksResponse.data);
      } catch (error) {
        setError("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        `/api/projects/${id}/tasks`,
        {
          name: newTaskName,
          description: newTaskDescription,
        },
        { withCredentials: true }
      );

      setTasks([...tasks, response.data]);
      setShowModal(false);
      setNewTaskName("");
      setNewTaskDescription("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  console.log(tasks.length);
  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </div>
      {Array.isArray(tasks) && tasks.length === 0 ? (
        <p className="text-gray-700 text-lg">
          No tasks available. Add a new task to get started.
        </p>
      ) : (
        <div className="flex flex-wrap -mx-3">
          {tasks.map((task) => (
            <div key={task.id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800">{task.name}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box max-w-md shadow-lg bg-white p-4 rounded h-full">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="taskName"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  id="taskName"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="input border border-gray-400  w-full p-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="taskDescription"
                >
                  Task Description
                </label>
                <textarea
                  id="taskDescription"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="textarea border border-gray-400 w-full p-1"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-6"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-6"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
