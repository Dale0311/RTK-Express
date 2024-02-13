#### break it down

```React
res
    ? [
        { type: 'Blogs', id: 'LIST' }, -> no matter what the result is, store them in a cache Blogs.LIST
        ...res.map(({ id }) => ({ type: 'Blogs', id })), -> every object in the response create a cache Blogs.id
    ]
    : ['Blogs'];
```
