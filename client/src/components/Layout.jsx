import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { selectToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useLogOutMutation } from '../features/auth/authApiSlice';

const Layout = () => {
  const user = useSelector(selectToken);
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    await logOut();
    navigate('/signin');
  };
  return (
    <div className="space-y-2">
      <nav className="bg-indigo-400 p-4 text-white font-semibold">
        <ul className="flex justify-end space-x-8">
          <li>
            <NavLink to={'.'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'blogs'}>Blogs</NavLink>
          </li>
          <li>
            {user ? (
              <p onClick={handleLogoutClick}>Log out</p>
            ) : (
              <NavLink to={'signin'}>Sign in</NavLink>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
