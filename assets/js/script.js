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

// PEGAR INFORMACOES DOS PROJETOS NO JSON E MANDAR PARA O HTML

document.addEventListener("DOMContentLoaded", () => {
  // 1. Primeiro carregue o template original
  const projectTemplate = document.querySelector(".project");

  if (!projectTemplate) {
    console.error("Template .project não encontrado!");
    return;
  }

  // 2. Carrega os projetos do JSON
  fetch("assets/projetos.json") // ATUALIZE PARA O CAMINHO CORRETO
    .then((response) => response.json())
    .then((data) => {
      const projetos = data.projetos;
      const portfolioContainer =
        document.querySelector(".projects") || document.body; // Fallback

      // 3. Limpa o container (remove o template original)
      portfolioContainer.innerHTML = "";

      // 4. Para cada projeto no JSON...
      projetos.forEach((projeto) => {
        // Cria uma cópia do template
        const projetoClone = projectTemplate.cloneNode(true);

        // Preenche os dados
        const img = projetoClone.querySelector(".image img");
        const link = projetoClone.querySelector(".box a");
        const title = projetoClone.querySelector(".txt--project h3");
        const desc = projetoClone.querySelector(".desc--project");

        if (img) img.src = projeto.imagem;
        if (img) img.alt = projeto.titulo;
        if (link) link.href = projeto.link;
        if (title) title.textContent = projeto.titulo;

        // Descrição com parágrafos
        if (desc) {
          desc.innerHTML = projeto.descricao.map((p) => `<p>${p}</p>`).join("");
        }

        // Ícones de tecnologias
        const iconsContainer = projetoClone.querySelector(".project-icons");
        if (iconsContainer && projeto.tecnologias) {
          iconsContainer.innerHTML = projeto.tecnologias
            .map(
              (tech) =>
                `<i class="${tech.icone}" style="color: ${tech.cor};"></i>`
            )
            .join("");
        }

        // Adiciona ao DOM
        portfolioContainer.appendChild(projetoClone);
      });
    })
    .catch((err) => console.error("Erro ao carregar projetos:", err));
});
