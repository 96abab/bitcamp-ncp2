import React, { useState, useEffect } from 'react';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Mypage from './pages/Mypage';
import Gallery from './pages/Gallery';
import Reservation from './pages/Reservation';
import Festival from './pages/Festival';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Usercontext, { initialUser } from './Usercontext';
import axios from "axios";
import Header from './component/Header/Header';
import Peak from './component/Festival/Peak';
import Dron from './component/Festival/Dron';
import Firework from './component/Festival/Firework';
import Nightmarket from './component/Festival/Nightmarket';
import Footer from './component/Footer/Footer';
import Membermanagement from './pages/Membermanagement';
import Qna from './pages/Qna';


const HANGANG = () => {
  const [user, setUser] = useState(initialUser);
  const [image, setImage] = useState("");
  const [nickName, setNickname] = useState("");
  const [no, setNo] = useState("");

  // fetchData 함수에서 전역 상태를 업데이트하세요
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/web/auth/user");
      const result = response.data;
      // console.log(response.data.data);
      if (result.status === "success") {
        let login = document.getElementById("login");
        login.style.display = "none";
        let logout = document.getElementById("logout");
        logout.style.display = "";
        let mypage = document.getElementById("mypage");
        mypage.style.display = "";
        let profileimg = document.getElementById("main-profile-img");
        profileimg.style.display = "";

        setUser({
          no: result.data.no,
          name: result.data.name,
          email: result.data.email,
          nickName: result.data.nickName,
          tel: result.data.tel,
          hobby: result.data.hobby,
          introduce: result.data.introduce,
          interest: result.data.interest,
          createdDate: result.data.createdDate,
          loggedIn: true

        });


      } else {
        let login = document.getElementById("login");
        login.style.display = "";
        let logout = document.getElementById("logout");
        logout.style.display = "none";
        let mypage = document.getElementById("mypage");
        mypage.style.display = "none";
        let profileimg = document.getElementById("main-profile-img");
        profileimg.style.display = "none";

        setUser(initialUser);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserData = () => {
    if (user.loggedIn) {
      axios
        .get(`http://localhost:8080/web/members/${user.no}`)
        .then((response) => {
          return response.data;
        })
        .then((result) => {
          if (result.status === "success") {
            setNo(result.data.no);
            setNickname(result.data.nickName);
            setImage(result.data.attachedFiles[0].filepath);

          } else {
          }
        })
        .catch((error) => {
          // 에러 처리
        });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);


  const fetchMemberData = () => {

    axios
      .get("http://localhost:8080/web/members")
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((result) => {
        if (result.status === "success") {
          // setNickname(result.data.nickName);
          setImage(result.data.attachedFiles[0].filepath);
        } else {
        }
      })
      .catch((error) => {
        // 에러 처리
      });

  };

  useEffect(() => {
    fetchMemberData();
  }, [user]);

  return (
    <Usercontext.Provider value={user}>
      <Header image={image} nickName={nickName} no={no} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Festival" element={<Festival />} />
        <Route path="/Peak" element={<Peak />} />
        <Route path="/Dron" element={<Dron />} />
        <Route path="/Firework" element={<Firework />} />
        <Route path="/Nightmarket" element={<Nightmarket />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Membermanagement" element={<Membermanagement />} />
        <Route path="/Qna" element={<Qna />} />


      </Routes>
      <Footer />
    </Usercontext.Provider>
  );
};

export default HANGANG;