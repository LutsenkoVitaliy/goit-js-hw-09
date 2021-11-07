import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[data-firstDelay]'),
  step: document.querySelector('[data-delayStep]'),
  amount: document.querySelector('[data-amount]')
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = Number(refs.delay.value);
  const stepDelay = Number(refs.step.value);
  let delay = firstDelay;
  for (let i = 0; i <= refs.amount.value; i++) {
    createPromise(i, delay);
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