// Slideshow
let slides = document.querySelectorAll('.slide');
let current = 0;

function nextSlide() {
  slides[current].classList.remove('active');
  current = current + 1 < slides.length ? current + 1 : 0;
  slides[current].classList.add('active');
}

// Auto-play slideshow
setInterval(nextSlide, 5000);

// Highlights animation
let highlights = document.querySelectorAll('.highlights li');

highlights.forEach(item => {
  item.classList.add('active');
})

// Stats counter toggle
let buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {

  button.addEventListener("click", function() {
    
    let stat = this.dataset.stat;
    
    buttons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
    
    toggleCounters(stat)
    
  });

});

function toggleCounters(stat) {
  
  document.querySelector("#goals-count").classList.remove("active");
  document.querySelector("#assists-count").classList.remove("active");
  document.querySelector("#trophies-count").classList.remove("active");

  document.querySelector("#"+stat+"-count").classList.add("active");
}

// Auto-play YouTube videos
document.querySelectorAll('.goal iframe').forEach(video => {
  video.setAttribute('allow', 'autoplay'); 
});