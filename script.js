const BODY = document.querySelector("body");
const LOGO = document.querySelector(".header-logo");
const FOOTER_INPUT = document.querySelector(".footer-input");
const FOOTER_BUTTON = document.querySelector(".footer-button");
const FOOTER_FORM = document.querySelector(".footer-form");
const POPUP = document.querySelector(".popup");
const POPUP_SUCCESS = document.querySelector(".popup-success");
const POPUP_FAIL = document.querySelector(".popup-fail");
const POPUP_BUTTON = document.querySelector(".popup-button");
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const endData = new Date("Dec 31, 2022 23:59:59").getTime();
const startData = new Date("Dec 31, 2021 20:59:59").getTime();

function timer() {
  let currentTime = startData;
  let result = setInterval(function () {
    currentTime = currentTime + 1000;
    if (currentTime <= endData) {
      let data = setInterval(function () {
        let timesRest = endData - currentTime;
        if (timesRest >= 0) {
          let days = Math.floor(timesRest / (1000 * 60 * 60 * 24));
          let hours = Math.floor((timesRest % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let mins = Math.floor((timesRest % (1000 * 60 * 60)) / (1000 * 60));
          let secs = Math.floor((timesRest % (1000 * 60)) / 1000);

          document.querySelector(".main-countdown__item-days").innerHTML = days;
          document.querySelector(".main-countdown__item-hours").innerHTML = ("0" + hours).slice(-2);
          document.querySelector(".main-countdown__item-minutes").innerHTML = ("0" + mins).slice(-2);
          document.querySelector(".main-countdown__item-seconds").innerHTML = ("0" + secs).slice(-2);
        } else {
          clearInterval(data);
        }
      }, 1000);
    } else {
      clearInterval(result);
      alert("Happy New Year!! =))");
    }
  }, 1000);
}
timer();

LOGO.addEventListener("click", () => {
  location.reload();
});

function validateEmail(value) {
  return EMAIL_REGEXP.test(value);
}
FOOTER_FORM.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    if (validateEmail(FOOTER_INPUT.value)) {
      FOOTER_INPUT.style.borderColor = "green";
      let formData = new FormData(FOOTER_FORM);
      await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: formData,
      });
      POPUP_SUCCESS.classList.add("open");
      FOOTER_FORM.reset();
    } else {
      FOOTER_INPUT.style.borderColor = "red";
    }
  } catch (e) {
    POPUP_FAIL.classList.add("open");
    console.error(e);
  }
});

POPUP.addEventListener("click", () => {
  if (document.querySelector(".popup").classList.contains("open")) {
    POPUP.classList.remove("open");
  }
});
