import Notiflix from 'notiflix';
const ref = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[data-firstDelay]'),
  step: document.querySelector('[data-delayStep]'),
  amount: document.querySelector('[data-amount]'),
  submitBtn: document.querySelector('button')
}
const firstDelay = Number(ref.delay.value);
let delay = firstDelay;
const stepDelay = Number(ref.step.value);

ref.form.addEventListener('submit', e => {
  e.preventDefault();
  for (let i = 0; i < ref.amount.value; i++) {
    createPromise(i, firstDelay)
    delay += stepDelay;
  }
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}