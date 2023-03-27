const popup = document.querySelector(".popup");
const btns = document.querySelectorAll(".button__started");

const openPopup = () => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};
const closePopup = () => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape); //оптимизация удаление слушателя
};

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

btns.forEach((btn) => {
  btn.addEventListener("click", openPopup);
  console.log("work");
});
