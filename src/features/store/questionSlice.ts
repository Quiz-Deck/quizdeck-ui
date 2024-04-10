import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  odogwuSoundState: boolean;
  odogwuProfile: object;
  hunterObject: object;
  singleDeck: object;
}

export const initialState: IInitialState = {
  odogwuSoundState: false,
  hunterObject: {
    newHunter: true,
    sound: false,
  },
  odogwuProfile: {},
  singleDeck: {},
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addOdogwuProfile: (state, action: PayloadAction<object>) => {
      state.odogwuProfile = action.payload;
    },
    toggleOdogwuSound: (state, action: PayloadAction<boolean>) => {
      state.odogwuSoundState = action.payload;
    },
    setHunterObject: (state, action: PayloadAction<object>) => {
      state.hunterObject = action.payload;
    },
  },
});

export const questionActions = questionSlice.actions;
export const questionReducer = questionSlice.reducer;
