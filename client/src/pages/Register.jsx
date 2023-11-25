import React from 'react';
import BasicHeader from '../components/BasicHeader';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  async function handleRegister() {
    event.preventDefault();
    let validCred = true;
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      validCred = false;
      alert('email invalid');
    }
    if (validCred) {
      try {
        let res = await axios.post(
          import.meta.env.VITE_BACK_URI + '/api/register',
          {
            email,
            name,
            password,
          }
        );
        alert(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      <BasicHeader />
      <form className='border w-[75%] flex justify-center items-center flex-col gap-5 mx-auto absolute left-[50%] top-[45vh] translate-x-[-50%] translate-y-[-50%] p-5 bg-[#D9D9D9] rounded-lg lg:w-[40%] lg:top-[55vh]'>
        <h2 className='text-2xl font-semibold tracking-wider lg:text-3xl '>
          REGISTER
        </h2>
        <input
          type='text'
          placeholder='NAME'
          className='p-2 w-[70%] rounded-md  bg-[#222222] placeholder:text-white    '
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='EMAIL'
          className='p-2 w-[70%] rounded-md  bg-[#222222] placeholder:text-white    '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='PASSWORD'
          className='p-2 w-[70%] rounded-md bg-[#222222] placeholder:text-white'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className='p-2 w-[70%] text-[#00F745] font-semibold  tracking-widest	 rounded-md bg-[#222222] placeholder:text-white hover:placeholder-opacity-60 hover:cursor-pointer'
          onClick={handleRegister}
        >
          JOIN US
        </button>
        <p className='text'>
          already a member ?{' '}
          <Link to='/login' className='text-blue-700 hover:cursor-pointer'>
            login
          </Link>
        </p>
      </form>
    </>
  );
}

export default Register;
