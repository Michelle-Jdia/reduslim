import "./index.css";

document
  .querySelector(".header__custom-select-wrapper")
  .addEventListener("click", function () {
    this.querySelector(".header__custom-select").classList.toggle("open");
  });

for (const option of document.querySelectorAll(".header__custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".header__custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".header__custom-select").querySelector(
        ".header__custom-select-trigger span"
      ).textContent = this.textContent;
      this.closest(".header__custom-select").querySelector(
        ".header__custom-select-trigger span"
      ).innerHTML = this.innerHTML;
    }
  });
}
window.addEventListener("click", function (e) {
  const select = document.querySelector(".header__custom-select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});
