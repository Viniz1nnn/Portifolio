window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
});

// HEADER TRANSPARENT

window.addEventListener("scroll", function () {
  let header = document.querySelector("#header");
  header.classList.toggle("rolagem", window.scrollY > 0);
});

// DIRECIONADORES DO SITE

let navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    navLink.classList.add("active");
  });
});

let downloadCv = document.getElementById("download-cv");
let div1 = document.querySelector(".header");
let div2 = document.querySelector(".nav-list");

const moverElemento = () => {
  if (window.innerWidth <= 980) {
    div2.appendChild(downloadCv);
  } else {
    div1.appendChild(downloadCv);
  }
};

moverElemento();

window.addEventListener("resize", moverElemento);

// MENU HAMBURGER

let mobileMenu = document.querySelector(".mobile-menu");
let header = document.querySelector("header");
let nav = document.querySelector(".nav-list");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  nav.classList.toggle("active");
  if (header.style.backgroundColor === "rgba(13, 13, 13, 0.95)") {
    header.style.backgroundColor = "";
  } else {
    header.style.backgroundColor = "rgba(13, 13, 13, 0.95)";
  }
  nav.style.display = "flex";
});
