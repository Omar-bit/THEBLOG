import React from 'react';
import axios from 'axios';
function CreatePost() {
  const [img, setImg] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [descripton, setDescripton] = React.useState('');
  async function handleCreate() {
    event.preventDefault();
    let res = axios.post(import.meta.env.VITE_BACK_URI + '/api/posts/create', {
      token: localStorage.getItem('token'),
      img,
      title,
      desc: descripton,
    });
    alert('post created');
    window.location.reload();
  }
  return (
    <form className='flex flex-col items-center gap-5 p-4 w-[90%] mx-auto mt-5 bg-[#D9D9D9] rounded-sm lg:w-[50%] lg:mx-0'>
      <h2 className='text-2xl font-bold'>Create Post</h2>
      <input
        type='text'
        className='border border-5 border-black  w-[80%] rounded-sm p-1'
        placeholder='img url'
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <input
        type='text'
        className='border border-5 border-black  w-[80%] rounded-sm p-1'
        placeholder='post title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name=''
        id=''
        cols='30'
        rows='5'
        className='border border-5 border-black  w-[80%] rounded-sm p-1'
        placeholder='post descripton'
        value={descripton}
        onChange={(e) => setDescripton(e.target.value)}
      ></textarea>
      <button
        className='border border-black py-2 px-5 rounded-sm hover:bg-black hover:text-white transition'
        onClick={handleCreate}
      >
        Create
      </button>
    </form>
  );
}

export default CreatePost;
