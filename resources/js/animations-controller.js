const scrollElements = document.querySelectorAll('.js--scroll')

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

function areMotionsReduced() {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    return mediaQuery && mediaQuery.matches
}


window.addEventListener('scroll', () => {
    if (!areMotionsReduced()) {
        scrollElements.forEach(elem => {
            elem.style.opacity = 0;
        })
        throttle(handleScrollAnimation, 250);
    }
})

const rotateBackActionButton = () => {
    const actionButton = document.querySelector('.action-button')
    if(actionButton.classList.contains('action-button--open')) {
        actionButton.style.animation = 'rotate45 0.5s ease'
    }
    else {
        actionButton.style.animation = 'rotateBack45 0.5s ease'
    }
}