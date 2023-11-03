import { useState,useEffect } from "react"
import {useSelector, useDispatch } from 'react-redux';
import {useGetGoalsQuery ,useSetGoalsMutation} from '../slices/goalApiSlice';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { settingGoals, resetGoals } from "../slices/goalSlice";
import GoalItem from "./GoalItem";

const GoalForm = () => {
  const [text,setText] = useState('');
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth)

  const [setGoalApi, {isLoading :loaderSetting } ] = useSetGoalsMutation()
  const {data : goalList, isLoading : loadingGetGoal , refetch} = useGetGoalsQuery();


  const onSubmit = async(e) => {
    try {
      e.preventDefault()
      console.log(`dsadaad${text}adaasdadsd`);
      const res = await setGoalApi({text}).unwrap();
      dispatch(settingGoals({...res}))
      refetch()
      toast.success('Goals set, success ahead.')
      setText('')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  useEffect(()=>{
    if(goalList){
    refetch()
    }

    if(!userInfo){
      resetGoals()
    }

  },[goalList, refetch, userInfo ])


  if(loadingGetGoal){
   return <Loader/>
  }

  return (<>
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
    <section className="content">
      {goalList.length > 0 ? (
        <div className="goals">
          {goalList.map((goal)=> (
            <GoalItem key={goal._id} goal={goal}/>
          ))}
        </div>
      ) : (<h3>You have not set any goals</h3>) }
    </section>
    </>
  )
}

export default GoalForm