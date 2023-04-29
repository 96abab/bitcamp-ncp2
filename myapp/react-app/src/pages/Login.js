import React, { useState, useEffect } from 'react';
import './css/Login.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    axios
      .post('http://localhost:8080/web/auth/login', formData)
      .then((response) => response.data)
      .then((result) => {
        if (result.status === 'success') {
          window.location.href = '../';
        } else {
          alert('로그인 실패!');
          setEmail('');
          setPassword('');
        }
      })
      .catch((error) => {
        alert('로그인 오류!');
        console.error(error);
      });
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1>HANGANG</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <input type="radio" name="usertype" value="member" checked className="admin" />
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          <button type="submit" id="btn-login">로그인</button>
        </form>
        <div className="signup-box">
          <p>아직 계정이 없으신가요?</p>
          <Link to="/Join" className="join">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;