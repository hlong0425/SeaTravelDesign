const sliders = document.querySelectorAll('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const video = document.querySelector('#video');
const btnVideo = document.querySelector('.btn--video');
const sections = document.querySelectorAll('.section');
const sectionAbout = document.querySelector('.section__about');
const dots = document.querySelector('.dots');
function sliderProcess() {
    let currentSlide = 0;
    // Init slider:
    sliders.forEach((slider, i) => {
        slider.style.transform = `translateX(${-100 * i}%)`;
    })

    // update slider
    const gotoSlide = function () {
        sliders.forEach((slider, i) => {
            slider.style.transform = `translateX(${(currentSlide - i) * 100}%)`;
        })
    }

    // update dot
    const updateDots = function () {
        let html = "";
        sliders.forEach((_, i) => {
            if (i === currentSlide) {
                html += `<i class="fas fa-circle"></i>`;
                return;
            }
            html += `<i class="far fa-circle"></i>`
        })

        dots.innerHTML = html;
    }

    btnRight.addEventListener('click', function () {
        currentSlide++;
        if (currentSlide > sliders.length - 1) currentSlide = 0;
        gotoSlide();
        updateDots();

    })

    btnLeft.addEventListener('click', function () {
        currentSlide--;
        if (currentSlide < 0) currentSlide = sliders.length - 1;
        gotoSlide();
        updateDots();
    })




}


function videoProcess() {
    let isPlaying = false;
    btnVideo.addEventListener('click', function () {
        if (!isPlaying) {
            isPlaying = true;
            video.play();
            btnVideo.innerHTML = `<i class="fas fa-pause"></i>`;
        }

        else {
            isPlaying = false
            video.pause();
            btnVideo.innerHTML = `<i class="fas fa-play"> </i>`;
        }
    })
}


function SectionReveal() {

    const sectionObsever = new IntersectionObserver(function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    }, {
        root: null,
        threshold: 0.15,
    })

    // Fix section About
    const sectionAboutObsever = new IntersectionObserver(function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        // observer.unobserve(entry.target);
    }, {
        root: null,
        threshold: 0.15,
    })

    sections.forEach(section => {
        sectionObsever.observe(section);
    })

    sectionAboutObsever.observe(sectionAbout);
}


// Sticky Navigation 
const home = document.querySelector('.section__home');
const header = document.querySelector('.header');
const homeObsever = new IntersectionObserver(function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        header.classList.add('sticky');
        return
    }
    header.classList.remove('sticky');

}, {
    root: null,
    threshold: 0,
})

homeObsever.observe(home);

videoProcess();
sliderProcess();
SectionReveal();









