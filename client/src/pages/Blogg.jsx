import React from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

function Blog() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function verifyAuth() {
      const token = localStorage.getItem('token');

      if (token) {
        let res = await axios.get(
          import.meta.env.VITE_BACK_URI + '/api/posts',
          {
            headers: { token },
          }
        );
        setLoading(false);
        setData(res.data.data);
      } else {
        window.location = '/login';
      }
    }
    verifyAuth();
  }, []);
  if (loading) {
    return <div className='loader'></div>;
  }
  return (
    <>
      <NavBar />
      <div className='mx-auto w-[90%] lg:w-[70%]'>
        <CreatePost setData={setData} />
        <div className='posts grid gap-4 grid-cols-1 mt-5 p-10 lg:grid-cols-2'>
          {data.map((post) => (
            <Post key={post.idp} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
