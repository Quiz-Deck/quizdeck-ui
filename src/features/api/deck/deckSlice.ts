import { apiSlice } from "../apiSlice";
import {
  AuthResponse,
  CreateDeckRequest,
  SingleDeckResponse,
  CreateDeckResponse,
} from "./deckSliceTypes";

const deckSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    //Create a deck
    createDeck: build.mutation<CreateDeckResponse, Partial<CreateDeckRequest>>({
      query: (payload) => ({
        url: "/deck/create",
        method: "POST",
        body: payload,
      }),
    }),

    //Get a user's deck
    getUserDeck: build.query<AuthResponse, void>({
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
    getPublicDecks: build.query<SingleDeckResponse, void>({
      query: () => ({
        url: `/deck/public`,
        method: "GET",
      }),
    }),

    //Gelete a single deck
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
  useGetUserDeckQuery,
  useGetSingleDeckQuery,
  useGetPublicDecksQuery,
  useDeleteSingleDeckMutation,
} = deckSlice;
