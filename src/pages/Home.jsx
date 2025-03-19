import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Latest Posts</h2>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="border p-2 my-2 rounded bg-gray-100">
              <h3 className="font-semibold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
