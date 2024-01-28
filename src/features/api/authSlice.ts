import { apiSlice } from "./apiSlice";
import { AuthResponse, LoginRequest, SignUpRequest } from "./authSliceTypes";

const authSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        //Login a user
        logIn: build.mutation<AuthResponse, Partial<LoginRequest>>({
            query: (payload) => ({
                url: "/login",
                method: "POST",
                body: payload,
            }),
        }),

        //Create account for a user
        signUp: build.mutation<AuthResponse, Partial<SignUpRequest>>({
            query: (payload) => ({
                url: "/register",
                method: "POST",
                body: payload,
            }),
        }),


    }),
    overrideExisting: true,
})

export const {
    useLogInMutation,
    useSignUpMutation
} = authSlice;
