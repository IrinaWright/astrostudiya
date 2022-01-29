
new Swiper ('.swiper-container', {
    autoplay: {
delay: 1600,
disableOnInteraction: true, // Останавливает при взаимодействии с слайдером
},
  pagination: {
el: '.swiper-pagination',
clickable: true,
},
loop: true,
parallax: true,
paginationClickable: true,
grabCursor: true,
speed: 900
}); 