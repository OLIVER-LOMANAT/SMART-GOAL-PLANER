import GoalDisplayer from './component/GoalDisplayer';
import GoalForm from './component/GoalForm';
import DepositForm from './component/DepositForm';
import { useState, useEffect } from 'react';
import Overview from './component/Overview';

function App() {
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

  // Fetch goals from json-server on component mount
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then(res => res.json())
      .then(data => setGoals(data));
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
    
    // POST to json-server
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGoal)
    })
    .then(res => res.json())
    .then(data => setGoals([...goals, data]));

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

    const updatedGoal = {
      ...goalToUpdate,
      savedAmount: goalToUpdate.savedAmount + Number(depositData.amount)
    };

    // PATCH to json-server
    fetch(`http://localhost:3000/goals/${depositData.goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    })
    .then(res => res.json())
    .then(updatedData => {
      setGoals(goals.map(g => g.id === updatedData.id ? updatedData : g));
    });

    setDepositData({
      goalId: "",
      amount: ""
    });
  }

  function deleteGoal(id) {
    // DELETE from json-server
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setGoals(goals.filter(goal => goal.id !== id));
    });
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

export default App;