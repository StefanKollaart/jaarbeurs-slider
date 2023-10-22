const slidesContainer = document.querySelector(".slider__slides");
const slides = document.querySelectorAll(".slider__slide");
const arrows = document.querySelectorAll(".slider__arrow");
const prevArrow = document.querySelector(".slider__arrow_left");
const nextArrow = document.querySelector(".slider__arrow_right");

class Slider {
  currentFirstSlide = 0;
  slidesInView = 3;

  constructor() {
    prevArrow.addEventListener("click", this.prevSlide.bind(this));
    nextArrow.addEventListener("click", this.nextSlide.bind(this));
  }

  prevSlide() {
    if (this.currentFirstSlide === 0) return;
    this.currentFirstSlide--;
    this.updateSlider();
  }

  nextSlide() {
    if (this.currentFirstSlide === slides.length - this.slidesInView) return;
    this.currentFirstSlide++;
    this.updateSlider();
  }

  updateSlider() {
    this.updateSlidesContainer();
    this.updateArrows();
    this.updateSlides();
  }

  updateSlidesContainer() {
    const widthPerSlide = 100 / this.slidesInView;

    slidesContainer.style.transform = `translateX(-${
      widthPerSlide * this.currentFirstSlide
    }%)`;
  }

  updateArrows() {
    arrows.forEach((arrow) =>
      arrow.classList.remove("slider__arrow--disabled")
    );

    if (this.currentFirstSlide === 0)
      prevArrow.classList.add("slider__arrow--disabled");

    if (this.currentFirstSlide === slides.length - this.slidesInView)
      nextArrow.classList.add("slider__arrow--disabled");
  }

  updateSlides() {
    slides.forEach((slide) => slide.classList.remove("slider__slide--active"));

    slides.forEach((slide, index) => {
      if (
        index >= this.currentFirstSlide &&
        index < this.currentFirstSlide + this.slidesInView
      )
        slide.classList.add("slider__slide--active");
    });
  }
}

const slider = new Slider();
