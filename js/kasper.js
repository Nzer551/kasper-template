/* Start Slider */
let slides = Array.from(document.querySelectorAll(".slide"));
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let slideButtons = document.getElementById("slide-buttons");
let slideController = document.getElementById("slide-controller");
let innerSlidesContainer = document.getElementById("slide-show");
let countOfSlide = slides.length;
let currentSlide = 0;
let bulletsUl = document.createElement("ul");

// Set Inner Slides Container Element Width
innerSlidesContainer.style.width = `${countOfSlide * 100}%`;

// Set Slide Width
for(let slide of slides) {
    slide.style.width = `calc(100% / ${countOfSlide})`;
}

// Set Id Attribute To UL
bulletsUl.id = "bullets";

// Create Li Items With Custom Attribute And Add Them To Ul
for(let i = 1; i <= countOfSlide; i++) {
    let li = document.createElement("li");

    li.setAttribute("data-index", i);

    bulletsUl.appendChild(li);
}

// Add The Bullets To The Page
slideButtons.appendChild(bulletsUl);

// Get Li Bullets Array
let bulletsLi = Array.from(document.querySelectorAll("#bullets li"));

// Trigger The Slide Changer Function
slideDemo();

// Chenge Slide With Next Button
nextBtn.onclick = () => {
    if(currentSlide === countOfSlide - 1) {
        nextBtn.classList.add("hide");
    } else {
        nextBtn.classList.remove("hide");
        currentSlide++;
    }
    
    if(nextBtn.classList.contains("hide")) {
        return false;
    }
    slideDemo();
}

// Chenge Slide With previous Button
previousBtn.onclick = () => {
    if(currentSlide === 0) {
        previousBtn.classList.add("hide");
    } else {
        previousBtn.classList.remove("hide")
        currentSlide--;
    }
    
    if(previousBtn.classList.contains("hide")) {
        return false;
    }
    slideDemo();
}

// Chenge Slide With Li Bullets
for(let i = 0; i < bulletsLi.length; i++) {
    bulletsLi[i].onclick = () => {
        currentSlide = parseInt(bulletsLi[i].getAttribute("data-index") - 1);
        slideDemo();
    }
}

function slideDemo() {
    // Remove Active Class From Li Bullets
    bulletsLi.forEach((e) => {
        e.classList.remove("active");
    })

    // Change The Slide
    slideController.style.marginLeft = `calc((-100% / ${countOfSlide}) * ${currentSlide})`;

    // Add Active Class To Current Slide Li Bullet
    bulletsLi[currentSlide].classList.add("active");
    
    // Remove Or Add Hide Class From or To Previous Button
    if(currentSlide === 0) {
        previousBtn.classList.add("hide");
    } else {
        previousBtn.classList.remove("hide");
    }

    // Remove Or Add Hide Class From or To Nex Button
    if(currentSlide === countOfSlide - 1) {
        nextBtn.classList.add("hide");
    } else {
        nextBtn.classList.remove("hide");
    }
}
/* End SLider */

// Get Header Element & Header Navigation Links
let headerElement = document.getElementById("header");
let topHeaderlinks = Array.from(document.querySelectorAll("#header nav li a"));

// Change The Header Position On Scroll
document.body.onscroll = () => {
    let scrollTopValue = document.documentElement.scrollTop;
    if(scrollTopValue > 100) {
        headerElement.style.position = "fixed";
        headerElement.style.backgroundColor = "rgba(0, 0, 0, .6)";
    } else if(scrollTopValue === 0) {
        headerElement.style.position = "absolute";
        headerElement.style.backgroundColor = "transparent";
        topHeaderlinks[0].classList.add("active");
    }
    activeClassChangeOnScroll();
}

function activeClassChangeOnScroll() {
    // Get Main Sections Element
    let sections = Array.from(document.querySelectorAll("body > section"));
    // Get Scroll Position Value
    let scrollTopValue = document.documentElement.scrollTop;

    for(let i = 0; i < sections.length; i++) {
        if(scrollTopValue >= sections[i].offsetTop - 10 && scrollTopValue < sections[i].offsetTop + sections[i].offsetHeight) {
            topHeaderlinks.forEach((link) => {
                link.classList.remove("active");
            })
            topHeaderlinks[i + 1].classList.add("active");
        } else {
            topHeaderlinks[i + 1].classList.remove("active");
        }
    }
}

// Show Ul Menu In Mobile View
function showMenu() {
    let menuUl = document.querySelector("nav ul");
    if(menuUl.style.display === "flex") {
        menuUl.style.display = "none";
    } else {
        menuUl.style.display = "flex";
    }
}