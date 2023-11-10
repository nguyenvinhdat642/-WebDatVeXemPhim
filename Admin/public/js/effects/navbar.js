// MAIN NAVIGATION BAR
const mainHeader = document.querySelector(".main-header");
const navBtn = document.querySelector(".btn-mobile-nav");
navBtn.addEventListener("click", () => {
  mainHeader.classList.toggle("nav-open");
});
// ----------------------------