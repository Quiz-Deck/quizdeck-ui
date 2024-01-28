import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from "./config";


// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
    reducerPath: "apiUrl",
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl,
    prepareHeaders: (headers) => {
        //authenticating with token for all our requests
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if(user){
            headers.set("authorization", `Bearer ${user.token}`);
            return headers;
        }
    },
    
}),
  tagTypes: [],
  endpoints: () => ({}),
})