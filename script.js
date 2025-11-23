const carouselImages = document.querySelectorAll('.carousel-images img');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

let currentIndex = 0;

function showImage(index) {
    carouselImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showImage(currentIndex);
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showImage(currentIndex);
}, 5000);