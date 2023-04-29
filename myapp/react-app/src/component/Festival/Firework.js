import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from "axios";
import './css/Firework.css';
import Bannerfirework from '../Banner/Bannerfirework';

const Firework = () => {
  const mapRef = useRef(null);
  const [images, setImages] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/web/boards/firework')
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
        center: new naver.maps.LatLng(37.52631590835359, 126.93565656270454),
        zoom: 16
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      // 마커 생성 및 위치 설정
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.52631590835359, 126.93565656270454),
        title: "Marker"
      });

      // 마커를 지도에 추가
      marker.setMap(map);
    }
  }, []);

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={`image-${index}`} className="firework-image-cell" >
        <img
          className="firework-image"
          src={image}
          alt={`Image ${index}`}
        />
      </div >
    ));
  };

  return (

    <div>
      <Bannerfirework />
      <div className='firework-wrap'>
        <div className='firework-main'>
          <div className='fire-img1'></div>
          <div className='fire-text1'>
            <h4>서울 세계 불꽃 축제 2022</h4>&nbsp;
            <h6>바쁜 매일을 살아가는 시민의 일상에</h6>
            <h6>즐거움을 선사하기 위해</h6>
            <h6>한화그룹에서 2000년부터</h6>
            <h6>사회공헌 사업으로 꾸준히 진행해 온</h6>
            <h6>대한민국 최고의 축제입니다</h6>
          </div>
          <div className='fire-img2'></div>
          <div className='fire-text2'>
            <h6>매년 세계적인 수준의 불꽃 전문 기업들이</h6>
            <h6>초청되어 여의도의 밤 하늘을 무대로</h6>
            <h6>환상적인 불꽃 연출을 선보입니다</h6>
          </div>
          <div className='fire-img3'></div>
          <div className='fire-text3'>
            <h5>매년 100만명 이상의 시민들이 불꽃축제를 보기 위해 여의도를 방문합니다.</h5>
          </div>
          <div className='fire-img4'></div>
          <div className='fire-img5'></div>
          <div className='fire-img6'></div>
          <div className='fire-text4'>
            <h6>행사 참석 시 안전 사고에 유의하여 주시기 바라며, 안전하게 행사에 참여해 주시기 바랍니다.</h6>
            <h6>행사를 준비, 운영하는 기관도 안전사고 예방을 위한 조치 당부 드립니다.</h6>
          </div>
        </div>
        <div className="firework-map-box">
          <div className="fire-map" ref={mapRef}></div>
        </div>
        <div className='firework-image-container-wrap'>
          <div className="firework-image-container" style={{ overflowY: "scroll", maxHeight: "500px" }}>
            <div className="firework-image-grid" style={{ display: "flex", flexWrap: "wrap", overflowY: "auto", alignItems: "flex-start", maxHeight: "900px" }}>
              {renderImages()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Firework;
