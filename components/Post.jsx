'use client'
import { useState, useEffect } from "react"
 
const Post = () => {
    const [posts, setPosts] = useState([])
    const [edtitingId, setEditingId] = useState(null) // ID to track the ID of the post being edited
    const [editingTitle, setEditingTitle] = useState("") // To store the Title or Post being editied
    const [ error, setError ] = useState('') // To store the error message
 
 
 
// This is how we post data to the server
  const addPost = (title) => { // Function to add a new post
    fetch("http://localhost:3300/posts", { // Sending a POST request to the backend to add a new post
      method: "POST", // Setting the request method as POST
      headers: { "Content-Type": "application/json" }, // Setting content type to JSON in the request headers
      body: JSON.stringify({ title }), // Sending the post title in the request body as JSON
    })
      .then((response) => response.json()) // Converts the response to JSON
      .then((newPost) => setPosts((prevPosts) => [...prevPosts, newPost])); // Adds the new post to the state
  };
 
// Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value.trim()
    if (!title) { // Error handling if the title is empty
      setError("Please enter a title")
      return
    }
    setError("") // setting the error message state to empty
    addPost(title) // Calling the addPost function to add a new post
    e.target.title.value = "" // Resetting the input field
  }
 
 
  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
 
        {/* Handle Submit */}
        <form onSubmit={handleSubmit}>
            <input
            className="border p-2 mr-2"
            type="text"
            placeholder="Title"
            name="title"
            />
            {/* Add button Type */}
            <button className="bg-blue-500 text-white py-1 px-2 rounded" type="submit" >
                Add Post
            </button>
        </form>
           
            {/* Display Posts */}
        <ul className="mt-4">
            {
                posts.map((post)=> (
                    <li
                    key={post.id}
                    className="border p-2 my-2 flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="font-bold">{post.title}</span>
 
                        </div>
 
                    </li>
                ))
            }
        </ul>
 
 
    </div>
  )
}
 
export default Post