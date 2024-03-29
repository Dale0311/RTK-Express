import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from './authApiSlice';
import { setCredentials } from './authSlice';

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errMess, setErrMess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [id]: value };
    });
  };

  const canSubmit = [form.email, form.password].every(Boolean);

  const handleSubmit = async (e) => {
    if (!canSubmit) {
      return setErrMess('All fields are required');
    }
    try {
      const { accessToken } = await signIn(form).unwrap();
      dispatch(setCredentials({ accessToken }));
      navigate('/blogs');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="">
        <h1 className="p-2 text-xl font-bold text-center">Sign In</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <input
              type="email"
              className="p-4 border rounded bg-slate-100"
              placeholder="Email"
              id="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="password"
            className="p-4 border rounded bg-slate-100"
            placeholder="Password"
            id="password"
            onChange={(e) => handleChange(e)}
          />
          {errMess && <p className="text-red-500 text-sm">{errMess}</p>}
          <button
            className="p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
            onClick={handleSubmit}
          >
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
