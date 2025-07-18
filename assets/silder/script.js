const posts = [
  {
    title: "Welcome to Tapovan Happiness Valley",
    excerpt:
      "Step into Kerala's first Jackfruit Forestorium — a unique eco-destination where nature, wellness, and joyful experiences bloom together in perfect harmony.",
    imageSrc: "assets/img/new-img/b2.jpg",
    author: "Tapovan Team",
    date: "July 12, 2025",
    readTime: "4 min",
    url: "#featured-services"
  },
  {
    title: "Where Nature Heals",
    excerpt:
      "From mud baths to meditation caves, butterfly gardens to organic farms — rejuvenate your body, mind, and soul amidst lush greenery and pure oxygen.",
     imageSrc: "assets/img/new-img/banner1.jpg",
    // author: "Tapovan Wellness",
    // date: "July 12, 2025",
    // readTime: "4 min",
    // url: "#featured-services"
  },
  {
    title: "Celebrate Life Differently",
    excerpt:
      "Host your destination wedding, corporate retreat, or family celebration surrounded by serene landscapes, open-air theaters, and soulful surroundings.",
    imageSrc: "assets/img/new-img/banner2.jpg",
    // author: "Tapovan Events",
    // date: "July 12, 2025",
    // readTime: "4 min",
    // url: "#featured-services"
  }
];


let currentIndex = 0;
let direction = 1;
const carousel = document.getElementById("carousel");

function createSlide(post, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (index === currentIndex) slide.classList.add("active");
  slide.style.backgroundImage = `url(${post.imageSrc})`;

  slide.innerHTML = `
      <div class="overlay"></div>
      <div class="slide-content">
        <h1><a href="${post.url}" style="color:white;text-decoration:none" target="_blank">${post.title}</a></h1>
        <p>${post.excerpt}</p>
       
        <a href="#about" class="btn-get-started">Explore More</a>
      </div>
    `;

  return slide;
}

function renderSlides() {
  carousel.innerHTML = "";
  posts.forEach((post, i) => {
    const slide = createSlide(post, i);
    carousel.appendChild(slide);
  });

  const controls = document.createElement("div");
  controls.className = "controls";

  const dots = document.createElement("div");
  dots.className = "dots";
  posts.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot ${i === currentIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      direction = i > currentIndex ? 1 : -1;
      currentIndex = i;
      updateSlides();
    });
    dots.appendChild(dot);
  });

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow-btn";
  prevBtn.textContent = "<";
  prevBtn.onclick = () => {
    direction = -1;
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateSlides();
  };

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow-btn";
  nextBtn.textContent = ">";
  nextBtn.onclick = () => {
    direction = 1;
    currentIndex = (currentIndex + 1) % posts.length;
    updateSlides();
  };

  arrows.appendChild(prevBtn);
  arrows.appendChild(nextBtn);
  controls.appendChild(dots);
  controls.appendChild(arrows);
  carousel.appendChild(controls);
}

function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "exit-left", "exit-right");
    if (i === currentIndex) {
      slide.classList.add("active");
    } else if (direction === 1) {
      slide.classList.add("exit-left");
    } else {
      slide.classList.add("exit-right");
    }
  });

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

setInterval(() => {
  direction = 1;
  currentIndex = (currentIndex + 1) % posts.length;
  updateSlides();
}, 6000);

renderSlides();