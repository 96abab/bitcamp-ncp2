import React from 'react';
import '../index.css';
import Header from '../component/Header/Header';
import Banner from '../component/Banner/Banner';
import Content from '../component/Content/Content';
import Benefits from '../component/Benefits/Benefits';


const Home = () => {
  return (
    <div>
      <Banner />
      <Content />
      <Benefits />
      
    </div>
  );
};

export default Home;
