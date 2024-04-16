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
      var index = state.IdContainer.indexOf(actions.payload);
      if (index !== -1) {
        state.IdContainer.splice(index, 1);
      }
    },
    copytostarage:(state)=>{
        
    }

  },
})

// Action creators are generated for each case reducer function
export const { add, remove} = IdContainerSlice.actions
export default IdContainerSlice.reducer