import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from "axios";
import './css/Nightmarket.css';
import Bannernightmarket from '../Banner/Bannernightmarket.js';

const Nightmarket = () => {
  const [images, setImages] = useState([]);
  const mapRef = useRef(null);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/web/boards/nightMarket')
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
    if (mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5287938608912, 126.9327763292809),
        zoom: 16
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      // 마커 생성 및 위치 설정
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5287938608912, 126.9327763292809),
        title: "Marker"
      });

      // 마커를 지도에 추가
      marker.setMap(map);
    }
  }, []);

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={`image-${index}`} className="nightmarket-image-cell" >
        <img
          className="nightmarket-image"
          src={image}
          alt={`Image ${index}`}
        />
      </div >
    ));
  };

  return (
    <div className='nightmarket-back'>
      <Bannernightmarket />
      <div className='nightmarket-wrap'>
        <div className='nightmarket-main'>
          <div className='nightmarket-top-img' />
          <div className='nightmarket-top-text'>
            <h5>작년 야시장 못가 봤으면 가봐!</h5>
            <h5>2023년 소중한 사람과 함께</h5>
            <h5>밤에 열렸다 아침에 사라지는 신비한</h5>
            <h5>한강 밤도깨비 야시장에 초대할께!</h5>
          </div>
          <div className='nightmarket-middle-wrap'>
            <div>
              <h4 className='nightmarket-middle-text'>날씨도 풀리는데 스트레스 풀어볼까?</h4>
            </div>
            <div className='nightmarket-middle-grid1'>
              <div className='nightmarket-middle-img1' />
              <div></div>
              <div className='nightmarket-middle-img2' />
            </div>

            <div></div>

            <div className='nightmarket-middle-grid2'>
              <div className='nightmarket-middle-img3' />
              <div></div>
              <div className='nightmarket-middle-img4' />
            </div>
          </div>
        </div>
        <div className='nightmarket-map-box'>
          <div className="nightmarket-map" ref={mapRef} ></div>
        </div>
        <div className='nightmarket-image-container-wrap'>
          <div className="nightmarket-image-container" style={{ overflowY: "scroll", maxHeight: "500px" }}>
            <div className="nightmarket-image-grid" style={{ display: "flex", flexWrap: "wrap", overflowY: "auto", alignItems: "flex-start", maxHeight: "900px" }}>
              {renderImages()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nightmarket;