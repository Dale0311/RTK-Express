#### Understanding providing tags

```React
res
    ? [
        { type: 'Blogs', id: 'LIST' }, -> no matter what the result is, store them in a cache Blogs.LIST
        ...res.map(({ id }) => ({ type: 'Blogs', id })), -> every object in the response create a cache Blogs.id
    ]
    : ['Blogs'];
```

#### explaining how getPost provideTags work

```React
getPost: build.query({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
```

1. it check first if the provided tag exist in the Posts collection cache. in this case the provided tag
   is looking for weather Posts.id exist in the Posts collection.
2. if exist then return the cache data. else, get the data and create a new tag to it under posts collection
