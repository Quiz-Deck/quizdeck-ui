import { apiSlice } from "../apiSlice";
import {
  AuthResponse,
  CreateDeckRequest,
  SingleDeckResponse,
  CreateDeckResponse,
  DeckListResponse,
} from "./deckSliceTypes";

const deckApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    //Create a deck
    createDeck: build.mutation<CreateDeckResponse, Partial<CreateDeckRequest>>({
      query: (payload) => ({
        url: "/deck/create",
        method: "POST",
        body: payload,
      }),
    }),

    //Edit a deck
    editDeck: build.mutation<
      AuthResponse,
      { deckId?: string; payload: Partial<CreateDeckRequest> }
    >({
      query: ({ deckId, payload }) => ({
        url: `/deck/edit/${deckId}`,
        method: "PUT",
        body: payload,
      }),
    }),

    //Get a user's deck
    getUserDeck: build.query<DeckListResponse, void>({
      query: () => ({
        url: "/deck/user",
        method: "GET",
      }),
    }),

    //Get a single deck
    getSingleDeck: build.query<SingleDeckResponse, string>({
      query: (id) => ({
        url: `/deck/${id}`,
        method: "GET",
      }),
    }),

    //Get a single deck
    getPublicDecks: build.query<DeckListResponse, void>({
      query: () => ({
        url: `/deck/public`,
        method: "GET",
      }),
    }),

    //Delete a single deck
    deleteSingleDeck: build.mutation<SingleDeckResponse, string>({
      query: (id) => ({
        url: `/deck/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateDeckMutation,
  useEditDeckMutation,
  useGetUserDeckQuery,
  useGetSingleDeckQuery,
  useGetPublicDecksQuery,
  useDeleteSingleDeckMutation,
} = deckApi;