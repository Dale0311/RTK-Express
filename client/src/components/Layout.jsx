import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
const Layout = () => {
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
            <NavLink to={'signin'}>Sign in</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
