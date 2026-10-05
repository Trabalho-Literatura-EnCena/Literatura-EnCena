const groupData = {
  g1: {
    group: "Grupo 1",
    work: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    members: "Felipe K., Luiz Diego e Vitor C.",
    summary: "Narrado por um autor que já morreu, o romance usa ironia para revelar vaidade, privilégios e contradições da elite brasileira.",
    siteUrl: "https://mrdiegl2824.github.io/Site_Linguagens/",
  },
  g2: {
    group: "Grupo 2",
    work: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    members: "Heitor, Vinicios, Lucas, Gabriel F. e Eron.",
    summary: "Narrado por um autor que já morreu, o romance usa ironia para revelar vaidade, privilégios e contradições da elite brasileira.",
    siteUrl: "https://vfzim7380.github.io/Bras-Cubas/",
  },
  g4: {
    group: "Grupo 4",
    work: "O Quinze",
    author: "Rachel de Queiroz",
    members: "Eduardo S., João Eliel, Davi, Edu. M. e Gabriel Flores.",
    summary: "Na seca de 1915, os caminhos de Conceição e da família de Chico Bento mostram a fome, a migração e as desigualdades no sertão.",
    siteUrl: "https://edusasaki.github.io/O-Quinze/",
  },
  g5: {
    group: "Grupo 5",
    work: "O Quinze",
    author: "Rachel de Queiroz",
    members: "Vinícius F., Augusto, Henrique, Pedro, Gabriel S. e Caio D.",
    summary: "Na seca de 1915, os caminhos de Conceição e da família de Chico Bento mostram a fome, a migração e as desigualdades no sertão.",
    siteUrl: "https://trabalho-literatura-encena.github.io/G5---O-quinze/",
  },
  g6: {
    group: "Grupo 6",
    work: "Clara dos Anjos",
    author: "Lima Barreto",
    members: "Felipe Alapaki.",
    summary: "A trajetória de Clara, jovem negra seduzida e abandonada por Cassi Jones, expõe racismo, desigualdade e opressão de gênero.",
    siteUrl: "https://trabalho-literatura-encena.github.io/G6-Felipe-Alapaki/",
  },
  g7: {
    group: "Grupo 7",
    work: "Clara dos Anjos",
    author: "Lima Barreto",
    members: "Daniel, Caio N., Arthut T., Jean, Theodoro e Rafael.",
    summary: "A trajetória de Clara, jovem negra seduzida e abandonada por Cassi Jones, expõe racismo, desigualdade e opressão de gênero.",
    siteUrl: "https://trabalho-literatura-encena.github.io/G7---Clara-dos-Anjos/",
  },
  g8: {
    group: "Grupo 8",
    work: "Vidas Secas",
    author: "Graciliano Ramos",
    members: "Rian, Vitor A., Luiz Guilherme e Vitor M.",
    summary: "A caminhada de Fabiano, Sinhá Vitória, os filhos e Baleia pela caatinga revela a luta de uma família contra seca, fome e miséria.",
    siteUrl: "#",
  },
};

const modal = document.querySelector("#group-modal");

if (modal) {
  const dialog = modal.querySelector(".modal-dialog");
  const closeButton = modal.querySelector(".modal-close");
  const modalGroup = modal.querySelector("#modal-group");
  const modalTitle = modal.querySelector("#modal-title");
  const modalAuthor = modal.querySelector("#modal-author");
  const modalSummary = modal.querySelector("#modal-summary");
  const modalMembers = modal.querySelector("#modal-members");
  const modalStatus = modal.querySelector("#modal-status");
  const modalVisit = modal.querySelector("#modal-visit");
  const triggers = document.querySelectorAll("[data-group-trigger]");
  let lastTrigger = null;

  const getFocusableElements = () =>
    Array.from(
      dialog.querySelectorAll(
        'button:not([disabled]), a[href]:not([aria-disabled="true"]), [tabindex]:not([tabindex="-1"])',
      ),
    );

  const openModal = (groupId, trigger) => {
    const group = groupData[groupId];

    if (!group) {
      return;
    }

    lastTrigger = trigger;
    modalGroup.textContent = group.group;
    modalTitle.textContent = group.work;
    modalAuthor.textContent = group.author;
    modalSummary.textContent = group.summary;
    modalMembers.textContent = group.members;
    modalStatus.textContent =
      group.siteUrl === "#"
        ? "Site externo ainda não informado pelo grupo."
        : "Site externo publicado e pronto para visita.";
    modalVisit.href = group.siteUrl;
    modalVisit.setAttribute("aria-disabled", group.siteUrl === "#" ? "true" : "false");
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openModal(trigger.dataset.groupId, trigger);
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.matches("[data-modal-close]")) {
      closeModal();
    }
  });

  modalVisit.addEventListener("click", (event) => {
    if (modalVisit.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
}
