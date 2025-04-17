import { apiSlice } from "../apiSlice";
import {
  AuthResponse,
  CreateDeckRequest,
  SingleDeckResponse,
  CreateDeckResponse,
  CategoryListResponse,
  CreateCategoryRequest,
} from "./categorySliceTypes";

const deckApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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

    //Create a category
    createCategory: build.mutation<
      CreateDeckResponse,
      Partial<CreateCategoryRequest>
    >({
      query: (payload) => ({
        url: "/category/create",
        method: "POST",
        body: payload,
      }),
    }),

    //Get all categories
    getCategories: build.query<CategoryListResponse, string>({
      query: (page) => ({
        url: `/category/list?page=${page}`,
        method: "GET",
      }),
    }),

    //Delete a category
    deleteCategory: build.mutation<SingleDeckResponse, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useEditDeckMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} = deckApi;
