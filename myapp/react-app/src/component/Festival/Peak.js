import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from "axios";
import './css/Peak.css';
import Bannerpeak from '../Banner/Bannerpeak';

const Peak = () => {
  const [images, setImages] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/web/boards/peak')
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

  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.56601488665281, 126.87762876013929),
        zoom: 16
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      // 마커 생성 및 위치 설정
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.56601488665281, 126.87762876013929),
        title: "Marker"
      });

      // 마커를 지도에 추가
      marker.setMap(map);
    }
  }, []);

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={`image-${index}`} className="peak-image-cell" >
        <img
          className="Peak-image"
          src={image}
          alt={`Image ${index}`}
        />
      </div >
    ));
  };

  return (

    <div>
      <Bannerpeak />
      <div className='peak-wrap'>
        <div className='peak-main'>
          <div className='peak-poster-img'></div>
          <div className='peak-text1'>
            <h6>난지한강공원 페스티벌</h6>
            <h6>살아있는 음악, 우리만의 뜨거운 축제</h6>
          </div>
          <div className="peak-text2">
            <h4>2023Peak Festival</h4>
          </div>
          <div className="peak-text3">
            <h6>&lt;행사 개요&gt;</h6>
          </div>
          <div className="peak-text4">
            <ul>
              <li><h6>행사 기간 : <span>2023.5.27(토)~5.28(일)12:00(관람시간 540분)</span></h6></li>
              <li><h6>예매 기간 : 2023.4.18(화)18:00~5.26(금)17:00 <span>※ 한정수량 소진시 조기 마감될 수 있습니다.</span></h6></li>
              <li><h6>행사 장소 : 난지한강공원 젊음의 광장</h6></li>
              <li><h6>출연진(4.18 라인업 기준)</h6></li>
              <h6>1. 5.27(토) 10cm, 선우정아, 소란, 아일, 최예나, 최유리, Xdinary Heroes</h6>
              <h6>2. 5.28(일) Nell, 김재환, 다섯, 로맨틱펀치, 볼빨간사춘기, 실리카겔, 이디오테잎, 터치드</h6>
            </ul>
          </div>
          <div className='peak-singer-wrap'>
            <div className="peak-singer1"></div>
            <div className="peak-singer2"></div>
            <div className="peak-singer3"></div>
            <div className="peak-singer4"></div>
            <div className="peak-singer5"></div>
            <div className="peak-singer6"></div>
          </div>
          <div className='peak-text5'>
            <h6>&lt;티켓 예매처&gt;</h6>
          </div>
          <div className='peak-text6'>
            <ul>
              <li><h6>예매오픈: <span>2023.4.18(화) 18:00</span> </h6></li>
              <li><h6>티켓 예매처(1인 4매까지 구매 가능)</h6></li>
              <ul>
                <li><h6>29cm <a href="http://www.29cm.co.kr">www.29cm.co.kr</a></h6></li>
                <li><h6>인터파크 <a href="tickets.interpark.com/goods/23004911">tickets.interpark.com/goods/23004911</a></h6></li>
                <li><h6>티켓링크 <a href="www.ticketlink.,co.kr/product/43391">www.ticketlink.,co.kr/product/43391</a></h6></li>
                <li><h6>(네이버예매) <a href="booking.naver.com/booking/12/bizes/881654">booking.naver.com/booking/12/bizes/881654</a></h6></li>
              </ul>
              <li><h6>티켓가격 : 일일권 99,000원, 양일권 139,000원 <a href="booking.naver.com/booking/12/bizes/881654">booking.naver.com/booking/12/bizes/881654</a></h6></li>
              <h6><span>*장애인, 국가유공자, 기초생활수급자 30%할인(증빙 제출)</span></h6>
            </ul>
          </div>
          <div className='peak-poster-img2'></div>
          <div classNmae='peak-poster-wrap'>
            <div className="peak-photo1"></div>
            <div className="peak-photo2"></div>
            <div className="peak-photo3"></div>
          </div>
          <div classNmae='peak-poster-wrap2'>
            <div className="peak-photo4"></div>
            <div className="peak-photo5"></div>
            <div className="peak-photo6"></div>
          </div>
        </div>
        <div className="Peak-map-box">
          <div className="peak-map" ref={mapRef} ></div>
        </div>
        <div className='peak-image-container-wrap'>
          <div className="peak-image-container" style={{ overflowY: "scroll", maxHeight: "500px" }}>
            <div className="peak-image-grid" style={{ display: "flex", flexWrap: "wrap", overflowY: "auto", alignItems: "flex-start", maxHeight: "900px" }}>
              {renderImages()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peak;