import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Make a request to the backend to invalidate the session or token
      await axios.delete("/api/users/sign_out", { withCredentials: true });

      // Clear local storage or any authentication tokens if used
      //   localStorage.removeItem("_task_management_session"); // If using localStorage
      document.cookie =
        "_task_management_session=null expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // If using cookies

      // Redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200">
      <header className="p-3 text-white fixed top-0 left-0 w-full flex items-center justify-start space-x-4">
        <button
          onClick={handleSignOut}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Sign Out
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Task Mgmt</h1>
      </header>
      <main className="pt-16 p-6">{children}</main>
    </div>
  );
}
