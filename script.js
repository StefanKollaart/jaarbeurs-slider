// Config
const LARGE_SCREEN_WIDTH = 1200;
const MEDIUM_SCREEN_WIDTH = 768;

// Elements
const slidesContainer = document.querySelector(".slider__slides");
const slides = document.querySelectorAll(".slider__slide");
const arrows = document.querySelectorAll(".slider__arrow");
const prevArrow = document.querySelector(".slider__arrow_left");
const nextArrow = document.querySelector(".slider__arrow_right");

// Slider
class Slider {
  currentFirstSlide = 0;
  slidesInView = 3;
  widthPerSlide = 100 / this.slidesInView;

  constructor() {
    prevArrow.addEventListener("click", () => this.prevSlide());
    nextArrow.addEventListener("click", () => this.nextSlide());
    window.addEventListener("resize", () => this.handleResize());

    // Calling handleResize on init, so that the slider is responsive from the start
    this.handleResize();
  }

  handleResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= LARGE_SCREEN_WIDTH) {
      this.slidesInView = 3;
    } else if (windowWidth >= MEDIUM_SCREEN_WIDTH) {
      this.slidesInView = 2;
    } else {
      this.slidesInView = 1;
    }

    this.updateSlider();
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
    this.widthPerSlide = 100 / this.slidesInView - 1;

    // Getting computed gap width from slidesContainer in pixels and adding that times the slide index to make up for gap
    const paddingOffset =
      parseFloat(getComputedStyle(slidesContainer).gap) *
      this.currentFirstSlide;

    slidesContainer.style.transform = `translateX(calc(-${
      this.widthPerSlide * this.currentFirstSlide
    }% - ${paddingOffset}px)`;
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

      slide.style.width = this.widthPerSlide + "%";
    });
  }
}

const slider = new Slider();
