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

mobiscroll.setOptions({
  theme: "ios",
  themeVariant: "light",
});

var inst = mobiscroll.select("#demo-country-picker", {
  display: "anchored",
  filter: true,
  itemHeight: 40,
  renderItem: function (item) {
    return (
      '<div class="md-country-picker-item">' +
      '<img class="md-country-picker-flag" src="https://img.mobiscroll.com/demos/flags/' +
      item.data.value +
      '.png" />' +
      item.display +
      "</div>"
    );
  },
});

mobiscroll.util.http.getJson(
  "https://trial.mobiscroll.com/content/countries.json",
  function (resp) {
    var countries = [];
    for (var i = 0; i < resp.length; ++i) {
      var country = resp[i];
      countries.push({ text: country.text, value: country.value });
    }
    inst.setOptions({ data: countries });
  }
);
