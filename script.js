
function showMenu(){
    let body= document.querySelector ('body');
    body.classList.toggle('show');
 }
 function showHeader(){
    let body= document.querySelector ('body');
    body.classList.toggle('show-header');
 }
 function changeSlider1(){
   let body= document.querySelector ('body');
   body.classList.toggle('slid1');
}
function changeSlider2(){
   let body= document.querySelector ('body');
   body.classList.toggle('slid');
}
const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'vertical',
   loop: true,
 

   // Navigation arrows
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },

   
 });