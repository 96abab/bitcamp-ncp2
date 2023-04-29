import React, { useState } from 'react';
import gsap from 'gsap';
import './css/Reservation.css';
import Header from '../component/Header/Header';

const images = [
  'http://tbxctpxzerdz16840769.cdn.ntruss.com/gallery/2d844576-6b23-4752-b283-5407409427eb?type=h&h=800&ttype=jpg',
  'https://kr.object.ncloudstorage.com/hangang-bucket/gallery/2e78691b-32b1-4e48-89f5-d98596b4a0e4'
];

const Reservation = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);

    const items = document.querySelectorAll('.Reservation-item');
    items.forEach((item, i) => {
      if (index === i) return;
      item.hovered = false;
    });

    gsap.to(items, {
      width: (item) => {
        return item.hovered ? '25vw' : '10vw';
      },
      duration: 2,
      ease: 'elastic(1, .6)'
    });

    const item = items[index];
    item.hovered = true;
    gsap.to(item, {
      width: '42vw',
      duration: 2.5,
      ease: 'elastic(1, .3)'
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);

    const items = document.querySelectorAll('.Reservation-item');
    items.forEach((item) => {
      item.hovered = false;
    });

    gsap.to(items, {
      width: '25vw',
      duration: 2,
      ease: 'elastic(1, .6)'
    });
  };

  return (
    <>
      <div className='Reservation-body'>
        <div className="Reservation-group">
          {images.map((image, index) => (
            <div
              key={index}
              className="Reservation-item"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: '75vh',
                margin: '1vw',
                borderRadius: '3vw',
                display: 'inline-block',
                cursor: 'pointer',
                width: hoveredIndex === index ? '42vw' : '25vw'
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {index === 0 && <div className="Reservation-item-text">CRUISE</div>}
              {index === 1 && <div className="Reservation-item-text">WATER TAXI</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reservation;