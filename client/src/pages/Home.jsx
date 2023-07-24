import React from 'react'
import homePage from '../assets/homePage.svg'
import { Link } from 'react-router-dom'
import BasicHeader from '../components/BasicHeader'
function Home() {
  return (
    <>
      <BasicHeader />
      <div className=' mt-2 w-[90%] m-auto flex flex-col gap-5 items-center justify-center lg:mt-5 lg:flex-row  lg:gap-0 lg:justify-around '>
        <div className='flex items-center justify-center w-full'>
          <img
            className='w-full md:max-w-[450px] lg:max-w-[600px]'
            src={homePage}
            alt='Home Page'
          />
        </div>
        <div className='w-full flex flex-col gap-4 p-8'>
          <p className='text-xl text-white font-semibold md:text-lg md:font-normal md:leading-8	lg:text-2xl lg:leading-10'>
            the blog is a blogging platform that let’s you express your opinions
            ,share news , post about any field you want and more so join us and
            feel free to blog anything
          </p>
          <Link
            to='/login'
            className='place-self-end text-xl font-bold text-[#00F745] hover:opacity-60 md:place-self-center md:border md:px-4 md:py-2 md:rounded-md md:border-5 md:border-[#00F745] lg:place-self-end '
          >
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
