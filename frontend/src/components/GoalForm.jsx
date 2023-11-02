import { useState } from "react"
import {useSelector, useDispatch } from 'react-redux';
import {useGetGoalsQuery ,useSetGoalsMutation} from '../slices/goalApiSlice';
import { toast } from 'react-toastify';
import Loader from './Loader';

const GoalForm = () => {
  const [text,setText] = useState('');
  const dispatch = useDispatch();

  const {settingGoals} = useSelector((state) => state.goals)
  const [setGoalApi, {isLoading :loaderSetting ,error}] = useSetGoalsMutation(text)
  const {data, isLoading : loadingGetGoal ,isError} = useGetGoalsQuery();


  const onSubmit = async(e) => {
    try {
      e.preventDefault()
      console.log(`dsadaad${text}adaasdadsd`);
      const res = await setGoalApi().unwrap();
      dispatch(settingGoals({...res}))
      toast.success('Your goal set')  
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input 
          type="text" 
          name="text"
          id="text" 
          value={text} 
          onChange={(e)=>setText(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">Add Goal</button>
          {loaderSetting && <Loader/>}
        </div>
      </form>
    </section>

  )
}

export default GoalForm