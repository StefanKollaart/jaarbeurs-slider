const slidesContainer = document.querySelector(".slider__slides");
const slides = document.querySelectorAll(".slider__slide");
const arrows = document.querySelectorAll(".slider__arrow");
const prevArrow = document.querySelector(".slider__arrow_left");
const nextArrow = document.querySelector(".slider__arrow_right");

class Slider {
  currentFirstSlide = 0;
  slidesInView = 3;
  widthPerSlide = 100 / this.slidesInView;

  constructor() {
    prevArrow.addEventListener("click", this.prevSlide.bind(this));
    nextArrow.addEventListener("click", this.nextSlide.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));

    this.handleResize();
  }

  handleResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1200) {
      this.slidesInView = 3;
    } else if (windowWidth >= 768) {
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
    this.widthPerSlide = (100 - this.slidesInView * 2) / this.slidesInView;

    slidesContainer.style.transform = `translateX(-${
      this.widthPerSlide * this.currentFirstSlide
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

      slide.style.width = this.widthPerSlide + "%";
    });
  }
}

const slider = new Slider();
