const spinnerBtn = document.querySelector('.spinnerBtn');

spinnerBtn.addEventListener('click', onSpinnerBtnClick);

function onSpinnerBtnClick(e) {
  loaderSpinnerToggle();
}

export default function loaderSpinnerToggle() { 
  document.querySelector('.loader').classList.toggle("is-open");
  document.body.classList.toggle("modal-is-open");
}