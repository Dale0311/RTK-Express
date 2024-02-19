import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from './authApiSlice';

function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const [signUp, { error }] = useSignUpMutation();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [id]: value };
    });
  };
  const canSubmit = [form.email, form.password, form.username].every(Boolean);
  const handleSubmit = async () => {
    try {
      await signUp(form).unwrap();
      setForm({ username: '', email: '', password: '' });
      navigate('/signin');
    } catch (error) {
      setForm((oldVal) => ({ ...oldVal, password: '' }));
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <h1 className="p-2 text-xl font-bold text-center">Sign Up</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-4 border rounded bg-slate-100"
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange(e)}
            id="username"
          />
          <div className="flex flex-col">
            <input
              type="email"
              className="p-4 border rounded bg-slate-100"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => handleChange(e)}
              id="email"
            />
            {error ? <p className="text-sm text-red-500">{error}</p> : ''}
          </div>
          <input
            type="password"
            className="p-4 border rounded bg-slate-100"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange(e)}
            id="password"
          />
          <button
            disabled={!canSubmit}
            className="p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p>
            Already have an account?{' '}
            <Link to={'/signin'} className="text-blue-500 mx-2 hover:underline">
              sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
