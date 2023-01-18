
import Notiflix from "notiflix";


const formEl = document.querySelector(".form")
const buttonEl = document.querySelector("button")
const delayEl = document.querySelector("delay")
const amountEl = document.querySelector("amount")


formEl.addEventListener("submit", startCreatePromise)

function startCreatePromise(e) {
  e.preventDefault()
  const delay = +e.target.elements.delay.value
  const amount = +e.target.elements.amount.value
  const step = +e.target.elements.step.value
  for (i = 0; i < amount; i++){
    
  createPromise(i+1, delay + step * i)
    .then(data => Notiflix.Notify.success(`Fulfilled promise ${data.position} in ${data.delay} `))
    .catch(data => Notiflix.Notify.failure(`Rejected promise ${data.position} in ${data.delay} `))
  }
  
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;


     
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
    },delay)
    
    

  })
    }
    