import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditPost () {
    const navigate = useNavigate();
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    useEffect(() => {
        axios(`/post/` + id).then(response => {
            const updatePost = response.data;
            setTitle(updatePost.title);
            setContent(updatePost.content);
            setSummary(updatePost.summary);
        })
    },[]);

    const updatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0]) {
            data.set('file', files?.[0]);
        }

        try {
            const response = await axios.put(`/post/${id}`, data);
            console.log(response.data); // Log the response data to see what's returned from the server
            // Handle the response as needed (e.g., show success message, navigate to a different page, etc.)
            navigate('/post/' + id);
            toast.success('Post updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update post.');
        }
    }

    return (
        <>
            <form onSubmit={updatePost}>
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
                <button style={{marginTop:'5px'}}>Update Post</button>
            </form>
        </>
    )
}