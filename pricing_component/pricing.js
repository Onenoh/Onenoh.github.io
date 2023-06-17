let checkBox = document.querySelector('#toggle-switch');
let annualPrices = document.querySelectorAll('.annual-price');
let monthlyPrices = document.querySelectorAll('.monthly-price');

checkBox.addEventListener('change', function() {
  if (checkBox.checked) {
    annualPrices.forEach(amount => amount.style.display = 'flex');
    monthlyPrices.forEach(amount => amount.style.display = 'none');
  } else {
    annualPrices.forEach(amount => amount.style.display = 'none');
    monthlyPrices.forEach(amount => amount.style.display = 'flex');
  }
});
