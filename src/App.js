import { create } from "json-server";
import { useEffect, useState } from "react"

export default function App() {
  //Setting goals as empty array 
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({
    name: "",
    targetAmount: "",
    category: "Travel",
    deadline: "",
  });
  //Deposit Data
  const [depositData, setDepositData] = useState({
    goalId: "",
    amount: ""
  })

  useEffect(() => {
    fetch("https://localhost:3000/goals")
    .then(res => res.json())
    .then(data => setGoals(data))
  }, []);

  function handleGoalChange(e) {
    setCurrentGoal(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  function handleDepositChange(e) {
    setDepositData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  function handleGoalSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...currentGoal,
      id:Date.now(),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGoal)
    })
    .then(res => res.json())
    .then(data => setGoals([...goals, data]))

    setCurrentGoal({
      name: "",
      targetAmount: "",
      category: "Travel",
      deadline: ""
    })
  }

  function handleDepositSubmit(e) {
    e.preventDefault();
    const goalToUpdate = goals.find(goal => goal.id === Number(depositData.goalId))

    if(!goalToUpdate) return;

    const updateGoal = {
      ...goalToUpdate,
      savedAmount: goalToUpdate.savedAmount + Number(depositData.amount)
    }

    fetch(`http://localhost:3000/goals/${depositData.goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ savedAmount: updateGoal.savedAmount})
    })
    .then(res => res.json())
    .then(updateGoal => {
      setGoals(goals.map(goal => goal.id === updateGoal.id ? updatedData : goal))
    })

    setDepositData({
      goalId: "",
      amount: ""
    })
  }
  return (
   
  )
}


