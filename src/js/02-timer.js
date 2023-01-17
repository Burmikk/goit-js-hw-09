import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
require("flatpickr/dist/themes/dark.css");


const inputEl = document.querySelector("#datetime-picker")
const btnStartEl = document.querySelector("[data-start]")
const btnStopEl = document.querySelector("[data-stop]")
const secondsEl = document.querySelector("[data-seconds]")
const minutesEl = document.querySelector("[data-minutes]")
const hoursEl = document.querySelector("[data-hours]")
const daysEl = document.querySelector("[data-days]")

let futureTime
let changeTimeInterval

btnStartEl.setAttribute("disabled", "")

// Опции которые передаются в кадендарь
const options = {
  
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
          
        btnStartEl.setAttribute("disabled", "")
        btnStartEl.classList.remove("activ-green")

          return Notiflix.Notify.failure("Please choose a date in the future");
          

      } else {
          btnStartEl.removeAttribute("disabled")
        btnStartEl.classList.add("activ-green")
      
            futureTime = selectedDates[0]
      }
      
      
  },
};

// Вызов библиотеки чтоб в инпуте появился календарь
flatpickr(inputEl, options)

function onCountTime() {
    const deltaTime = futureTime - new Date()
    const { days, hours, minutes, seconds } = convertMs(deltaTime)
    
    secondsEl.textContent = addLeadingZero(seconds)
    minutesEl.textContent = addLeadingZero(minutes)
    hoursEl.textContent = addLeadingZero(hours)
    daysEl.textContent = addLeadingZero(days)
    if (days === 0  && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(changeTimeInterval)
       
        changeStyleIfClickStop()


        
    }
}

btnStartEl.addEventListener("click", () => {
    if (futureTime <= new Date()) {
        btnStartEl.classList.remove("activ-green")
        btnStartEl.setAttribute("disabled", "")
        return Notiflix.Notify.failure("Please choose a date in the future");
    }

    changeTimeInterval = setInterval(onCountTime, 1000)

    inputEl.setAttribute("disabled", "")
    btnStartEl.setAttribute("disabled", "")
    btnStopEl.removeAttribute("disabled")
    btnStartEl.classList.remove("activ-green")
    btnStopEl.classList.add("activ-red")
})




btnStopEl.addEventListener("click", () => {

    clearInterval(changeTimeInterval)
    secondsEl.textContent = "00"
    minutesEl.textContent = "00"
    hoursEl.textContent = "00"
    daysEl.textContent = "00"
    
    changeStyleIfClickStop()

})


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
    
}

// Функция которая добавляет 0 если число состоит из одного символа
function addLeadingZero(value) {
    return String(value).padStart(2, "0")

}

function changeStyleIfClickStop() {
    btnStopEl.setAttribute("disabled", "")
    btnStopEl.classList.remove("activ-red")
     inputEl.removeAttribute("disabled")
}