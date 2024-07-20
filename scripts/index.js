

// cookie

function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=')
        acc[name] = value
        return acc
    }, {})
}

const cookie = getCookie()


// Banner

let stateBanner = cookie.stateBanner ? parseInt(cookie.stateBanner) : 1;
const banner = document.querySelector('.banner');

function checkBanner() {
    banner.style.display = stateBanner ? null : 'none'
}

function hideBanner() {
    stateBanner = 0
    document.cookie = "stateBanner=0; max-age=" + (60 * 60); // 1 час = 60 * 60
    checkBanner()
}



// Timer

const daysDisplay = document.querySelector('.days');
const hoursDisplay = document.querySelector('.hours');
const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');

let timer;
let timeRemaining = localStorage.getItem('timeRemaining') 
    ? parseInt(localStorage.getItem('timeRemaining')) 
    : 60 * 60 * 24;

function startTimer() {
    if (timer) return; // предотвращаем запуск нескольких таймеров

    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            timeRemaining = 30 * 60
        }
        timeRemaining--;
        localStorage.setItem('timeRemaining', timeRemaining);
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const days = Math.floor(timeRemaining / (60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
    const seconds = timeRemaining % 60;

    daysDisplay.textContent = `${days} д`;
    hoursDisplay.textContent = `${hours} ч`;
    minutesDisplay.textContent = `${minutes} м`;
    secondsDisplay.textContent = `${seconds} с`;
}


// Scroll To Top Button

const scrollToTopButton = document.querySelector(".scroll-to-top");
var scrollToTopButtonIsShow = false

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function windowOnScroll() {
    const scrolled = window.scrollY;

    // scroll to top button
    if (scrolled > 800) {
        if (!scrollToTopButtonIsShow) {
            scrollToTopButtonIsShow = true;
            scrollToTopButton.style.display = 'block';
        }
    } else {
        scrollToTopButtonIsShow = false;
        scrollToTopButton.style.display = null;
    }
}


// Carousel

const carousel = document.querySelector(".carousel");
const swiperDots = document.querySelector(".swiper-dots");
const carouselChildrens = carousel.children;
const dots = swiperDots.children;
var selectedItemIndex = 0;
var isPhone = false;

function swipeLeft() {
    if (selectedItemIndex - 1 < 0) {
        swipeTo(carouselChildrens.length - 1);
        return 1;
    }
    swipeTo(selectedItemIndex - 1);
}

function swipeRight() {
    if (selectedItemIndex + 1 > carouselChildrens.length - 1) {
        swipeTo(0);
        return 1;
    }
    swipeTo(selectedItemIndex + 1);
}

function swipeTo(index) {
    carouselChildrens[selectedItemIndex].className = carouselChildrens[selectedItemIndex].className.replace(' selected', '');
    dots[selectedItemIndex].className = dots[selectedItemIndex].className.replace(' selected', '')
    
    carouselChildrens[index].className += ' selected';
    dots[index].className += ' selected';
    selectedItemIndex = index;
}

function windowOnResize() {
    height = window.innerHeight;
    width = window.innerWidth;
    
    if (width < 600) {
        if (!isPhone) {
            isPhone = true;
            swipeTo(selectedItemIndex)
        }
    } else {
        isPhone = false;
    }
}


// Tel Input

function onFocusTel(event) {
    if (!event.target.value.startsWith('+7')) {
        event.target.value = '+7 (';
    }
}

function onBlurTel(event) {
    if (event.target.value === '+7 (') {
        event.target.value = '';
    }
}

function onInputTel(event) {
    const input = event.target.value;
    const cleanInput = input.replace(/[^\d]/g, '');
    const match = cleanInput.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);

    if (match) {
        event.target.value = `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    } else {
        event.target.value = `+7 (${cleanInput.slice(1, 4)}`;
        if (cleanInput.length > 4) {
            event.target.value += `) ${cleanInput.slice(4, 7)}`;
        }
        if (cleanInput.length > 7) {
            event.target.value += `-${cleanInput.slice(7, 9)}`;
        }
        if (cleanInput.length > 9) {
            event.target.value += `-${cleanInput.slice(9, 11)}`;
        }
    }

    if (event.target.inputType === 'deleteContentBackward' && event.target.value.length < 4) {
        event.target.value = '+7 (';
    }
}


// onload

document.addEventListener('DOMContentLoaded', function () {
    checkBanner();
    if (stateBanner) {
        startTimer();
        updateTimerDisplay();
    }

    window.addEventListener('scroll', windowOnScroll);
    window.addEventListener('resize', windowOnResize, true);
});