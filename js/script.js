document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const cards = document.querySelectorAll(".property-card");

  function filterCards() {
    if (!cards.length) return;
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedType = typeFilter ? typeFilter.value : "all";

    cards.forEach(function (card) {
      const title = card.dataset.title.toLowerCase();
      const district = card.dataset.district.toLowerCase();
      const type = card.dataset.type;
      const matchesSearch = title.includes(searchText) || district.includes(searchText);
      const matchesType = selectedType === "all" || selectedType === type;
      card.classList.toggle("hidden", !(matchesSearch && matchesType));
    });
  }

  if (searchInput) searchInput.addEventListener("keyup", filterCards);
  if (typeFilter) typeFilter.addEventListener("change", filterCards);

  const modal = document.getElementById("propertyModal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalInfo = document.getElementById("modalInfo");
  const modalPrice = document.getElementById("modalPrice");

  document.querySelectorAll(".details-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      modalTitle.textContent = button.dataset.title;
      modalInfo.textContent = button.dataset.info;
      modalPrice.textContent = button.dataset.price;
      modal.style.display = "flex";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) modal.style.display = "none";
  });

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Пожалуйста, заполните все поля.";
        formMessage.style.color = "#9b2c2c";
        return;
      }

      formMessage.textContent = "Заявка успешно отправлена!";
      formMessage.style.color = "#2f6b4f";
      contactForm.reset();
    });
  }

  const calcBtn = document.getElementById("calcBtn");
  if (calcBtn) {
    calcBtn.addEventListener("click", function () {
      const price = Number(document.getElementById("priceCalc").value);
      const first = Number(document.getElementById("firstPayment").value);
      const result = document.getElementById("calcResult");

      if (price <= 0 || first < 0 || first >= price) {
        result.textContent = "Введите корректные значения.";
        result.style.color = "#9b2c2c";
        return;
      }

      result.textContent = "Остаток к оплате: " + (price - first).toLocaleString("ru-RU") + " AZN";
      result.style.color = "#2f6b4f";
    });
  }
});
