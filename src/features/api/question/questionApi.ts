import { apiSlice } from "../apiSlice";
import { AuthResponse, AddDeckQuestionRequest } from "./questionSliceTypes";

const deckApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    //Create a deck
    addQuestion: build.mutation<
      AuthResponse,
      { deckId?: string; payload: Partial<AddDeckQuestionRequest> }
    >({
      query: ({ deckId, payload }) => ({
        url: `/question/create/${deckId}`,
        method: "POST",
        body: payload,
      }),
    }),
    editQuestion: build.mutation<
      AuthResponse,
      { deckId?: string; payload: Partial<AddDeckQuestionRequest> }
    >({
      query: ({ deckId, payload }) => ({
        url: `/question/edit/${deckId}`,
        method: "POST",
        body: payload,
      }),
    }),
    deleteQuestion: build.mutation<AuthResponse, string>({
      query: (deckId) => ({
        url: `/question/${deckId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddQuestionMutation,
  useEditQuestionMutation,
  useDeleteQuestionMutation,
} = deckApi;
