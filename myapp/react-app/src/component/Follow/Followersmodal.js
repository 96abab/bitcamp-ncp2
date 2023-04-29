import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Followersmodal.css';
import Usercontext from '../../Usercontext';
import axios from 'axios';
import FollowButton from '../Follow/Follow';
import Followerspostmodal from './Followerspostmodal';

const dummyProfileImage = 'https://via.placeholder.com/40';

const Followersmodal = ({ show, onHide, followers }) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(dummyProfileImage);
  const [followersProfiles, setFollowersProfiles] = useState([]);
  const [MypostlistOn, setMypostlistOn] = useState({ show: false, userId: null });
  const [backgroundColor, setBackgroundColor] = useState("");



  useEffect(() => {
    const fetchFollowersProfiles = async () => {
      const profiles = [];

      for (const followerId of followers) {
        try {
          const response = await axios.get(`http://localhost:8080/web/members/${followerId}`);
          const result = response.data;
          if (result.status === "success") {
            profiles.push({
              id: followerId,
              name: result.data.nickName,
              profileImage: result.data.attachedFiles[0].filepath,
            });
          }
        } catch (error) {
          // 에러 처리
        }
      }
      setFollowersProfiles(profiles);
    };

    fetchFollowersProfiles();
  }, [followers]);

  return (
    <Modal show={show} onHide={onHide} dialogClassName="FollowersModal-custom-modal">
      <Modal.Header closeButton className="FollowersModal-border-0">
        <div className="FollowersModal-modal-title-box">
          <Modal.Title className="FollowersModal-modal-title">팔로워 목록</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="FollowersModal-modal-body">
        <ul className="list-unstyled">
          {followersProfiles.map((profile, index) => (
            <li key={index} className="mb-2 follower-item">
              <div className="d-flex align-items-center">
                <img
                  src={profile.profileImage || dummyProfileImage}
                  alt="Profile"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div className="FollowersModal-ms-3">
                  <FollowButton userId={profile.id} />
                </div>
                <div className='Followersmodalcursor' onClick={() => setMypostlistOn({ show: true, userId: profile.id })}>
                  <span>{profile.name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
      {/* Followingpostmodal 컴포넌트를 팔로잉 목록의 반복문 바깥으로 이동 */}
      <Followerspostmodal
        userId={MypostlistOn.userId}
        followers={followers}
        show={MypostlistOn.show}
        onHide={() => setMypostlistOn({ show: false, userId: null })}
      />
    </Modal>
  );
};

export default Followersmodal;