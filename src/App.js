import { useEffect, useState } from "react"

export default function App() {
  //Setting goals as empty array 
  const [goal, setGoals] = useState([]);
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

  function handleGoalChange() {
    
  }

  return (
   
  )
}


