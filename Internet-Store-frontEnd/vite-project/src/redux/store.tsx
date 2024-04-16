import { combineReducers, configureStore } from '@reduxjs/toolkit'
import IdModelReducer from './IdModelSlice'



export const store = configureStore({
  reducer: {
    counter: IdModelReducer,
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch