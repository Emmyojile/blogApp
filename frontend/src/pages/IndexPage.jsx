import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/getPosts")
      .then(response => {
        const posts = response.data;
        setPosts(posts);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  console.log("Posts:", posts);

  return (
    <>
      {Array.isArray(posts) ? (
        posts.length > 0 ? (
          posts.map(post => <Post key={post._id} {...post} />)
        ) : (
          <p>No posts available.</p>
        )
      ) : (
        <p>Invalid data received from the server.</p>
      )}
    </>
  );
}









// import { useEffect, useState } from "react"
// import Post from "../components/Post"
// import axios from "axios"

// export default function IndexPage () {
//     const [posts, setPosts] = useState([]);
//     useEffect(() => {
//         axios.get('/getPosts').then(response => {
//             const posts = response.data;
//             setPosts(posts);
//         })
//     }, [])
//     return (
//         <>
// {posts.length > 0 && posts.map(post => (
//     <Post key={post._id} {...post}/>
// ))}
//         </>
//     )
// }