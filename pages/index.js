const popups = document.querySelectorAll(".popup");
const popupLogin = document.querySelector(".popup__login");
const popupGamburger = document.querySelector(".popup__gamburger");
const btns = document.querySelectorAll(".button-started");
const loginForm = document.forms.LoginForm;
const gamburger = document.querySelector(".gamburger");
const footerNav = document.querySelector(".footer-nav");
const container = document.querySelector(".popup__container_gamburger");

//открыть попап
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.body.style.overflow = "hidden"; //скрыла прокрутку
  document.addEventListener("keydown", closeByEscape);
};
// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", closeByEscape); //оптимизация удаление слушателя?
};
//закрытие Escape
const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
// Закрытие на оверлей и кнопку Х
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
// button-started
btns.forEach((btn) => {
  btn.addEventListener("click", () => openPopup(popupLogin));
});
// отправка формы
const preventDefault = (evt) => {
  evt.preventDefault();
  closePopup(popupLogin);
};
//Открытие попапа гамбургера
const EventListenerGamburgerMenu = () => {
  openPopup(popupGamburger);
  innerFooter();
  container.addEventListener("click", popupGamdurgerCloseIfButtonStartedClick); //слушатель на кнопку старта, чтобы закрыть попап
};
//копирование текста из footer
const innerFooter = () => {
  container.innerHTML = footerNav.innerHTML;
  container.classList.add("container__mobile");
  container.style.cssText = "justify-content: space-around;";
  const btnClose = document.createElement("button");
  btnClose.classList.add("popup__button-close");
  const btnCloseText = document.createTextNode("X");
  btnClose.appendChild(btnCloseText);
  container.appendChild(btnClose);
  const btns1 = document.querySelector(".button-started");
  container.appendChild(btns1);
};
//слушатель на кнопку старта, чтобы закрыть попап
const popupGamdurgerCloseIfButtonStartedClick = (evt) => {
  if (evt.target.classList.contains("button-started")) {
    closePopup(popupGamburger);
    container.removeEventListener(
      "click",
      popupGamdurgerCloseIfButtonStartedClick
    ); //удаляем лишний слушатель
  }
};

//слушатели на странице
loginForm.addEventListener("submit", preventDefault);
gamburger.addEventListener("click", EventListenerGamburgerMenu);
