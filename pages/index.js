const popups = document.querySelectorAll(".popup");
const popupLogin = document.querySelector(".popup__login");
const popupGamburger = document.querySelector(".popup__gamburger");
const btns = document.querySelectorAll(".button-started");
const loginForm = document.forms.LoginForm;
const gamburger = document.querySelector(".gamburger");
const headerNav = document.querySelector(".header__nav-wrapper");
const container = document.querySelector(".popup__container_gamburger");

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.body.style.overflow = "hidden"; //скрыла прокрутку
  document.addEventListener("keydown", closeByEscape);
};
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", closeByEscape); //оптимизация удаление слушателя?
};

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

btns.forEach((btn) => {
  btn.addEventListener("click", () => openPopup(popupLogin));
});

const preventDefault = (evt) => {
  evt.preventDefault();
  closePopup(popupLogin);
};

loginForm.addEventListener("submit", preventDefault);
gamburger.addEventListener("click", () => {
  openPopup(popupGamburger);
  container.innerHTML = headerNav.innerHTML;
  container.classList.add("container__mobile");
  const btnClose = document.createElement("button");
  btnClose.classList.add("popup__button-close")
  const btnCloseText = document.createTextNode("X");
  btnClose.appendChild(btnCloseText);
  container.appendChild(btnClose);
});