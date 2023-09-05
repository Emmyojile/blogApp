import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePost() {
    const PUBLIC_FOLDER = import.meta.env.VITE_API_LIVE_URL
    // const PUBLIC_FOLDER = import.meta.env.VITE_API_LOCAL_URL
    
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const createNewPost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        if (file) {
            data.append('file', file);
        }

        try {
            const response = await axios.post(`/${PUBLIC_FOLDER}/createPost`, data);
            const newPost = response.data;

            if (newPost) {
                navigate('/');
                toast.success('Post created successfully!');
            } else {
                toast.error('Failed to create post.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('An error occurred while creating the post.');
        }
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="text" 
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input type="text" 
                placeholder="Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input type="file"
                onChange={e => setFile(e.target.files[0])}
            />
            <Editor onChange={setContent} value={content}/>
            <button style={{ marginTop: '5px' }}>Create Post</button>
        </form>
    );
}



 