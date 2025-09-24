
// desc menu
const menuItems = document.querySelectorAll('.nav_gnb02 a');
const descItems = document.querySelectorAll('.desc-box .desc');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const target = item.dataset.target;



        descItems.forEach(desc => {
            desc.classList.remove('active');
            desc.classList.remove('tall');
            if (desc.dataset.name === target) {
                desc.classList.add('active');
                if (target === 'women') {
                    desc.classList.add('tall');
                }
            }
        })
    })
})

document.querySelector('.nav_gnb02').addEventListener('mouseleave', () => {
    descItems.forEach(desc => {
        desc.classList.remove('active');
        desc.classList.remove('tall');
    });
});

console.log(window.innerWidth);

// 아래 스크롤 해더 변화

window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header');
    const root = document.documentElement;

    let prevH = 0;

    function setHeaderOffset() {
        const h = header?.offsetHeight || 0;
        document.documentElement.style.setProperty('--header-h', h + 'px');
    }

    function onScroll() {
        if (window.innerWidth < 1025) return;
        const y = window.scrollY || document.documentElement.scrollTop;
        header.classList.toggle('shrink', y > 20);
        setHeaderOffset();
    }

    window.addEventListener('load', () => { setHeaderOffset(); onScroll(); });
    window.addEventListener('resize', setHeaderOffset);
    window.addEventListener('scroll', onScroll);
})

// main 슬라이드

window.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 900,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 400
            },
            768: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 600
            },
            1024: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 900
            }
        }
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        swiper.slideNext();
    });

    document.querySelector(".btn-prev").addEventListener("click", () => {
        swiper.slidePrev();
    });
});

// section1 슬라이드

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper2", {
        navigation: {
            nextEl: ".swiper-button-next2",
            prevEl: ".swiper-button-prev2",
        },
        breakpoints: {
            0: {
                spaceBetween: 16
            },
            768: {
                spaceBetween: 16
            },
            1024: {
                spaceBetween: 16
            }
        }
    });
});

// section3 슬라이드

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.brand_recommend button');
    const slides = document.querySelectorAll('.section3-contents .s3_slide');

    slides.forEach(s => s.classList.remove('active'));
    if (slides[0]) slides[0].classList.add('active');

    buttons.forEach(b => b.classList.remove('active'));
    if (buttons[0]) buttons[0].classList.add('active');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const brand = button.dataset.brand;

            slides.forEach(slide => {
                slide.classList.toggle('active', slide.dataset.brand === brand);
            });

            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
});


// section5
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.hot-keyword');
    const left = document.querySelector('.hot-keyword_left');
    const rows = Array.from(document.querySelectorAll('.hot-keyword_right li'));


    function animateLeft(duration = 500) {
        if (!left) return Promise.resolve();
        left.classList.add('is-left');
        return new Promise(res => setTimeout(res, duration));
    }


    function animateRow(row, perItemDelay = 50, wipeDuration = 350) {
        return new Promise(res => {

            row.classList.add('is-row');


            const pills = Array.from(row.querySelectorAll('a.keyword-point'));
            pills.forEach((el, i) => {
                setTimeout(() => el.classList.add('is-wiped'), i * perItemDelay);
            });


            const total = (Math.max(pills.length - 1, 0) * perItemDelay) + wipeDuration;
            setTimeout(res, total);
        });
    }

    async function runSequence() {
        await animateLeft();
        for (const row of rows) {
            await animateRow(row);
        }
    }

    const io = new IntersectionObserver((entries, obs) => {
        if (entries.some(e => e.isIntersecting)) {
            obs.disconnect();
            runSequence();
        }
    }, { threshold: 0.2 });

    if (section) io.observe(section); else runSequence();
});

// header 메뉴버튼 반응형 버전 
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".mo-gnb li");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            items.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
        });
    });
});

// header 스크롤 반응형 버전
const header = document.querySelector('.header');
let lastScroll = 0;

function onScroll() {
    const y = window.scrollY;

    if (y > lastScroll && y > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }

    lastScroll = y;
}

window.addEventListener('scroll', onScroll);