import React, { useEffect,useState ,useContext} from 'react';
import Intromodal from './Intromodal';
import { Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/Myintro.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Usercontext from '../../Usercontext';


const Myintro = () => {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [interest, setInterest] = useState("");
  const [hobby, setHobby] = useState("");
  const [image,setImage] = useState("");
  const [IntromodalOn, setIntromodalOn] = useState(false);
  const [createdDate, setCreatedDate] = useState([]);
  const user = useContext(Usercontext);
 
  const fetchUserData = () => {
    if (user.loggedIn) {
      axios
        .get(`http://localhost:8080/web/members/${user.no}`)
        .then((response) => {
          return response.data;
        })
        .then((result) => {
          if (result.status === "success") {
            setName(result.data.name);
            setNickName(result.data.nickName);
            setIntroduce(result.data.introduce);
            setInterest(result.data.interest);
            setHobby(result.data.hobby);
            setCreatedDate(result.data.createdDate);
            setImage(result.data.attachedFiles[0].filepath);
          } else {
          }
        })
        .catch((error) => {
          // 에러 처리
        });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const defaultProfile = "/img/defaultprofile.jpg";
  return (
    <>
      <Intromodal show={IntromodalOn} onHide={() => setIntromodalOn(false)} onUpdate={fetchUserData} />

      <div className="intro-wrap">

        <div className="intro-title">
          <span>내 소개</span>
        </div>
        <div className="intro-edit-btn">
          <button className="intro-modal" onClick={() => setIntromodalOn(true)}>수정</button>
        </div>
        <div className="line"></div>
        <div className="intro-img">
        <img src={image ? image : defaultProfile} alt="프로필 이미지" />
        </div>
        
        <div className="intro-write-wrap">
          <span>이름</span>
          <div className="intro-name">
        {name}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>닉네임</span>
          <div className="intro-nick">
            {nickName}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>소개글</span>
          <div className="intro-intro">
            {introduce}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>관심분야</span>
          <div className="intro-inter">
          {interest}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>취미</span>
          <div className="intro-hobby">
            {hobby}
          </div>
        </div>
        <div className="intro-write-wrap">
          <span>가입일</span>
          <div className="intro-date">
            {createdDate}
          </div>
        </div>

      </div>
    </>
  )
}


export default Myintro;