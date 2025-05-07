import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_API,
      credentials: 'include', 
    }),
    tagTypes: ['Auth','Profile','Message'], 
    endpoints: () => ({}), 
})
