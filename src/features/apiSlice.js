import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["videos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["videos", "video", "relatedVideos"],
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      keepUnusedDataFor: 350,
      providesTags: (result, error, arg) => [{ type: "video", id: arg }],
    }),
    getRelatedVideos: builder.query({
      query: (title) => {
        const tag = title.split(" ");
        const link = tag.map((t) => `title_like=${t}`);
        const queryString = `/videos/?${link.join("&")}&_limit=4`;

        return queryString;
      },
      providesTags: (result, error, arg) => [{ type: "relatedVideos", id: arg.id }],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "video", id: arg.id },
        { type: "relatedVideos", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
