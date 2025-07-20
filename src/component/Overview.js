export default function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  const nearDeadlineGoals = goals.filter(goal => {
    const daysLeft = (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24);
    return daysLeft < 30 && goal.savedAmount < goal.targetAmount;
  }).length;

  return (
    <div className="font-mono bg-white p-4 rounded-lg shadow-md mx-auto w-3/4 mb-6">
      <div className="flex justify-between">
        <div className="text-green-600">
          <h3>Total Goals: {goals.length}</h3>
          <h3>Completed: {completedGoals}</h3>
        </div>
        <div className="text-blue-600">
          <h3>Total Saved: ${totalSaved}</h3>
          {nearDeadlineGoals > 0 && (
            <h3 className="text-yellow-500">⚠️ {nearDeadlineGoals} goals near deadline</h3>
          )}
        </div>
      </div>
    </div>
  );
}