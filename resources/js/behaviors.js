const getAbsolutePosition = (element) => {
    const currentPosition = window.scrollY;
    return currentPosition + element.getBoundingClientRect().top;
}

const scrollSmoothlyTo = (element, scrollingDuration=500) => {
    const targetPosition = getAbsolutePosition(element);
    const currentPosition = window.scrollY;
    let start = null;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        let progress = currentTime - start;
        if(currentPosition < targetPosition) {
            window.scrollTo(0, ((targetPosition-currentPosition)*progress/scrollingDuration)+currentPosition)
        } else {
            window.scrollTo(0, currentPosition - ((currentPosition - targetPosition) * progress / scrollingDuration));
        }

        if (progress<scrollingDuration) {
            window.requestAnimationFrame(step);
        }
        else {
            window.scrollTo(0, targetPosition);
        }
    })
}

const anchorLinks = document.querySelectorAll("a[href^='#']");
anchorLinks.forEach(anchorLink => {
    anchorLink.addEventListener('click', e => {
        e.preventDefault();
        const anchor = anchorLink.getAttribute('href')
        const targetElement = document.querySelector(anchor);
        scrollSmoothlyTo(targetElement);
    })
})
