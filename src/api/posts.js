import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Example API

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 5); // Fetch first 5 posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
