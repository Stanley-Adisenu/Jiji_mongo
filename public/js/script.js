const left_side = document.querySelector('.left-side')
// const section1 = document.querySelector('.section1')
// const footer = document.querySelector('.section1')


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function positionContainer(){
  const { scrollHeight} = document.documentElement;
  const scrollTop = document.body.scrollTop;

  const scrollPercent = scrollHeight - scrollTop;

  if(scrollTop >= (section1.offsetTop-60)){
      left_side.classList.add('become_fixed')
  }else{
     left_side.classList.remove('become_fixed')
  }
  if(scrollTop >= (footer.offsetTop+500)){
    left_side.classList.remove('become_fixed')
  } 
  // console.log('Abdul Kudus')
  // console.log(scrollTop)

  console.log(footer.offsetTop)
  console.log(scrollTop)
}


// document.addEventListener('scroll', ()=>{
//   if(window.innerWidth >= 1024 ){
//     positionContainer()
//   }
// });