const scrollElements = document.querySelectorAll('.js--scroll')

scrollElements.forEach(elem => {
    elem.style.opacity = 0;
})

const isElementVisible = (elem, percentageScroll = 100) => {
    const distanceFromTop = elem.getBoundingClientRect().top;

    return (
        distanceFromTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    )
}

const displayScrollElement = elem => {
    elem.classList.add('js--scrolled')
}

const hideScrollElement = elem => {
    elem.classList.remove('js--scrolled')
}

const handleScrollAnimation = () => {
    scrollElements.forEach(elem => {
        if(isElementVisible(elem, 100)) {
            displayScrollElement(elem)
        } else {
            hideScrollElement(elem)
        }
    })
}

let throttleTimer = false;

const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time)
}

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

window.addEventListener('scroll', () => {
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleScrollAnimation, 250);
    }
})