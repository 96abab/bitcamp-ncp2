fetch("auth/user")
.then((response) => {
    console.log(response);
  return response.json();

})

.then((result) => {
  if (result.status == "success") {
    document.querySelector("#username").innerHTML = result.data.name;
    document.querySelector(".logout").classList.remove("logout");
    console.log(result.data)
  } else {
    document.querySelector(".login").classList.remove("login");
  }
})
.catch((exception) => {
  alert("로그인 사용자 정보 조회 오류!");
});

function logout() {
fetch("auth/logout")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    location.reload();
  })
  .catch((exception) => {
    console.log(exception);
  });
}


const festivalDropdown = document.querySelector('#festival-dropdown');
const hotplaceDropdown = document.querySelector('#hotplace-dropdown');
const festivalMenu = document.querySelector('#festival-menu');
const hotplaceMenu = document.querySelector('#hotplace-menu');

festivalDropdown.addEventListener('click', () => {
  festivalMenu.classList.toggle('show');
});

hotplaceDropdown.addEventListener('click', () => {
  hotplaceMenu.classList.toggle('show');
});