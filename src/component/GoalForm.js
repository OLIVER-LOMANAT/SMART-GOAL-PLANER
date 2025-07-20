export default function GoalForm({ currentGoal, handleChange, handleSubmit }) {
  const categories = ["Travel", "Emergency"];
    
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Goal</h2>
      
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col">
          <label className="font-mono" htmlFor="name">Goal Name:</label>
          <input
            className="h-10 rounded-xl text-center border"
            type="text"
            name="name"
            value={currentGoal.name}
            onChange={handleChange}
            required
          />    
        </div>  
        
        <div className="flex flex-col">
          <label className="font-mono" htmlFor="targetAmount">Target Amount ($):</label>
          <input
            className="h-10 rounded-xl text-center border"
            type="number"
            name="targetAmount"
            value={currentGoal.targetAmount || ""}
            onChange={handleChange}
            required
          />    
        </div>
        
        <div className="flex flex-col">
          <label className="font-mono" htmlFor="category">Category:</label>
          <select
            className="h-10 rounded-xl text-center border"
            name="category"
            value={currentGoal.category}
            onChange={handleChange}
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="font-mono" htmlFor="deadline">Deadline:</label>
          <input
            className="h-10 rounded-xl text-center border"
            type="date"
            name="deadline"
            value={currentGoal.deadline}
            onChange={handleChange}
            required
          />    
        </div>
      </div>
      
      <button className="font-mono h-[40px] w-[80px] bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Goal
      </button>
    </form>
  );
}