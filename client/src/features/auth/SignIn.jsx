import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errMess, setErrMess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [id]: value };
    });
  };

  const canSubmit = [form.email, form.password].every(Boolean);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      return setErrMess('All fields are required');
    }

    // create endpoint for userApi
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
              required={true}
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
