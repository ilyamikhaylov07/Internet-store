import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface CounterState {
  IdContainer: [string,string][]
}

const initialState: CounterState = {
    IdContainer: [],
}

export const IdContainerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state,actions:PayloadAction<[string,string]>) => {
      state.IdContainer.push(actions.payload);
    },
    remove: (state,actions:PayloadAction<[string,string]>) => {
      const indexToRemove = state.IdContainer.findIndex(item => item[0] === actions.payload[0] && item[1] === actions.payload[1]);

    if (indexToRemove !== -1) {
    state.IdContainer.splice(indexToRemove, 1);}
    },
    clearstorage:(state)=>{
      state.IdContainer.splice(0, state.IdContainer.length);
    }

  },
})

// Action creators are generated for each case reducer function
export const { add, remove,clearstorage} = IdContainerSlice.actions
export default IdContainerSlice.reducer