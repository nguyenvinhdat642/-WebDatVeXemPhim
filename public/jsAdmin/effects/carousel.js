// CAROUSEL SCROLL CLICK
const scrollPerClick = document
  .querySelector(".movie-card")
  .getBoundingClientRect().width;

var scrollAmount = 0;
var dot = 0;
var first = 0,
  last = 4;

const cards = document.querySelectorAll(".movies-row");
var cardContainers = Array.from(cards);
cardContainers.forEach((element) => {
  updateOverflowCard(element.children[0].children, first, last);
});

function updateDots(currentDot, nextDot) {
  currentDot.classList.remove("carousel-active");
  nextDot.classList.add("carousel-active");
}

function updateOverflowCard(cards, firstCurr, lastCurr) {
  cards[firstCurr].children[0].classList.remove("card-first");
  cards[first].children[0].classList.add("card-first");

  cards[lastCurr].children[0].classList.remove("card-last");
  cards[last].children[0].classList.add("card-last");
}

function sliderScrollLeft(slider) {
  if (scrollAmount != 0) {
    slider.scrollTo({
      top: 0,
      left: (scrollAmount -= scrollPerClick),
      behavior: "smooth",
    });

    const sliderDots = slider.querySelector(".carousel-pagination");
    const dots = Array.from(sliderDots.children);
    var currentDot = dot;
    dot -= 1;
    updateDots(dots[currentDot], dots[dot]);

    const cards = Array.from(slider.children);
    var currFirst = first;
    var currLast = last;
    first -= 1;
    last -= 1;
    updateOverflowCard(cards, currFirst, currLast);
  }
}

function sliderScrollRight(slider) {
  if (scrollAmount <= slider.scrollWidth - slider.clientWidth) {
    slider.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });

    const sliderDots = slider.querySelector(".carousel-pagination");
    const dots = Array.from(sliderDots.children);
    var currentDot = dot;
    dot += 1;
    updateDots(dots[currentDot], dots[dot]);

    const cards = Array.from(slider.children);
    updateOverflowCard(cards, first, last);
    var currFirst = first;
    var currLast = last;
    first += 1;
    last += 1;
    updateOverflowCard(cards, currFirst, currLast);
  }
}
// -----------------
