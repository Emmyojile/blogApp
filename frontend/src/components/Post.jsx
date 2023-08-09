import {format} from "date-fns";
import { Link } from "react-router-dom";

export default function Post  ({_id, title, summary, cover, content, createdAt, author})  {
// const PUBLIC_FOLDER = import.meta.env.VITE_API_PUBLIC_URL

// const PUBLIC_FOLDER = import.meta.env.VITE_API_PUBLIC_URL

const PUBLIC_FOLDER = import.meta.env.VITE_API_PUBLIC_LOCAL_URL
// console.log(PUBLIC_FOLDER + '/' + cover);
console.log(PUBLIC_FOLDER + cover);

    return(
        
        <div className="post">
        <div className="image">
        <Link to={`/post/${_id}`}>
        <img src={`${PUBLIC_FOLDER + cover}`} alt="" />
        {/* <img src={`https://emmyojile-blogapp.onrender.com/${cover}`} alt="" /> */}
        {/* <img src={"https://emmyojile-blogapp.onrender.com/api/v1/" + cover} alt="" /> */}
        {/* <img src={"http://localhost:4000/" + cover} alt="" /> */}
        </Link>
        </div>
        <div className='texts'>
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className='author'>{author.username}</a>
          <time>{format(new Date (createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='summary'>{summary}</p>
        </div>
      </div>
    
    )
}