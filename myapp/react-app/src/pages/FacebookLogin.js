import React, { useEffect } from 'react';

const FacebookLogin = ({ onSuccess }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '2527136717427603',
        cookie: true,
        xfbml: true,
        version: 'v16.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const checkLoginState = () => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        onSuccess(response.authResponse.accessToken);
      } else {
        alert("페이스북 로그인 실패!");
      }
    });
  };

  return (
    <div
      className="fb-login-button"
      data-width=""
      data-size="medium"
      data-button-type="continue_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="false"
      data-scope="public_profile,email"
      onClick={checkLoginState}
    ></div>
  );
};

export default FacebookLogin;
