"use strict";

let currentPage = 1;
let totalPageServer;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (mosuliinfo) {
      if (mosuliinfo.status !== 200) {
        throw "error";
      }
      return mosuliinfo.json();
    })

    .then(function (mosuliinfojs) {
      const fragment = document.createDocumentFragment();

      mosuliinfojs.data.forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("li-wraper");

        let pelement = document.createElement("p");
        pelement.textContent = `${element.first_name} ${element.last_name}`;

        let imgElement = document.createElement("img");
        imgElement.src = `${element.avatar}`;

        li.appendChild(pelement);
        li.appendChild(imgElement);

        fragment.appendChild(li);
      });

      document.getElementById("users-info").innerHTML = " ";
      document.getElementById("users-info").appendChild(fragment);
      totalPageServer = mosuliinfojs.total_pages;
    })

    .catch(function (error) {
      console.log(error);
    });
}

document.getElementById("prev").addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage -= 1;
  getUsers(currentPage);
});
document.getElementById("next").addEventListener("click", function () {
  if (currentPage === totalPageServer) {
    return;
  }

  currentPage += 1;
  getUsers(currentPage);
});

getUsers(currentPage);