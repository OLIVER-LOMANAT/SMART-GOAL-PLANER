export default function GoalDisplayer({ goals, deleteGoal }) {
  const calculateProgress = (saved, target) => (saved / target) * 100;
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="mt-6">
      {goals.length > 0 ? (
        goals.map((goal) => {
          const daysLeft = calculateDaysLeft(goal.deadline);
          let status = "";
          let statusClass = "";
          
          if (goal.savedAmount >= goal.targetAmount) {
            status = "Completed!";
            statusClass = "text-green-500";
          } else if (daysLeft < 0) {
            status = "Overdue!";
            statusClass = "text-red-500";
          } else if (daysLeft < 30) {
            status = `${daysLeft} days left`;
            statusClass = "text-yellow-500";
          } else {
            status = `${daysLeft} days left`;
            statusClass = "text-blue-500";
          }

          return (
            <div
              key={goal.id}
              className="font-mono flex flex-col p-4 w-[500px] mx-auto my-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{goal.name}</h3>
                <span className={statusClass}>{status}</span>
              </div>
              
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${calculateProgress(goal.savedAmount, goal.targetAmount)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span>${goal.savedAmount}</span>
                  <span>${goal.targetAmount}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Category: {goal.category}</span>
                <span>Deadline: {goal.deadline}</span>
              </div>
              
              <button 
                onClick={() => deleteGoal(goal.id)}
                className="mt-2 text-red-500 hover:text-red-700 self-end"
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <p className="m-[100px] text-[20px] font-mono">No goals yet. Add a goal to get started!</p>
      )}
    </div>
  );
}