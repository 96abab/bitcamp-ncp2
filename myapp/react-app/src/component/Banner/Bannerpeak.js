import './css/Bannerpeak.css';
import React, { useEffect, useState } from 'react';

function Bannerpeak() {
  const [bgImageIndex, setBgImageIndex] = useState(0); // State to keep track of current background image index
  const bgImages = ['https://media.discordapp.net/attachments/1080021402117226547/1100358858058252390/peak-banner.jpg?width=729&height=729',
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

      const bannerpeakText = document.querySelector("h1");
      const bannerpeakText2 = document.querySelector("p");
      const bannerpeakText3 = document.querySelector(".a");
      if (value > 150) {
        bannerpeakText.style.animation = "disappear 1s ease-out forwards";
        bannerpeakText2.style.animation = "disappear 1.2s ease-out forwards";
        bannerpeakText3.style.animation = "disappear 1.5s ease-out forwards";
      } else {
        bannerpeakText.style.animation = "slide 1s ease-out";
        bannerpeakText2.style.animation = "slide 1.2s ease-out";
        bannerpeakText3.style.animation = "slide 1.5s ease-out";
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
        className="bannerpeak"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-out',
         }}
      >
        <div className="bannerpeak-text">
          <h1>새로운 경험, 기억<br />HANGANG</h1>
          <p>HANGANG으로 간편하게 경험하세요.</p>
          <a href="#" className="a">자세히 알아보기</a>
        </div>
      </section>
    </div>
  );
}

export default Bannerpeak;