

// Scroll To Order

function scrollToOrderSection() {
    document.getElementById('order-section').scrollIntoView({ behavior: 'smooth' });
}


// Scroll To Top Button

const scrollToTopButton = document.querySelector(".scroll-to-top");
var scrollToTopButtonIsShow = false

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        if (!scrollToTopButtonIsShow) {
            scrollToTopButtonIsShow = true;
            scrollToTopButton.style.display = 'block';
        }
    } else {
        scrollToTopButtonIsShow = false;
        scrollToTopButton.style.display = null;
    }
});


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

window.addEventListener('resize', function(event) {
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
}, true);


// Timer

const daysDisplay = document.querySelector('.days');
const hoursDisplay = document.querySelector('.hours');
const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');

let timer;
let timeRemaining = localStorage.getItem('timeRemaining') 
    ? parseInt(localStorage.getItem('timeRemaining')) 
    : 30 * 60;

function startTimer() {
    if (timer) return; // предотвращаем запуск нескольких таймеров

    if (timeRemaining <= 0) {
        timeRemaining = 30 * 60
    }
    
    timer = setInterval(() => {
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

document.addEventListener('DOMContentLoaded', function () {
    startTimer();
    updateTimerDisplay();
});


// Tel Input

function onInputTel(event) {
    event.target.value = event.target.value.replace(/[^\d]/g, '');
}