const sliderEl = document.querySelector('.slider');
const prevButtonEl = sliderEl.querySelector('.slider__prev-button');
const nextButtonEl = sliderEl.querySelector('.slider__next-button');
const sliderImagesEl = sliderEl.querySelector('.slider__images');
const sliderTemplateEl = sliderImagesEl.querySelector('.slider__template');
const sliderDotEl = sliderEl.querySelector('.slider__dots');

const slides = [
    "https://img.freepik.com/free-photo/front-view-fruits-composition-pears-tangerines-and-apples-on-grey-background-fruit-pulp-color-photo-apple-taste-tree-free-space_140725-98253.jpg?w=1380&t=st=1705602868~exp=1705603468~hmac=c9cf1e5c481e7373f8f79d90b605dcb68f17635234f4131afb2c9b86d80b874f",
    'https://img.freepik.com/free-photo/close-up-apples-on-branch_23-2150713362.jpg?w=1380&t=st=1705602870~exp=1705603470~hmac=82d4f41e45f327b104ef1b25cf7ad489a0be3e173dbebcdbe7df179eebacef88',
    "https://img.freepik.com/free-photo/freshness-of-nature-harvest-in-a-basket-ripe-for-healthy-eating-generated-by-artificial-intelligence_25030-62767.jpg?w=1380&t=st=1705602976~exp=1705603576~hmac=cc7c164d56d928d2f8e78c1452e9db6d765e2d06bfb6f1a0e4b84ebab42c6bc1",
    "https://img.freepik.com/free-photo/red-apple-and-leaf-on-wooden-table_53876-96842.jpg?w=1380&t=st=1705602973~exp=1705603573~hmac=6691b0587586fea8c5c2fa4523ae05b85749e984b6224c001506ac8ec2d7a4b2",
    "https://img.freepik.com/free-photo/apples-on-the-table_144627-6739.jpg?w=1380&t=st=1705602871~exp=1705603471~hmac=f4765989b8da7ad8c38e7cb845dc7a6ae8d7d71961351d84e2eab280f503e82a",
  ];



addImages();
hideSlide();
addDotsOnPage();
bindDots();
prevButtonEl.addEventListener('click', showPreviousSlide);
nextButtonEl.addEventListener('click', showNextSlide);



function addImages() {
    let imgId = 0;
    const imageElements = slides.map((imgSrc) => {
        const templateHtml = sliderTemplateEl.content.cloneNode(true);
        templateHtml.querySelector(".slider__img").setAttribute('src', imgSrc);
        templateHtml.querySelector(".slider__img").setAttribute('data-id', imgId);
        imgId += 1;
        return templateHtml;
    });

    sliderImagesEl.innerHTML = "";
    sliderImagesEl.append(...imageElements);
};

function hideSlide() {
    const sliderImageEls = sliderImagesEl.querySelectorAll('.slider__img');
    sliderImageEls.forEach((slide) => {
        slide.classList.add('hidden');
    });
    sliderImagesEl.firstElementChild.classList.remove('hidden');
    sliderImagesEl.firstElementChild.classList.add('active');
};

function showPreviousSlide() {
    const thisSlide = sliderImagesEl.querySelector('.active');
    const sliderDotsEls = sliderDotEl.querySelectorAll('.slider__dot');
    thisSlide.classList.remove('active');
    thisSlide.classList.add('hidden');
    if (thisSlide.previousElementSibling) {
        thisSlide.previousElementSibling.classList.remove('hidden');
        thisSlide.previousElementSibling.classList.add('active');
    } else {
        const newThisSlide = thisSlide.parentNode.lastElementChild;
        newThisSlide.classList.remove('hidden');
        newThisSlide.classList.add('active');
    };
    sliderDotsEls.forEach((dot) => {
        if (dot.getAttribute('data-id') === thisSlide.getAttribute('data-id') && dot.previousElementSibling) {
            dot.classList.remove('slider__dot--active');
            dot.previousElementSibling.classList.add('slider__dot--active');
        } else if (dot.getAttribute('data-id') === thisSlide.getAttribute('data-id') && !dot.previousElementSibling) {
            dot.classList.remove('slider__dot--active');
            const newCurrentDot = dot.parentNode.lastElementChild;
            newCurrentDot.classList.add('slider__dot--active');
        };
    });
};

function showNextSlide() {
    const thisSlide = sliderImagesEl.querySelector('.active');
    const sliderDotsEls = sliderDotEl.querySelectorAll('.slider__dot');
    thisSlide.classList.remove('active');
    thisSlide.classList.add('hidden');
    if (thisSlide.nextElementSibling) {
        thisSlide.nextElementSibling.classList.remove('hidden');
        thisSlide.nextElementSibling.classList.add('active');
    } else {
        const newThisSlide = thisSlide.parentNode.firstElementChild;
        newThisSlide.classList.remove('hidden');
        newThisSlide.classList.add('active');
    };
    sliderDotsEls.forEach((dot) => {
        if (dot.getAttribute('data-id') === thisSlide.getAttribute('data-id') && dot.nextElementSibling) {
            dot.classList.remove('slider__dot--active');
            dot.nextElementSibling.classList.add('slider__dot--active');
        } else if (dot.getAttribute('data-id') === thisSlide.getAttribute('data-id') && !dot.nextElementSibling) {
            dot.classList.remove('slider__dot--active');
            const newCurrentDot = dot.parentNode.firstElementChild;
            newCurrentDot.classList.add('slider__dot--active');
        };
    });
};

function addDotsOnPage() {
    for (let i = 0; i < slides.length; i++) {
        sliderDotEl.insertAdjacentHTML('beforeEnd',
            `<span class="slider__dot" data-id="${i}"></span>`);
    }
    sliderDotEl.firstElementChild.classList.add('slider__dot--active');
};

function bindDots() {
    const sliderDotsEls = sliderDotEl.querySelectorAll('.slider__dot');
    const sliderImageEls = sliderImagesEl.querySelectorAll('.slider__img');

    sliderDotsEls.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            sliderDotsEls.forEach((dot) => { dot.classList.remove('slider__dot--active') });
            sliderImageEls.forEach((img) => {
                if (img.classList.contains('active')) {
                    img.classList.remove('active');
                    img.classList.add('hidden');
                }
                if (img.getAttribute('data-id') === e.target.getAttribute('data-id')) {
                    img.classList.remove('hidden');
                    img.classList.add('active');
                }
            });
            e.target.classList.add('slider__dot--active');
        });
    });
};
