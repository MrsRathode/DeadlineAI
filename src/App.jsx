import { useState } from "react";
import { generateAIPlan } from "./gemini";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [aiPlan, setAiPlan] = useState("");

  const generatePlan = async () => {
    if (!task || !deadline || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setAiPlan("Generating AI plan...");

      const result = await generateAIPlan(
        task,
        deadline,
        description
      );

      setAiPlan(result);

      const newTask = {
        task,
        deadline,
        description,
        aiPlan: result,
        createdAt: new Date().toLocaleString(),
      };

      const updatedTasks = [newTask, ...tasks];

      setTasks(updatedTasks);

      localStorage.setItem(
        "tasks",
        JSON.stringify(updatedTasks)
      );

      setTask("");
      setDeadline("");
      setDescription("");

    } catch (error) {
      console.error(error);
      setAiPlan(
        "Error generating AI plan. Please check your API key."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex justify-center">

      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-8">

        <h1 className="text-5xl font-bold text-center text-blue-600">
          DeadlineAI
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI Productivity Companion
        </p>

        <div className="mt-10 space-y-5">

          <input
            type="text"
            placeholder="Enter Task Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <textarea
            placeholder="Task Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-4"
          ></textarea>

          <button
            onClick={generatePlan}
            className="w-full bg-blue-600 text-white text-lg py-4 rounded-xl hover:bg-blue-700"
          >
            Generate AI Plan
          </button>

          {aiPlan && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                AI Suggested Plan
              </h2>

              <pre className="whitespace-pre-wrap text-gray-700">
                {aiPlan}
              </pre>
            </div>
          )}

          {tasks.length > 0 && (
            <div className="mt-10">

              <h2 className="text-3xl font-bold mb-6 text-blue-700">
                Previous Tasks
              </h2>

              {tasks.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-5 mb-5 shadow"
                >

                  <h3 className="text-xl font-bold text-blue-600">
                    {item.task}
                  </h3>

                  <p className="mt-2">
                    <strong>Deadline:</strong> {item.deadline}
                  </p>

                  <p className="mt-2">
                    <strong>Created:</strong> {item.createdAt}
                  </p>

                  <div className="mt-4 bg-white rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-gray-700">
                      {item.aiPlan}
                    </pre>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default App;