import { apiSlice } from "../apiSlice";
import {
  AuthResponse,
  CreateDeckRequest,
  SingleDeckResponse,
  CreateDeckResponse,
  DeckListResponse,
  InviteUserRequest,
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
    getUserDeck: build.query<DeckListResponse, string>({
      query: (page) => ({
        url: `/deck/user?page=${page}`,
        method: "GET",
      }),
    }),

    //Get a single deck
    getSingleDeck: build.query<
      SingleDeckResponse,
      { id: string; userId: string }
    >({
      query: ({ id, userId }) => ({
        url: `/deck/${id}?userId=${userId}`,
        method: "GET",
      }),
    }),

    //Get a single deck
    getPublicDecks: build.query<DeckListResponse, string>({
      query: (page) => ({
        url: `/deck/public?page=${page}`,
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

    //Like a single deck
    likeSingleDeck: build.mutation<SingleDeckResponse, string>({
      query: (id) => ({
        url: `/deck/${id}/like`,
        method: "PUT",
      }),
    }),

    //Invite deck user
    inviteDeckUser: build.mutation<
      SingleDeckResponse,
      Partial<InviteUserRequest>
    >({
      query: (payload) => ({
        url: `/deck/invite`,
        method: "POST",
        body: payload,
      }),
    }),

    //Like a single deck
    playDeck: build.mutation<SingleDeckResponse, string>({
      query: (id) => ({
        url: `/deck/${id}/play`,
        method: "PUT",
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
  useLikeSingleDeckMutation,
  useInviteDeckUserMutation,
  usePlayDeckMutation,
} = deckApi;
