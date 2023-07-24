import React from 'react'

function NavBar() {
  function handleSignout() {
    localStorage.removeItem('token')
    window.location = '/'
  }
  return (
    <nav className='flex justify-between items-center px-5 py-3 lg:px-0 lg:justify-around'>
      <h2 className='text-white font-bold text-2xl lg:text-4xl tracking-widest	'>
        THE BLOG
      </h2>
      <button
        onClick={handleSignout}
        className='border py-1 px-3 rounded-md text-red-600 font-semibold text-lg hover:bg-red-600 hover:text-white transition-all'
      >
        log out
      </button>
    </nav>
  )
}

export default NavBar
