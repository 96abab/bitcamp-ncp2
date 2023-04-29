import './css/Bannerfirework.css';
import React, { useEffect, useState } from 'react';

function Bannerfirework() {
  const [bgImageIndex, setBgImageIndex] = useState(0); // State to keep track of current background image index
  const bgImages = ['',
  ];

  useEffect(() => {
    // Function to change the background image index every 1 second
    const changeBgImage = () => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    };

    const intervalId = setInterval(changeBgImage, 2000); // Call changeBgImage every 1 second

    return () => {
      clearInterval(intervalId); // Cleanup the interval on unmount
    };
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    const handleScroll = () => {
      let value = window.scrollY;

      const bannerfireworkText = document.querySelector("h1");
      const bannerfireworkText2 = document.querySelector("p");
      const bannerfireworkText3 = document.querySelector(".a");
      if (value > 150) {
        bannerfireworkText.style.animation = "disappear 1s ease-out forwards";
        bannerfireworkText2.style.animation = "disappear 1.2s ease-out forwards";
        bannerfireworkText3.style.animation = "disappear 1.5s ease-out forwards";
      } else {
        bannerfireworkText.style.animation = "slide 1s ease-out";
        bannerfireworkText2.style.animation = "slide 1.2s ease-out";
        bannerfireworkText3.style.animation = "slide 1.5s ease-out";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <section
        className="bannerfirework"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-out',
         }}
      >
        <div className="bannerfirework-text">
          <h1>새로운 경험, 기억<br />HANGANG</h1>
          <p>HANGANG으로 간편하게 경험하세요.</p>
          <a href="#" className="a">자세히 알아보기</a>
        </div>
      </section>
    </div>
  );
}

export default Bannerfirework;