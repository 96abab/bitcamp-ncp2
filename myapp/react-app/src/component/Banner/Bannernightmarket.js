import './css/Bannernightmarket.css';
import React, { useEffect, useState } from 'react';

function Bannernightmarket() {
  const [bgImageIndex, setBgImageIndex] = useState(0); // State to keep track of current background image index
  const bgImages = ['https://cdn.discordapp.com/attachments/1080021402117226547/1100609207876722688/fire-banner.png?width=729&height=709',
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

      const bannernightmarketText = document.querySelector("h1");
      const bannernightmarketText2 = document.querySelector("p");
      const bannernightmarketText3 = document.querySelector(".a");
      if (value > 150) {
        bannernightmarketText.style.animation = "disappear 1s ease-out forwards";
        bannernightmarketText2.style.animation = "disappear 1.2s ease-out forwards";
        bannernightmarketText3.style.animation = "disappear 1.5s ease-out forwards";
      } else {
        bannernightmarketText.style.animation = "slide 1s ease-out";
        bannernightmarketText2.style.animation = "slide 1.2s ease-out";
        bannernightmarketText3.style.animation = "slide 1.5s ease-out";
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
        className="bannernightmarket"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
          backgroundSize: '750px 630px',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-out',
         }}
      >
        <div className="bannernightmarket-text">
          <h1>새로운 경험, 기억<br />HANGANG</h1>
          <p>HANGANG으로 간편하게 경험하세요.</p>
          <a href="#" className="a">자세히 알아보기</a>
        </div>
      </section>
    </div>
  );
}

export default Bannernightmarket;