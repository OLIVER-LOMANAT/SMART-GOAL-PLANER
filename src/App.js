import GoalDisplayer from './component/GoalDisplayer';
import GoalForm from './component/GoalForm';
import DepositForm from './component/DepositForm';
import { useState, useEffect } from 'react';
import Overview from './component/Overview';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({
    name: "",
    targetAmount: "",
    category: "Travel",
    deadline: ""
  });
  const [depositData, setDepositData] = useState({
    goalId: "",
    amount: ""
  });

  useEffect(() => {
    fetch("https://json-api-url-1.onrender.com/goals")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setGoals(data))
      .catch(error => console.error("Fetch error:", error));
  }, []);

  function handleGoalChange(e) {
    setCurrentGoal(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleDepositChange(e) {
    setDepositData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleGoalSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...currentGoal,
      id: Date.now(),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    fetch("https://json-api-url-1.onrender.com/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add goal");
        return res.json();
      })
      .then(data => setGoals([...goals, data]))
      .catch(error => console.error("POST error:", error));

    setCurrentGoal({
      name: "",
      targetAmount: "",
      category: "Travel",
      deadline: ""
    });
  }

  function handleDepositSubmit(e) {
    e.preventDefault();
    const goalToUpdate = goals.find(g => g.id === Number(depositData.goalId));
    if (!goalToUpdate) return;

    const updatedAmount = goalToUpdate.savedAmount + Number(depositData.amount);

    fetch(`https://json-api-url-1.onrender.com/goals/${depositData.goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(updatedData => {
        setGoals(goals.map(g => g.id === updatedData.id ? updatedData : g));
      })
      .catch(error => console.error("PATCH error:", error));

    setDepositData({ goalId: "", amount: "" });
  }

  function deleteGoal(id) {
    fetch(`https://json-api-url-1.onrender.com/goals/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete");
        setGoals(goals.filter(goal => goal.id !== id));
      })
      .catch(error => console.error("DELETE error:", error));
  }

  return (
    <div className="bg-blue-500 h-screen max-w-[850px] mx-auto text-center">
      <h1 className='text-white text-[50px] py-5'>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <div className="flex justify-center gap-10">
        <GoalForm 
          currentGoal={currentGoal} 
          handleChange={handleGoalChange} 
          handleSubmit={handleGoalSubmit}
        />
        <DepositForm 
          goals={goals}
          depositData={depositData}
          handleChange={handleDepositChange}
          handleSubmit={handleDepositSubmit}
        />
      </div>
      <GoalDisplayer goals={goals} deleteGoal={deleteGoal} />
    </div>
  );
}
