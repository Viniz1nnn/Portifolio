/*window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
});*/

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

document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/projetos.json")
    .then((response) => {
      console.log("Resposta:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Projetos:", data);
      const projetos = data.projetos;
      const projectsContainer = document.getElementById("projects-container");
      if (!projectsContainer) {
        console.error("projectsContainer não encontrado");
        return;
      }

      const projectTemplate = document.getElementById("project-template");
      if (!projectTemplate) {
        console.error("projectTemplate não encontrado");
        return;
      }
      projetos.forEach((projeto) => {
        const projectClone = document.importNode(projectTemplate.content, true);
        const projectImage = projectClone.querySelector("#project-image");
        projectImage.src = projeto.imagem;
        const projectIcons = projectClone.querySelector("#project-icons");
        if (!projectIcons) {
          console.error("projectIcons não encontrado");
          return;
        }
        projeto.tecnologias.forEach((tecnologia) => {
          const icon = document.createElement("div");
          icon.classList.add("skill");
          const i = document.createElement("i");
          const classes = tecnologia.icone.split(" ");
          classes.forEach((clazz) => {
            i.classList.add(clazz);
          });
          i.style.color = tecnologia.cor;
          icon.appendChild(i);
          if (projectIcons) {
            projectIcons.appendChild(icon);
          } else {
            console.error("projectIcons não encontrado");
          }
        });
        const projectLink = projectClone.querySelector("#project-link");
        projectLink.href = projeto.link;
        const projectTitle = projectClone.querySelector("#project-title");
        projectTitle.textContent = projeto.titulo;
        const projectDescription = projectClone.querySelector(
          "#project-description"
        );
        if (!projectDescription) {
          console.error("projectDescription não encontrado");
          return;
        }
        projeto.descricao.forEach((desc) => {
          const p = document.createElement("p");
          p.textContent = desc;
          if (projectDescription) {
            projectDescription.appendChild(p);
          } else {
            console.error("projectDescription não encontrado");
          }
        });
        if (projectsContainer) {
          projectsContainer.appendChild(projectClone);
        } else {
          console.error("projectsContainer não encontrado");
        }
      });
    })
    .catch((error) => console.error("Erro ao carregar projetos:", error));
});
