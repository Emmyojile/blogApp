import './App.css'
import Header from './components/Header';
import Post from './components/Post';
import {Routes, Route} from 'react-router-dom';
import Layout from './Layouts/main';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import { UserContextProvider } from '../context/userContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

// axios.defaults.baseURL = 'http://localhost:4000/api/v1';
// axios.defaults.baseURL = 'https://emmyojile-blogapp.onrender.com/';
// axios.defaults.baseURL = 'https://emmyojile-blogapp.onrender.com/api/v1';

axios.defaults.baseURL= import.meta.env.VITE_API_DEV_URL;
// axios.defaults.baseURL= import.meta.env.VITE_API_LOCAL_URL;
// axios.defaults.baseURL= import.meta.env.VITE_API_LOCAL_URL;
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element ={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path= '/post/:id' element={<PostPage/>}/>
        <Route path= '/edit/:id' element={<EditPost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
