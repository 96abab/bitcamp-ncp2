import React , {useState}from 'react';
import axios from "axios";
import './css/Mypage.css';
import '../index.css';
import Header from '../component/Header/Header';
import Myintro from '../component/Mypage/Myintro';
import Mypagebox from '../component/Mypage/Mypagebox';
import { Link } from 'react-router-dom';
import Gallerywriting from '../component/Gallery/Gallerywriting';
import Gallerylist from '../component/Gallery/Gallerylist';

const Gallery = () => {
  return (

    <div>
      <Gallerylist />
      <Gallerywriting />
    </div>
  );
}

export default Gallery;