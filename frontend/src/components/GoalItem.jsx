import { toast } from 'react-toastify';
import {useDeleteGoalMutation } from '../slices/goalApiSlice'
import Loader from './Loader';

const GoalItem = ({goal}) => {

  
  const [deleteGoal, {isLoading: loadingDelete, isError ,error}] = useDeleteGoalMutation();

  const deleteHandler = async(e) => {
    await deleteGoal(goal._id)
  }

  return <>
    {loadingDelete ? <Loader/> : isError ? toast.error(error?.data?.message || error.error) : (
      <>
      <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString('tr-TR')}
      </div>
      <h2>{goal.text}</h2>
      <button 
      className="close"
      onClick={deleteHandler}
      >X</button>
    </div>
    </>
    )}
    </>
  
}

export default GoalItem