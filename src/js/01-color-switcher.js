function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startEl = document.querySelector("[data-start]")
const stopEl = document.querySelector("[data-stop]")
const bodyEl = document.querySelector("body")
let intervalId = null

function onChangeBgColor() {
    startEl.setAttribute("disabled", "")

    intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)
}
startEl.addEventListener("click", onChangeBgColor)


function onStopChangeBgColor() {
    startEl.removeAttribute("disabled")
    clearInterval(intervalId)
}
stopEl.addEventListener ("click", onStopChangeBgColor)
