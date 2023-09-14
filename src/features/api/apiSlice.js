import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // its optional
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }), // fetchBaseQuery is a wrapper around fetch
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    // Similar like modern redux's builder cases
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: ['Todos'],
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
