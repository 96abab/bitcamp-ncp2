import { Button } from "react-bootstrap";
import './css/Gallerylist.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect,useContext } from 'react';
import Gallerywriting from "./Gallerywriting";
import Gallerydetail from "./Gallerydetail";
import axios from 'axios';
import { Link } from 'react-router-dom';
import GalleryItem from "./Galleryitem";
import Usercontext from '../../Usercontext';


const Gallerylist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writingmodalOn, setwritingmodalOn] = useState(false);
  const [detailmodalOn, setdetailmodalOn] = useState(false);
  const [isCommentAddVisible, setIsCommentAddVisible] = useState(false);
  const user = useContext(Usercontext);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = () => {
    setLoading(true);
    // 데이터를 가져오는 비동기 API 호출 (예: 서버 API)
    axios
      .get("http://localhost:8080/web/boards")
      .then((response) => {
        // console.log(response.data);
        setData([...data, ...response.data.data.sort((a, b) => b.no - a.no)]); // 번호를 내림차순으로 정렬하여 데이터 업데이트
        setLoading(false);
        console.log(response);

      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때만 초기 데이터 로딩

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

  const toggleCommentAddVisibility = () => {
    setIsCommentAddVisible(!isCommentAddVisible);
  };
  const handleSearchInputChange = (event) => { // Step 2: Create an event handler to update the search query state
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="body-back">
      <div className="gall-list-wrap">
        <div className="ginput-wrap">
          <div className="ginput-data">
  
         <input
          required
          value={searchQuery}
          className="gsearch-input"
          onChange={handleSearchInputChange}/>
          <div class= "underline"></div>
          <label>#태그</label>
        </div>
        </div>

        <Gallerywriting
          show={writingmodalOn}
          onHide={() => setwritingmodalOn(false)}
        />
        {user.loggedIn ? (
          <Button
            className="Gallerylist-Button"
            onClick={() => setwritingmodalOn(true)}
          >
            Writing
          </Button>
        ) : (
          <Button
            className="Gallerylist-Button"
            onClick={() => alert("로그인을 해주세요.")}
          >
            Writing
          </Button>
        )}

      </div>
      <div className="gall-list-table-wrap">
      {filteredData.map((item) => (
            <GalleryItem key={item.no} item={item}/>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Gallerylist;