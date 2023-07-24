import React from 'react'
import BasicHeader from '../components/BasicHeader'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Login() {
  const [error, setError] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  async function handleLogin() {
    event.preventDefault()
    let res = await axios.post('http://localhost:5000/api/login', {
      email,
      password,
    })
    if (res.data.status === 'credentials uncorrect') {
      setError(true)
    }
    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', res.data.data.email)
      localStorage.setItem('name', res.data.data.name)
      window.location = '/blog'
    }
  }
  return (
    <>
      <BasicHeader />
      <form className='border w-[75%] flex justify-center items-center flex-col gap-5 mx-auto absolute left-[50%] top-[45vh] translate-x-[-50%] translate-y-[-50%] p-5 bg-[#D9D9D9] rounded-lg lg:w-[40%] lg:top-[55vh]'>
        <h2 className='text-2xl font-semibold tracking-wider lg:text-3xl '>
          LOGIN
        </h2>
        <input
          type='text'
          placeholder='EMAIL'
          className='p-2 w-[70%] rounded-md  bg-[#222222] placeholder:text-white    '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='PASSWORD'
          className='p-2 w-[70%] rounded-md bg-[#222222] placeholder:text-white'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='p-2 w-[70%] text-[#00F745] font-semibold  tracking-widest	 rounded-md bg-[#222222] placeholder:text-white hover:placeholder-opacity-60 hover:cursor-pointer'
          onClick={handleLogin}
        >
          LOG IN
        </button>
        <p className='text'>
          dont have an account yet ?{' '}
          <Link to='/register' className='text-blue-700 hover:cursor-pointer'>
            register
          </Link>
        </p>
        {error && (
          <p className='text-red-600'>email or password are uncorrect</p>
        )}
      </form>
    </>
  )
}

export default Login
