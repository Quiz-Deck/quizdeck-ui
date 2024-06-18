import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SingleDeckResponse,
  SingleDeck,
  DeckQuestion,
} from "../api/deck/deckSliceTypes";

interface IInitialState {
  singleDeck: SingleDeckResponse;
  status: string;
  error: any;
}

export const initialState: IInitialState = {
  singleDeck: {
    data: {
      createdBy: {
        _id: "",
        email: "",
        userName: "",
      },
      createdOn: "",
      deckGuests: [],
      description: "",
      likeCount: 0,
      playCount: 0,
      questions: [],
      status: "",
      timer: 0,
      title: "",
      type: "",
      updatedBy: "",
      updatedOn: "",
      _id: "",
      userLiked: false,
    },
    message: "",
  },
  status: "",
  error: {},
};

const baseURL = process.env.REACT_APP_API_URL;

export const fetchSingleDeck = createAsyncThunk<SingleDeckResponse, string>(
  "deck/fetchSingleDeck",
  async (id, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(`${baseURL}/deck/${id}`, {
        headers: {
          // Add your headers here
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          // Other headers as needed
        },
      });
      return res.json();
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    getADeck: (state, action: PayloadAction<SingleDeckResponse>) => {
      state.singleDeck = action.payload;
    },
    editADeck: (state, action: PayloadAction<SingleDeck>) => {
      const newState = state.singleDeck.data;
      const { questions, ...restOfPayload } = action.payload;
      const newData = { ...newState, ...restOfPayload };

      return {
        ...state,
        singleDeck: {
          ...state.singleDeck,
          data: newData,
        },
      };
    },
    addADeckQuestion: (state, action: PayloadAction<DeckQuestion[]>) => {
      const oldQuestions = state.singleDeck.data.questions;
      const updatedQuestions = [...oldQuestions, ...action.payload];
      const newData = { ...state.singleDeck.data, questions: updatedQuestions };

      return {
        ...state,
        singleDeck: {
          ...state.singleDeck,
          data: newData,
        },
      };
    },
    editADeckQuestion: (state, action: PayloadAction<SingleDeck>) => {
      const oldQuestions = state.singleDeck.data.questions;
      const updatedQuestions = oldQuestions.map((question: DeckQuestion) => {
        // Assuming there's a question ID to compare
        if (question?._id === action.payload?._id) {
          // Replace the question with the updated one from action.payload
          return action.payload;
        }
        return question;
      });
      const newData = { ...oldQuestions, questions: updatedQuestions };

      return {
        ...state,
        data: newData,
      };
    },
    deleteADeckQuestion: (state, action: PayloadAction<string>) => {
      const oldQuestions = state.singleDeck.data.questions;

      // Filter out the question with the ID matching action.payload
      const updatedQuestions = oldQuestions.filter(
        (question: DeckQuestion) => question?._id !== action.payload
      );

      // Create the new state with updated questions
      const newData = { ...state.singleDeck.data, questions: updatedQuestions };

      return {
        ...state,
        singleDeck: {
          ...state.singleDeck,
          data: newData,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleDeck.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleDeck.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleDeck = action.payload;
      })
      .addCase(fetchSingleDeck.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const deckActions = deckSlice.actions;
export const deckReducer = deckSlice.reducer;
