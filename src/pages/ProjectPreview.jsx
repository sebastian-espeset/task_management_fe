import { useNavigate } from "react-router-dom";

export default function ProjectPreview({ name, description, projectId }) {
  const navigate = useNavigate();

  const handleProjectNav = () => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 h-full hover:shadow-xl"
      onClick={handleProjectNav}
    >
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
