export default {
  btc: createRandomPrice(4500, 4400, 3, 10),
  eth: createRandomPrice(230, 220, 5, 15),
  users: [],
  jwt: '',
  currentuser: ''
};

function createRandomPrice(sell, purchase, percentilsLow, percentilsUp) {
  const course = [];
  const hour = 1000 * 60 * 60;
  const week = hour * 24 * 7;
  const twentyFourHours = hour * 24;
  const currentTime = new Date().getTime();
  const startDate = currentTime - week;
  let stepTime = startDate;
  while (stepTime < currentTime) {
    const step = Math.round(
      twentyFourHours / (Math.round(Math.random() * (48 - 12)) + 12)
    );
    stepTime = stepTime + step;
    let newSell =
      sell -
      (sell / 100) *
        (Math.round(Math.random() * (percentilsUp - percentilsLow)) +
          percentilsLow);
    let newPurchase =
      purchase -
      (purchase / 100) *
        (Math.round(Math.random() * (percentilsUp - percentilsLow)) +
          percentilsLow);
    course.unshift({
      sell: newSell,
      purchase: newPurchase,
      mts: stepTime
    });
  }

  return course;
}
