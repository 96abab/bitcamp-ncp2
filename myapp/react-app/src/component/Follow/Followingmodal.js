import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Followingmodal.css';
import Usercontext from '../../Usercontext';
import axios from 'axios';
import FollowButton from '../Follow/Follow';
import Followingpostmodal from './Followingpostmodal';

const dummyProfileImage = 'https://via.placeholder.com/40';

const Followingmodal = ({ show, onHide, following }) => {
  const user = useContext(Usercontext);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(dummyProfileImage);
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [MypostlistOn, setMypostlistOn] = useState({ show: false, userId: null });



  useEffect(() => {
    const fetchFollowingProfiles = async () => {
      const profiles = [];

      for (const followingId of following) {
        try {
          const response = await axios.get(`http://localhost:8080/web/members/${followingId}`);
          const result = response.data;
          if (result.status === "success") {
            profiles.push({
              id: followingId,
              name: result.data.nickName,
              profileImage: result.data.attachedFiles[0].filepath,
            });
          }
        } catch (error) {
          // 에러 처리
        }
      }
      setFollowingProfiles(profiles);
    };

    fetchFollowingProfiles();
  }, [following]);

  return (
    <Modal show={show} onHide={onHide} dialogClassName="FollowingModal-custom-modal">
      <Modal.Header closeButton className="FollowingModal-border-0">
        <div className="FollowingModal-modal-title-box">
          <Modal.Title className="FollowingModal-modal-title">팔로잉 목록</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="FollowingModal-modal-body">
        <ul className="list-unstyled">
          {followingProfiles.map((profile, index) => (
            <li key={index} className="mb-2 following-item">
              <div className="d-flex align-items-center">
                <img
                  src={profile.profileImage || dummyProfileImage}
                  alt="Profile"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div className="FollowingModal-ms-3">
                  <FollowButton userId={profile.id} />
                </div>
                <div className="Followingmodalcursor" onClick={() => setMypostlistOn({ show: true, userId: profile.id })}>
                  <span>{profile.name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
      {/* Followingpostmodal 컴포넌트를 팔로잉 목록의 반복문 바깥으로 이동 */}
      <Followingpostmodal
        userId={MypostlistOn.userId}
        following={following}
        show={MypostlistOn.show}
        onHide={() => setMypostlistOn({ show: false, userId: null })}
      />
    </Modal>
  );
};

export default Followingmodal;