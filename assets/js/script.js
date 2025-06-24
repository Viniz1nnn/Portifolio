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
  if (
    header.style.background ===
    "linear-gradient(rgb(5, 5, 10) 20%, rgb(8, 8, 17) 70%)"
  ) {
    header.style.background = "";
  } else {
    header.style.background =
      "linear-gradient(rgb(5, 5, 10) 20%, rgb(8, 8, 17) 70%)";
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
  fetch("assets/projetos.json")
    .then((response) => response.json())
    .then((data) => {
      const projetos = data.projetos;
      const portfolioContainer = document.querySelector(".projects");

      // 3. Limpa o container (remove o template original)
      portfolioContainer.innerHTML = "";

      // 4. Para cada projeto no JSON...
      projetos.forEach((projeto) => {
        // Cria uma cópia do template
        const projetoClone = projectTemplate.cloneNode(true);

        // Preenche os dados básicos (visíveis inicialmente)
        const img = projetoClone.querySelector(".project-image");
        const title = projetoClone.querySelector(".project-title .title-text");
        const iconsContainer = projetoClone.querySelector(".project-icons");

        projetoClone.id = `project-${projeto.id}`;

        if (img) {
          img.src = projeto.imagem;
          img.alt = projeto.titulo;
        }
        if (title) title.textContent = projeto.titulo;

        // Ícones de tecnologias
        if (iconsContainer && projeto.tecnologias) {
          iconsContainer.innerHTML = projeto.tecnologias
            .map(
              (tech) =>
                `<i class="${tech.icone}" style="color: ${tech.cor}"></i>`
            )
            .join(" ");
        }

        // Configura o clique para abrir o modal
        projetoClone.addEventListener("click", () => {
          openModal(projeto);
        });

        // Adiciona ao DOM
        portfolioContainer.appendChild(projetoClone);
      });
    })
    .catch((err) => console.error("Erro ao carregar projetos:", err));

  // Função para abrir o modal com os detalhes completos
  function openModal(projeto) {
    const modal = document.getElementById("projectModal");
    const modalImg = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDesc = modal.querySelector(".modal-description");
    const modalTech = modal.querySelector(".modal-tech");
    const modalLinkImg = modal.querySelector(".modal-link--image");
    const modalLink = modal.querySelector(".modal-link");
    const defaultIcon = modal.querySelector(".default-icon");
    const mobileIcon = modal.querySelector(".mobile-icon");

    // Preenche o modal com os dados completos
    modalImg.src = projeto.imagem;
    modalImg.alt = projeto.titulo;
    modalTitle.textContent = projeto.titulo;
    modalLink.href = projeto.link;
    modalLinkImg.href = projeto.link;

    // Descrição com parágrafos
    modalDesc.innerHTML = projeto.descricao.map((p) => `<p>${p}</p>`).join("");

    // Tecnologias com nomes
    modalTech.innerHTML = projeto.tecnologias
      .map(
        (tech) => `
          <div style="display: flex; align-items: center; gap: 5px;">
              <i class="${tech.icone}" style="color: ${tech.cor};"></i>
              <span>${tech.name}</span>
          </div>
      `
      )
      .join("");

    // Tipo de  tela padrão do projeto
    modal.classList.remove("mobile-screen");

    if (projeto.screen == "mobile") {
      modal.classList.add("mobile-screen");

      defaultIcon.style.display = "none";
      mobileIcon.style.display = "block";
    } else {
      defaultIcon.style.display = "block";
      mobileIcon.style.display = "none";
    }

    // Mostra o modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    window.addEventListener("resize", checkTextOverflow);
    setTimeout(checkTextOverflow, 100); // Delay para renderização
  }

  // Ajusta o texto da descrição

  function checkTextOverflow() {
    const modal = document.getElementById("projectModal");
    if (!modal || !modal.classList.contains("mobile-screen")) return;

    const desc = modal.querySelector(".modal-description");
    if (!desc) return;

    // Remove classe antes de verificar
    desc.classList.remove("overflow-active");

    // Verifica se precisa de scroll (com margem de segurança)
    if (desc.scrollHeight > desc.clientHeight + 5) {
      desc.classList.add("overflow-active");
    }
  }

  // Fechar modal
  document.querySelector(".close-modal").addEventListener("click", () => {
    document.getElementById("projectModal").classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Fechar ao clicar fora do conteúdo
  document.getElementById("projectModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("projectModal")) {
      document.getElementById("projectModal").classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});
