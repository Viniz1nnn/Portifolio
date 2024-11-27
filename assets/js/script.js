window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
});

// HEADER TRANSPARENTE

window.addEventListener("scroll", function () {
  let header = document.querySelector("#header");
  header.classList.toggle("rolagem", window.scrollY > 0);
});

// DIRECIONADORES DO SITE

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

window.addEventListener("scroll", function () {
  let sections = document.querySelectorAll("section, footer");
  let navLinks = document.querySelectorAll(".nav-link");

  sections.forEach(function (section) {
    var top = window.scrollY;
    var offset = section.offsetTop - 60;
    var height = section.offsetHeight;
    var id = section.getAttribute("id");

    if (top >= offset - 270 && top < offset + height + 270) {
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      document
        .querySelector(".nav-link[href*=" + id + "]")
        .classList.add("active");
    }
  });

  var footer = document.querySelector("footer");
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });
    document
      .querySelector('.nav-link[href*="contatos"]')
      .classList.add("active");
  }
});

// MENU HAMBURGER

let mobileMenu = document.querySelector(".mobile-menu");
let header = document.querySelector("header");
let nav = document.querySelector(".nav-list");
let navLinks = document.querySelectorAll(".nav-link");

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

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    nav.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});
