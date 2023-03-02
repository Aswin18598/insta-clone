import API from '../api/api';
import { GET_ALL_POSTS } from '../constants/apiPaths';

export const getAllPost = async (setAllPosts, setError, setLoading) => {
  setLoading(true);
  try {
    const response = await API({
      url: GET_ALL_POSTS,
      method: 'GET',
    });
    setAllPosts(response.data);
  } catch (error) {
    console.error('getAllPostsError', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};
export const createPost = async (
  newPostDetails,
  setLoading,
  setError,
  setAllPosts,
  setOpen
) => {
  setLoading(true);
  try {
    const response = await API({
      method: 'POST',
      url: GET_ALL_POSTS,
      data: { ...newPostDetails },
    });
    console.log('response', response);
    if (response.status === 201) {
      getAllPost(setAllPosts, setError, setLoading);
      setOpen(false);
      setTimeout(() => {
        document.documentElement.scrollTop =
          document.documentElement.scrollHeight;
      }, 50);
    }
  } catch (error) {
    setError(true);
    console.error('createNewPostError', error);
  } finally {
    setLoading(false);
  }
};
