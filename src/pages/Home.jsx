import Login from "./Login";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="flex items-center justify-between bg-blue-100">
        <Login />
      </div>
    </div>
  );
}
