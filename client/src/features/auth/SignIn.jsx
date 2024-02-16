import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const handleChange = (e) => {
  //     const { id, value } = e.target;
  //     setForm((oldForm) => {
  //       return { ...oldForm, [id]: value };
  //     });
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       dispatch(signInStart());
  //       const data = await axios.post(
  //         `http://localhost:5500/api/signin`,
  //         form,
  //         requestConfig
  //       );
  //       dispatch(signInSuccess(data.data));
  //       setForm({ username: '', password: '' });
  //       navigate('/');
  //     } catch (err) {
  //       dispatch(signInError(err.response.data.message));
  //       setForm((oldForm) => ({ ...oldForm, password: '' }));
  //     }
  //   };
  return (
    <div className="w-full">
      <div className="">
        <h1 className="p-2 text-xl font-bold text-center">Sign In</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <input
              type="text"
              className="p-4 border rounded bg-slate-100"
              placeholder="Username"
              id="username"
            />
          </div>
          <input
            type="password"
            className="p-4 border rounded bg-slate-100"
            placeholder="Password"
            id="password"
          />
          <button className="p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300">
            Sign in
          </button>
          <p>
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-blue-500 mx-2 hover:underline">
              sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
