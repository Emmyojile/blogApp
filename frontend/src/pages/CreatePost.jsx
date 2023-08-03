import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";


export default function CreatePost () {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    
    const createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();

        const response = await axios.post('/createPost', data)
        const newPost = response.data;

        if (newPost) {
            navigate('/')
            toast.success('Post created successfully!');
        } else {
            toast.error('Failed to create post.');
        }
    }

    return (
        <>
            <form onSubmit={createNewPost}>
                <input type="title" 
                placeholder={"Title"}
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <input type="summary" 
                placeholder={"Summary"}
                value={summary}
                onChange={e => setSummary(e.target.value)}
                />
                <input type="file"
                onChange={e => setFiles(e.target.files)}
                />
                <Editor onChange={setContent} value={content}/>
                <button style={{marginTop:'5px'}}>Create Post</button>
            </form>
        </>
    )
}


 