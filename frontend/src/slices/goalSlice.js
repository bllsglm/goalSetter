import { createSlice } from '@reduxjs/toolkit';

const initialState = {goals : localStorage.getItem('goals') ? JSON.parse(localStorage.getItem('goals')) : null}

const goalSlice = createSlice({
  name : 'goals',
  initialState,
  reducers :{
    settingGoals : (state,action) => {
      state.goals = action.payload;
      localStorage.setItem('goals', JSON.stringify(action.payload))
    },
    resetGoals : (state, action) => {
      state.goals = null;
      localStorage.clear()
    }
  }
})

export const {settingGoals , resetGoals} = goalSlice.actions;
export default goalSlice.reducer;