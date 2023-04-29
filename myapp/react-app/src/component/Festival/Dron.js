import Bannerdron from '../Banner/Bannerdron';
import "./css/Dron.css";
import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from "axios";


const Dron = () => {
  const [images, setImages] = useState([]);
  const mapRef = useRef(null);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/web/boards/dron')
      .then((response) => response.data)
      .then((result) => {
        if (result.status === 'success') {
          const imageList = result.data.map(item => item.attachedFiles[0].filepath);
          setImages(imageList);
        } else {
          // handle error
        }
      })
      .catch((error) => {
        // handle error
      });
  };


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    axios
      .get('http://localhost:8080/web/members/allMember')
      .then((response) => response.data)
      .then((result) => {
        if (result.status === 'success') {
          setMembers(result.data);
          console.log(result.data);
        } else {
          // handle error
        }
      })
      .catch((error) => {
        // handle error
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5291852, 127.0697446),
        zoom: 16
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      // 마커 생성 및 위치 설정
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5291852, 127.0697446),
        title: "Marker"
      });

      // 마커를 지도에 추가
      marker.setMap(map);
    }
  }, []);

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={`image-${index}`} className="dron-image-cell" >
        <img
          className="dron-image"
          src={image}
          alt={`Image ${index}`}
        />
      </div >
    ));
  };

  return (

    <div >
      <Bannerdron />
      <div className='dron-wrap'>
        <div className='dron-main'>
          <div className='dron-poster-img'></div>
          <div className='dron-img1'></div>
          <div className='dron-img2'></div>
          <div className='dron-text1'>
            <h1>2023 한강 불빛 공연(드론 라이트 쇼)</h1>
          </div>
          <div className='dron-text2'>
            <h5>한강의 밤하늘을 도화지 삼아 서울의 다양한 매력을 그려낸</h5>
            <h5>드론 라이트 쇼!</h5>
          </div>
          <div className='dron-img3-wrap'>
            <div className='dron-img3'></div>
            <div className='dron-img4'></div>
            <div className='dron-text3'>
              <h6>장소</h6>
              <h6><span>뚝섬한강공원</span></h6>
              <h6>수변무대</h6>
            </div>
            <div className='dron-text4'>
              <h6>일정</h6>
              <h6>2023년</h6>
              <h6><span>4월29일(토)</span></h6>
              <h6><span>5월1일(월)</span></h6>
              <h6><span>5월5일(금)</span></h6>
              <h6><span>5월6일(토)</span></h6>
              <h6>20:00~20:10</h6>
              <h6>각 1회 공연</h6>
            </div>
            <div className='dron-img5'></div>
          </div>
          <div className='dron-img6-wrap'>
            <div className="dron-img6"></div>
            <div className="dron-img7"></div>
            <div className="dron-img8"></div>
            <div className="dron-img12"></div>
            <div className='dron-img9'></div>
            <div className='dron-img10'></div>
            <div className='dron-img11'></div>
            <div className='dron-text5'>
              <h6>※ 어린이날 기념 축하 프로그램</h6>
              <h6>① 드론 에어쇼 : 2023년 5월 5일(금) 14:00 ~ 14:05</h6>
              <h6>② 찾아가는 드론 스쿨 : 2023년 5월 5일(금) 13:00 ~ 15:00 / 16:00 ~ 18:00 (매 시간별 40분씩 진행)</h6>
            </div>
          </div>
        </div>
        <div className="dron-map-box">
          <div className="dron-map" ref={mapRef} ></div>
        </div>
        <div className='dron-image-container-wrap'>
          <div className="dron-image-container" style={{ overflowY: "scroll", maxHeight: "500px" }}>
            <div className="dron-image-grid" style={{ display: "flex", flexWrap: "wrap", overflowY: "auto", alignItems: "flex-start", maxHeight: "900px" }}>
              {renderImages()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dron;