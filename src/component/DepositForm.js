export default function DepositForm({ goals, depositData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Make Deposit</h2>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Goal</label>
        <select
          name="goalId"
          value={depositData.goalId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount}/${goal.targetAmount})
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium">Amount ($)</label>
        <input
          type="number"
          name="amount"
          min="1"
          value={depositData.amount || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Deposit
      </button>
    </form>
  );
}