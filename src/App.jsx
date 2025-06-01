import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import trashIcon from "./assets/trash.png";
import "./App.css";

function App() {
  // Load tasks from localStorage on component mount
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === "") {
      setErrorMessage("Zadanie nie może być puste!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (tasks.length >= 8) {
      setErrorMessage("Maksymalna liczba zadań (8) została osiągnięta!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setTasks([
      ...tasks,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
    setErrorMessage("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <div className="h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white">Lista zadań</h1>

        {/* Task List Section */}
        {tasks.length > 0 && (
          <div className="w-full space-y-2 mb-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center px-4 py-6 bg-[#1E293B] w-full overflow-hidden"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="flex justify-center items-center mr-4 w-8 h-8 appearance-none bg-[#334155] checked:bg-[#84CC16] rounded-sm shrink-0 mt-1"
                />
                <span
                  className={`flex-1 text-xl break-words overflow-wrap-anywhere min-w-0 ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-[#94A3B8]"
                  }`}
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-4 hover:opacity-75 transition-opacity duration-200 focus:outline-none shrink-0 mt-1"
                >
                  <img src={trashIcon} alt="Delete" className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Section */}
        <div className="flex flex-col w-full">
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-2 px-4 py-2 bg-red-600 text-white text-sm">
              {errorMessage}
            </div>
          )}

          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={
                tasks.length >= 8
                  ? "Maksymalna liczba zadań (8) została osiągnięta"
                  : "Wpisz tutaj swoje zadanie..."
              }
              disabled={tasks.length >= 8}
              className={`px-4 py-6 pr-12 text-[#94A3B8] w-full placeholder:text-[#94A3B8] placeholder:text-xl placeholder:text-left focus:outline-none bg-[#1E293B] ${
                tasks.length >= 8 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            <button
              onClick={addTask}
              disabled={tasks.length >= 8}
              className={`absolute right-3 transition-colors duration-200 focus:outline-none ${
                tasks.length >= 8
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
