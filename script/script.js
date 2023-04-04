const popup = document.querySelector(".popup");
const btns = document.querySelectorAll(".button-started");
const loginForm = document.forms.LoginForm

const openPopup = () => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape); 
};
const closePopup = () => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape); //оптимизация удаление слушателя?
};

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

popup.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(popup);
  }
  if (evt.target.classList.contains("popup__button-close")) {
    closePopup(popup);
  }
});

btns.forEach((btn) => {
  btn.addEventListener("click", openPopup);
});
const preventDefault = (evt) => {
  evt.preventDefault();
  closePopup();
}

loginForm.addEventListener("submit", preventDefault);