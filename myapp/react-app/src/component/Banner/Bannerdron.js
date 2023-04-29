import './css/Bannerdron.css';
import React, { useEffect, useState } from 'react';

function Bannerdron() {
  const [bgImageIndex, setBgImageIndex] = useState(0); // State to keep track of current background image index
  const bgImages = ['https://media.discordapp.net/attachments/1080021402117226547/1100467637160517712/image.png?width=1014&height=729',
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

      const bannerdronText = document.querySelector("h1");
      const bannerdronText2 = document.querySelector("p");
      const bannerdronText3 = document.querySelector(".a");
      if (value > 150) {
        bannerdronText.style.animation = "disappear 1s ease-out forwards";
        bannerdronText2.style.animation = "disappear 1.2s ease-out forwards";
        bannerdronText3.style.animation = "disappear 1.5s ease-out forwards";
      } else {
        bannerdronText.style.animation = "slide 1s ease-out";
        bannerdronText2.style.animation = "slide 1.2s ease-out";
        bannerdronText3.style.animation = "slide 1.5s ease-out";
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
        className="bannerdron"
        style={{
          backgroundImage: `url(${bgImages[bgImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-out',
         }}
      >
        <div className="bannerdron-text">
          <h1>새로운 경험, 기억<br />HANGANG</h1>
          <p>HANGANG으로 간편하게 경험하세요.</p>
          <a href="#" className="a">자세히 알아보기</a>
        </div>
      </section>
    </div>
  );
}

export default Bannerdron;