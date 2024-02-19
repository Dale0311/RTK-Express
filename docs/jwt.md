### implementation of jwt front to back

##### We first encounter jwt in signin because they are primarily use in authentication

- create accessToken and refreshToken .env
- @signinController: create instances of tokens using jwt.sig

```
nodejs
// if userExist
const accessToken = jwt.sign(
    { email: userExist.email },
    process.env.ACCESS_TOKEN,
    {
        expiresIn: '30m',
    }
);
const refreshToken = jwt.sign(
    { email: userExist.email },
    process.env.REFRESH_TOKEN,
    {
        expiresIn: '3d',
    }
);
```

- return a res and cookie

```
node
res.cookie('jwt', refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // only server can access it
    sameSite: 'None', // cross site cookie or they can access it even if the uri of the api and client is not the same
    secure: true,
});
res.json({ accessToken });
```

##### @frontend - next is to create an authSlice that will hold our token

- initialize slice

```
node

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {},
});

```

- create reducers for setting up state that holds our token and logout

```node

reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
```

- exports reducers and selector

```
node

export const { logOut, setCredentials } = authSlice.actions; // to be use in our entire application
export default authSlice.reducer; //to be use in our store

export const selectToken = (state) => state.auth.token; // to be use for protected route or smt
```

##### @frontend customize fetch base query

```
node

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; //gets from our authSlice

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
```

- implement baseQueryWithReauth

```node
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args); // request url, method, body
  // console.log(api); // signal, dispatch, getState()
  // console.log(extraOptions); //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.';
      }
      return refreshResult;
    }
  }

  return result;
};
```

- pass our baseQueryWithReauth in our apiSlice

##### @backend - since our succeeding request includes our accessToken and refreshToken

1. accessToken being pass to prepareHeaders
2. refreshToken being pass to cookie //httpOnly

- create a middleware that verify if there's a accessToken in the headers of a req.

```node
import jwt from 'jsonwebtoken';
export const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const accessToken = authHeader.split(' ')[1];

  //using jwt verify
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.userEmail = decoded.email;
    next();
  });
};
```

- use the verifyJWT middleware to protect certain endpoints that will need an accessToken first before we can reach them

```node
router.use(verifyJWT); // this check first if there's an accessToken
router.post('/', addNewBlog);
router.get('/:id', getBlog);
```

<!-- continuation to refresh token -->
