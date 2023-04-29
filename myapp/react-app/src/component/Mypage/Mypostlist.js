import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import Usercontext from "../../Usercontext";
import GalleryItem from "../Gallery/Galleryitem";
import 'bootstrap/dist/css/bootstrap.css';
import './css/Mypostlist.css';
const Mypostlist = ({ show, onHide }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writingmodalOn, setwritingmodalOn] = useState(false);
  const user = useContext(Usercontext);

  const customModalStyle = {
    position: 'fixed',
    top: '48%',
    left: '78%',
    transform: 'translate(-50%, -50%)',
  };

  useEffect(() => {
    if (user)
      fetchData();
  }, [user]); // 컴포넌트가 마운트될 때만 초기 데이터 로딩
  const fetchData = async () => {

    setLoading(true);

    const response = await axios.get(`http://localhost:8080/web/boards/user/${user.no}`)
      .then((response) => {
        console.log(response.data.data);
        setData([...data, ...response.data.data.sort((a, b) => b.no - a.no)]); // 번호를 내림차순으로 정렬하여 데이터 업데이트
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };


  const handleScroll = () => {
    // 스크롤 이벤트 핸들러
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 컴포넌트가 마운트/언마운트될 때만 스크롤 이벤트 리스너 추가/제거

  
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="Mypostlist-modal-box"
      backdrop={true}

    >
      <Modal.Body style={{ backgroundColor: "#ffffff47", borderRadius: '20px' }}>
        <div className="Mypostlist-box">
          <div className="Mypostlist-body-back">
            <div className="Mypostlist-list-table-wrap">
              {data.map((item) => (
                <GalleryItem item={item} customModalStyle={customModalStyle} style={{ borderRadius: '20px' }} />
              ))}
              {loading && <div>Loading...</div>}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>


  )
};

export default Mypostlist;