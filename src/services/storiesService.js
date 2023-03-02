import API from "../api/api";
import { GET_ALL_STORIES } from "../constants/apiPaths";

export const getAllStories = async (setAllStories, setLoading) => {
    setLoading(true);
    try {
      const response = await API({
        url: GET_ALL_STORIES,
        method: 'GET',
      });
      setAllStories(response.data);
    } catch (error) {
      console.error('getAllStoriesError', error);
    } finally {
      setLoading(false);
    }
  };