export default function Overview({ goals }) {

    const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)
    const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length
    
    return (
        <>
        </>
    )
}