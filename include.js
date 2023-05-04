function includeHTML() {
  let z, elmnt, file, xhttp;

  z = document.getElementsByTagName("*");

  for (let i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("data-include");

    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("data-include");
          includeHTML();
        } //if
      }; //onreadystatechange

      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    } //if - file
  } //for
} //includeHTML

/* ✨ 실행 */
window.addEventListener("DOMContentLoaded", () => {
  includeHTML();
});

const idKey = "USER-ID";
const loginInfo = localStorage.getItem(idKey);
console.log("localStorage: ", loginInfo);
if (loginInfo != null) {
  console.log("저장된 값 있음");
  document.getElementById("agentName").innerText = loginInfo;
} else {
  document.getElementById("agentName").innerText =
    "저장된 아이디 값이 없습니다.";
  document.getElementById("btn").disabled = true; //값 없는 경우 삭제 버튼 비활성
}
function logOut() {
  localStorage.removeItem(idKey);
  console.log("저장된 아이디값이 삭제 되었습니다.");
}

function profile() {
  let indexLink = "src/pages/auth/profile.html";
  console.log("profile");
  window.location.href = indexLink;
}
const tabItem = document.querySelectorAll(".tab_item");
const tabInner = document.querySelectorAll(".tab_inner");

tabItem.forEach((tab, idx) => {
  tab.addEventListener("click", function () {
    tabInner.forEach((inner) => {
      inner.classList.remove("active");
    });

    tabItem.forEach((item) => {
      item.classList.remove("active");
    });

    tabItem[idx].classList.add("active");
    tabInner[idx].classList.add("active");
  });
});

// variables
var accordionBtn = document.querySelectorAll(".headTitle");
var allTexts = document.querySelectorAll(".text");
var accIcon = document.querySelectorAll(".accIcon");

// event listener
accordionBtn.forEach(function (el) {
  el.addEventListener("click", toggleAccordion);
});

// function
function toggleAccordion(el) {
  var targetText = el.currentTarget.nextElementSibling.classList;
  var targetAccIcon = el.currentTarget.children[0];
  var target = el.currentTarget;

  if (targetText.contains("show")) {
    targetText.remove("show");
    targetAccIcon.classList.remove("anime");
    target.classList.remove("accordionTitleActive");
    target.classList.remove("headTitleActive");
  } else {
    accordionBtn.forEach(function (el) {
      el.classList.remove("accordionTitleActive");
      el.classList.remove("headTitleActive");
      allTexts.forEach(function (el) {
        el.classList.remove("show");
      });

      accIcon.forEach(function (el) {
        el.classList.remove("anime");
      });
    });

    targetText.add("show");
    target.classList.add("accordionTitleActive");
    target.classList.add("headTitleActive");
    targetAccIcon.classList.add("anime");
  }
}

function selectAll(selectAll) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}
