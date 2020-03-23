export { Observer, Subscription, Scheduler, time, pi };

const Observer = 'Observer ';
const Subscription = 'Subscription ';
const Scheduler = 'Schedulers ';

let time = new Date();
setInterval(() => {
  time = new Date();
}, 1000);

let pi = Math.PI;
