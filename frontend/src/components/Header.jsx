import { Link } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";


export default function Header  ()  {
  const { user, setUser} = useContext(UserContext)

  function logout() {
    axios.post('/logout', {
      withCredentials: true
    });
    setUser(null);
  }

    return(
        <>
      <header>
      <Toaster position="top-right" toastOptions={{duration: 3000}}/>
      <Link to='/' className ="logo">My Blog</Link>
        <nav>
          {user && (
            <>
            <span>Hello! {user.username}</span>
            <Link to="/create">Create New Post</Link>
            <Link to="/" onClick={logout}>Logout</Link>
            </>
          )}
          {!user && (
            <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </>
          )}
          
        </nav>
      </header>
        </>
    )
}


















