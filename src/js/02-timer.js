import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const refs = {
    BtnStart: document.querySelector('[data-start]'),
    day: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    dateTimePicker: document.querySelector('#datetime-picker'),
    
}
let userDate = null;
refs.BtnStart.setAttribute('disabled', true)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userDate = selectedDates[0];
      if (userDate > Date.now()) {
          refs.BtnStart.removeAttribute('disabled');
      } else {
          Notiflix.Notify.failure('❌ Please choose a date in the future'),
            refs.BtnStart.setAttribute('disabled', true)
      }  
  },
};
flatpickr(refs.dateTimePicker, options);


refs.BtnStart.addEventListener('click', () => {
    refs.BtnStart.setAttribute('disabled', true)
    refs.dateTimePicker.setAttribute('disabled', true)
    setInterval(() => {
        if (userDate <= Date.now()) return;
        const currentTime = convertMs(userDate - Date.now());
        console.log(currentTime);
        refs.day.textContent = currentTime.days;
        refs.hours.textContent = currentTime.hours;
        refs.minutes.textContent = currentTime.minutes;
        refs.seconds.textContent = currentTime.seconds;
    },1000)
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}