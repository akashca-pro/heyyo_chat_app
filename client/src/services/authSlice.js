// API for authenticate user 
import { apiSlice } from "./apiSlice";

const authSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({

        register : builder.mutation({
            query : (credentials)=>({
                url : 'auth/register',
                method : 'POST',
                body : credentials
            }),
            invalidatesTags : ['Auth']
        }),

        login : builder.mutation({
            query : (credentials) => ({
                url : 'auth/login',
                method : 'POST',
                body : credentials
            }),
            invalidatesTags : ['Auth']
        }),

        logout : builder.mutation({
            query : () => ({
                url : 'auth/logout',
                method : 'DELETE'
            }),
            invalidatesTags : ['Auth']
        })
    })
})

export const {

    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation

} = authSlice