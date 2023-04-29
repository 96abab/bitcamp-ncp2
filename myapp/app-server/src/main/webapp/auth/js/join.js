showInput();
// getClients();

function showInput() {
  let el = document.querySelectorAll(".input");
  for (let e of el) {
    e.classList.remove("invisible");
  }

  el = document.querySelectorAll(".edit");
  for (let e of el) {
    e.classList.add("invisible");
  }
}

function showEdit() {
  let el = document.querySelectorAll(".input");
  for (let e of el) {
    e.classList.add("invisible");
  }

  el = document.querySelectorAll(".edit");
  for (let e of el) {
    e.classList.remove("invisible");
  }
}

// function getClients(keyword) {
//   let qs = "";
//   if (keyword) {
//     qs = `?keyword=${keyword}`;
//   }

//   fetch("../clients" + qs)
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       document.querySelector("#hangang-table > tbody").innerHTML =
//         templateEngine(result.data);
//     });
// }


// function getClient(e) {
//   let no = e.currentTarget.getAttribute("data-no");

//   fetch("../clients/" + no)
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       if (result.status == "failure") {
//         alert("회원을 조회할 수 없습니다.");
//         return;
//       }

//       let client = result.data;
//       document.querySelector("#f-no").value = client.no;
//       document.querySelector("#f-name").value = client.name;
//       document.querySelector("#f-email").value = client.email;
//       document.querySelector("#f-tel").value = client.tel;
//       document.querySelector("#f-nickname").value = client.nickName;
//       document.querySelector("#f-introduce").value = client.introduce;
//       document.querySelector("#f-hobby").value = client.hobby;
//       document.querySelector("#f-createdDate").innerHTML = client.createdDate;

//       showEdit();

//       const modal = new bootstrap.Modal("#hangangModal", {});
//       modal.show();
//     });
// }

document.querySelector("#btn-regist").onclick = () => {
  const form = document.querySelector("#hangang-form");
  const formData = new FormData(form);

  let json = JSON.stringify(Object.fromEntries(formData));

  fetch("../members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
       
        location.reload();
      } else {
        alert("입력 실패!");
        console.log(result.data);
      }
    })
    .catch((exception) => {
      alert("입력 중 오류 발생!");
      console.log(exception);
    });
};
document.querySelector("#btn-cancel").onclick = () => {
  showInput();
};
// document.querySelector("#btn-update").onclick = () => {
//   const form = document.querySelector("#hangang-form");
//   const formData = new FormData(form);

//   let json = JSON.stringify(Object.fromEntries(formData));

//   fetch("../clients/" + document.querySelector("#f-no").value, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: json,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       if (result.status == "success") {
//         alert("변경 했습니다.");
//         location.reload();
//       } else {
//         alert("변경 실패!");
//         console.log(result.data);
//       }
//     })
//     .catch((exception) => {
//       alert("변경 중 오류 발생!");
//       console.log(exception);
//     });
// };

// document.querySelector("#btn-delete").onclick = () => {
//   fetch("../clients/" + document.querySelector("#f-no").value, {
//     method: "DELETE",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       if (result.status == "success") {
//         location.reload();
//       } else {
//         alert("회원 삭제 실패!");
//       }
//     })
//     .catch((exception) => {
//       alert("회원 삭제 중 오류 발생!");
//       console.log(exception);
//     });
// };


