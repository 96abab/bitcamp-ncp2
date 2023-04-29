import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Usercontext from '../../Usercontext';

const FollowButton = ({ boardNo, userId }) => {
  const [followData, setFollowData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [following,setFollowing] = useState([])
  const user = useContext(Usercontext);

  const followedId = userId;

  useEffect(() => {
    fetchFollowData();
  }, []);

  const fetchFollowData = async () => {
    try {
      // 프로필에서 팔로잉찾기
      const response = await axios.get(`http://localhost:8080/web/follows/followers/${followedId}`);
      setFollowData(response.data);
      console.log(response.data, '겟쪽데이터');
      // console.log(userId, '게시판 올린사람');
      // console.log(user.no, '로그인한 사람');
      // console.log(response.data.data.some((item) => {
      //   console.log(item.follower.no, "옆에값 몰라서 찍음");
      // }));
      setFollowing(response.data.data.length);
      const isUserFollowing = response.data.data.some((item) => item.follower.no === user.no);
      setIsFollowing(isUserFollowing);
    } catch (error) {
      console.error('Error fetching follow data:', error);
    }
  };

  const handleFollow = async () => {
    if (user.loggedIn === false) {
      alert("로그인을 해주세요");
     return;
     } else if(userId == user.no) {
      alert("내 게시글 입니다");
      return;
     }

    try {
      const response = await axios.post(`http://localhost:8080/web/follows/${followedId}`);
      if (response.status === 200) {
        console.log(userId, '게시판 올린사람');
        console.log(user.no, '로그인한 사람');
        console.log(response.data, 'post요청');
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    if (user.loggedIn === false) {
      alert("로그인을 해주세요");
     return;
    }
    try {
      const response = await axios.delete(`http://localhost:8080/web/follows/${followedId}`);
      if (response.status === 200) {
        console.log(response.data, 'delete요청');
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <button className='gheadfollow' onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
    {/* <span>팔로잉{following}</span> */}
    </>
  );
};

export default FollowButton;