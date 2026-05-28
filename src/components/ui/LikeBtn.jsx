import { useState } from "react"
import FavoriteIcon from "../../assets/favorite.svg";

export default function LikeBtn() {

const [like, setLike] = useState(0)

    return(
        <>
            <button className="like-btn"
             onClick={()=> setLike(like+1)}>

               <img src={FavoriteIcon} alt="like-icon" /> 
                {like}
             </button>
        </>
    )
}