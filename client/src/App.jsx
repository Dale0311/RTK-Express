import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './features/blogs/Blogs';
import Blog from './features/blogs/Blog';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';

// components
import _404 from './components/404';
import Layout from './components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blogs">
          <Route index element={<Blogs />} />
          <Route path=":id" element={<Blog />} />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<_404 />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="w-1/2 mx-auto mt-10">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
