import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, surname, username, email, password);

    setName('');
    setSurname('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='mt-2 grid grid-cols-12'>
      <div className='col-span-10 col-start-2 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
        <form className='flex flex-col mt-8' onSubmit={handleSubmit}>
          <label className='text-lg mt-4'>First Name</label>
          <input
            type='text'
            className='border-2 border-blue-100 py-1 md:py-0'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Last Name</label>
          <input
            type='text'
            className='border-2 border-blue-100 py-1 md:py-0'
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Username</label>
          <input
            type='text'
            className='border-2 border-blue-100 py-1 md:py-0'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Email</label>
          <input
            type='email'
            className='border-2 border-blue-100 py-1 md:py-0'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className='text-lg mt-4'>Password</label>
          <input
            type='password'
            className='border-2 border-blue-100 py-1 md:py-0'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className='border-2 border-blue-300 rounded-lg mt-4 py-2 md:py-1 min-w-[70%] self-center text-lg'
            disabled={isLoading}
          >
            Submit
          </button>
          {error}
        </form>
      </div>
    </div>
  );
};
