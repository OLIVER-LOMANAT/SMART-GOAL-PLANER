export default function DepositForm({ goals, depositData, handleChange, handleSubmit}) {
    
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold scroll-mb-4">Make Deposit</h2>

            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col">
                    <label className="font-mono" htmlFor="goalId">Select Goal</label>
                    <select
                     className="h-10 rounded-xl text-center border"
                     name="goalId"
                     value={depositData.goalId}
                     onChange={handleChange}
                     required
                    >
                        <option>Select Goal</option>
                        {goals.map(goal => (
                            <option key={goal.id} value={goal.id}>{goal.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                        <label>Amount $:</label>
                        <input
                            className="h-10 rounded-xl text-center border"
                            type="number"
                            name="amount"
                            value={depositData.amount || ""}
                            onChange={handleChange}
                            required
                        />
                </div>
            </div>
            <button className="font-mono h-[40px] w-[80px] bg-green-500 text-white rounded hover:bg-green-600">
                Deposit
            </button>
        </form>
    )
}