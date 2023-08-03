import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";


export default function LoginPage () {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const login = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
        const {data} = await axios.post('/login', {
            email, password
        });
        if(data.error) {
            toast.error(data.error)
        } else {
            toast.success('Welcome!!')
            setUser(data);
            navigate('/')
        }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
         <form className="login" onSubmit={login}>
            <h1>Login</h1>
                <input type="email" 
                placeholder="email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                />
                <input type="password" 
                placeholder="password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button>Login</button>
        </form>
        </>
    )
}


 