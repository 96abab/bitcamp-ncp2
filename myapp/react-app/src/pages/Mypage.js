import React, { useState } from 'react';
import axios from "axios";
import './css/Mypage.css';
import '../index.css';
import Header from '../component/Header/Header';
import Myintro from '../component/Mypage/Myintro';
import Mypagebox from '../component/Mypage/Mypagebox';
import { Link } from 'react-router-dom';


const Mypage = () => {


  return (

    <div className='Mypage-background-box'>
      <Myintro />
      <Mypagebox />
    </div>

  );
}
export default Mypage;