import { apiSlice } from "./apiSlice";
import { GOALS_URL } from "../constants";

export const goalApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    getGoals : builder.query({
      query : () => ({
        url : GOALS_URL,
      }),
      keepUnusedDataFor : 5,
    }),
    setGoals : builder.mutation({
      query : (text) => ({
        url : GOALS_URL,
        method : 'POST',
        body :text,
      })
    }),
    updateGoal : builder.mutation({
      query : (data) => ({
        url :`${GOALS_URL}/${data.goalId}`,
        method : 'PUT',
        body : data
      })
    }),
    deleteGoal : builder.mutation({
      query : (goalId) => ({
        url :`{GOALS_URL}/${goalId}`,
        method : 'DELETE',
      })
    })
  })
})

export const {useDeleteGoalMutation,useGetGoalsQuery,useSetGoalsMutation,useUpdateGoalMutation} = goalApiSlice