import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQ = fetchBaseQuery({
  baseUrl: 'http://localhost:5500',
  //add prepare headers when dealing with jwt auth
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQ,
  endpoints: {},
});

export default apiSlice;
