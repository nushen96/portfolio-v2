const getAbsolutePosition = (element) => {
  const currentPosition = window.scrollY;
  return currentPosition + element.getBoundingClientRect().top;
};

const scrollSmoothlyTo = (element, scrollingDuration = 500) => {
  const targetPosition = getAbsolutePosition(element);
  const currentPosition = window.scrollY;
  let start = null;
  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    let progress = currentTime - start;
    if (currentPosition < targetPosition) {
      window.scrollTo(
        0,
        ((targetPosition - currentPosition) * progress) / scrollingDuration +
          currentPosition
      );
    } else {
      window.scrollTo(
        0,
        currentPosition -
          ((currentPosition - targetPosition) * progress) / scrollingDuration
      );
    }

    if (progress < scrollingDuration) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
    }
  });
};

function areMotionsReduced() {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery && mediaQuery.matches;
}

if (!areMotionsReduced()) {
  const anchorLinks = document.querySelectorAll("a[href^='#']");
  anchorLinks.forEach((anchorLink) => {
    anchorLink.addEventListener("click", (e) => {
      e.preventDefault();
      const anchor = anchorLink.getAttribute("href");
      const targetElement = document.querySelector(anchor);
      scrollSmoothlyTo(targetElement);
    });
  });
}

function toggleActionButton() {
  let elem = document.getElementById("action-button");
  if (elem.classList.contains("action-button--open")) {
    elem.classList.remove("action-button--open");
  } else {
    elem.classList.add("action-button--open");
  }
}

window.onscroll = () => {handleStickyNavigation()}

function handleStickyNavigation() {
  const currentPosition = window.scrollY;
  const navbar = document.querySelector('.navigation')
  if(currentPosition>0) {
    navbar.classList.add("sticky-navigation")
  } else {
    navbar.classList.remove("sticky-navigation")
  }
}
