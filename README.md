TODOS: 02/15/2024 -

### modifications

modify the Blog model, add userID - done
modify the addNewBlog action to also pass the userID - TBA
remove the /blogs/edit/:id route and just create modal for Blog page

### create sign in and signup

create sign in and sign up ui page
create userSlice

### create route and controller for signin and sign up

0. create a User model
1. create routes
2. implement accessToken and refreshToken in signin
3. redirect the user after successful signup

@home
we can all see the blogs, but if we click of the blog we are redirect to a signin/signup page

@blogs
redirect if not log in

##### thinking about doing:

1. delete the blog route and retrieve all the blogs of the user if the user click his/her profile
2. show sign in instead if the user is not currently signed in
