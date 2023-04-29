document.querySelector('input[name="email"]').value = getCookie('email');

document.querySelector('#btn-login').onclick = () => {
 
  if (document.querySelector('input[type="checkbox"]:checked') != null) {
    setCookie('email', document.querySelector('input[name="email"]').value, 60 * 60 * 24 * 7);
  } else {
	  setCookie('email', '', 0);
  }
	
  const form = document.querySelector('#login-form');
  const formData = new FormData(form);
  
  fetch("login", {
    method: "post",
    body: formData
  })
  .then(response => {
    return response.json();

  })
  .then(result => {
    if (result.status == 'success') {
      location.href = '../';

    } else {
      alert('로그인 실패!');
      document.querySelector('input[name="email"]').value = "";
      document.querySelector('input[name="password"]').value = "";
    }
  })
  .catch(exception => {
    alert("로그인 오류!");
    console.log(exception);
  });
};

function getCookie(cookieName){
    var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookieName)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
}
 
function setCookie(cookieName, cookieValue, cookieMaxAge, cookiePath, cookieDomain, cookieSecure){
    var cookieText=encodeURIComponent(cookieName)+'='+encodeURIComponent(cookieValue);
    cookieText+=(cookieMaxAge ? '; max-age='+cookieMaxAge : '');
    cookieText+=(cookiePath ? '; path='+cookiePath : '');
    cookieText+=(cookieDomain ? '; domain='+cookieDomain : '');
    cookieText+=(cookieSecure ? '; secure' : '');
    document.cookie=cookieText;
}