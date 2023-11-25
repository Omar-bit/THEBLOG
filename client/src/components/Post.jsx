import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
function Post(props) {
  async function handleDelete() {
    let res = axios.delete(
      import.meta.env.VITE_BACK_URI + '/api/posts/delete/' + props.idp,
      { headers: { token: localStorage.getItem('token') } }
    );
    alert(await res.data.data);
  }
  const [readMore, setReadMore] = React.useState(false);
  return (
    <div className=' border border-white border-6 '>
      <header className='p-2 flex items-center justify-between'>
        <h4 className='text-lg text-white'>{props.name}</h4>
        {localStorage.getItem('email') === props.user && (
          <AiFillDelete
            className='text-red-500 text-xl'
            onClick={handleDelete}
          />
        )}
      </header>
      <hr />
      <img
        src={'https://picsum.photos/250/250'}
        alt=''
        className='w-full h-[200px] lg:h-[250px] object-cover'
      />
      <hr />
      <div className={`px-2 py-5 'h-[120px]'`}>
        <h3 className='text-white text-2xl font-bold'>{props.title}</h3>
        <p className='text-white text-md'>
          {readMore ? props.description : props.description.substr(0, 100)}
          {props.description.length > 100 && (
            <button
              className='text-blue-500'
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? 'read less' : 'read more'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default Post;
