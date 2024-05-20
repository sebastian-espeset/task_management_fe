import { useEffect, useState } from "react";
import axios from "axios";

import ProjectPreview from "./ProjectPreview";

export default function UserDashboard() {
  // on load, fetch all projects for user and pass to project cards
  // should also have a create project button
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("api/projects", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setProjects(response.data);
      } catch (error) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const handleCreateNewProject = async () => {
    try {
      const response = await axios.post(
        "/api/projects",
        {
          name: newProjectName,
          description: newProjectDescription,
        },
        {
          withCredentials: true,
        }
      );
      setProjects([...projects, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };
  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-6"
      >
        Create New Project
      </button>
      <div className="flex flex-wrap -mx-3">
        {projects.map((project) => (
          <div key={project.id} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
            <ProjectPreview
              projectId={project.id}
              name={project.name}
              description={project.description}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box max-w-md shadow-lg p-10 bg-white rounded h-full">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateNewProject();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="input border border-gray-400  w-full p-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectDescription"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="textarea border border-gray-400 w-full p-1"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-6"
                >
                  Create
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
