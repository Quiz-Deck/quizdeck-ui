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
  singleDeck: { data: [], message: "" },
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
      const newData = state.singleDeck.data.map((item: SingleDeck) => {
        if (item._id === action.payload?._id) {
          // Assuming there's an id to compare
          // Retain the existing questions property from state
          const { questions, ...restOfPayload } = action.payload;
          // Merge the rest of the payload with the original item
          return { ...item, ...restOfPayload };
        }
        return item;
      });
      return {
        ...state,
        singleDeck: {
          ...state.singleDeck,
          data: newData,
        },
      };
    },
    addADeckQuestion: (state, action: PayloadAction<DeckQuestion>) => {
      console.log("action.payload", action.payload);

      const newData = state.singleDeck.data.map((item: SingleDeck, index) => {
        if (index === 0) {
          // Assuming there's an id to compare
          console.log("item", item, item.questions);
          console.log("state.singleDeck.data", state.singleDeck.data);
          const oldQuestions = item.questions;
          const updatedQuestions = [...oldQuestions, action.payload];
          // Merge the rest of the payload with the original item
          return { ...item, questions: updatedQuestions };
        }
        return item;
      });
      return {
        ...state,
        singleDeck: {
          ...state.singleDeck,
          data: newData,
        },
      };
    },
    editADeckQuestion: (state, action: PayloadAction<SingleDeck>) => {
      const newData = state.singleDeck.data.map((item: SingleDeck) => {
        if (action.payload?._id) {
          const updatedQuestions = item.questions.map(
            (question: DeckQuestion) => {
              // Assuming there's a question ID to compare
              if (question?._id === action.payload?._id) {
                // Replace the question with the updated one from action.payload
                return action.payload;
              }
              return question;
            }
          );
          // Update the questions array with the updatedQuestions
          return { ...item, questions: updatedQuestions };
        }
        return item;
      });

      return {
        ...state,
        data: newData,
      };
    },
    deleteADeckQuestion: (state, action: PayloadAction<SingleDeck>) => {
      const newData = state.singleDeck.data.map((item: SingleDeck) => {
        if (action.payload?._id) {
          const updatedQuestions = item.questions.map(
            (question: DeckQuestion) => {
              // Assuming there's a question ID to compare
              if (question?._id === action.payload?._id) {
                // Replace the question with the updated one from action.payload
                return action.payload;
              }
              return question;
            }
          );
          // Update the questions array with the updatedQuestions
          return { ...item, questions: updatedQuestions };
        }
        return item;
      });

      return {
        ...state,
        data: newData,
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
