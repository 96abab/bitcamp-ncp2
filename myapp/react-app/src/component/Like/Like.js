import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Usercontext from '../../Usercontext';
import "./css/Heart.css"

const Like = ({ boardNo, loggedInUser }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const userId = loggedInUser;
  const user = useContext(Usercontext);
//   const [like, setLike] = useState([0])

  useEffect(() => {
    fetchLikes();
  }, []);
  const fetchLikes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/web/likes/${boardNo}`);
      console.log(response.data);
      console.log(user);
    //   console.log(response.data.data.some((item) => {
    //     console.log(item.member.no);
    //   }));
      setLikes(response.data.data.length);
    //   setLike(response.data.data[0].member.nickName);
      const isLiked = response.data.data.some((item) => item.member.no === user.no);
      setLiked(isLiked);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

    const handleHeartClick = async () => {
        if (user.loggedIn === false) {
         alert("로그인을 해주세요");
        return;
        }
    try {
      if (liked) {
        await axios.delete(`http://localhost:8080/web/likes/${boardNo}`);
      } else {
        await axios.post(`http://localhost:8080/web/likes/${boardNo}`);
      }
      setLiked(!liked);
      fetchLikes();
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
<>
<div className="heartbtn">   
     <div className={`heart-btn ${liked ? "heart-active" : ""}`}>
        <div className="heart-content" onClick={handleHeartClick}>
            <span className={`heart ${liked ? "heart-active" : ""}`} ></span>
            <span className={`heart-text ${liked ? "heart-active" : ""}`}>
                Like
            </span>
            <span  className={`numb ${liked ? "heart-active" : ""}`}>{likes}</span>
        </div>
    </div>
</div>
    </>
  );
};

export default Like;