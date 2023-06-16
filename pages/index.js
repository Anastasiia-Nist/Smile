const popups = document.querySelectorAll(".popup");
const popupLogin = document.querySelector(".popup__login");
const popupBurger = document.querySelector(".nav-mobile");
const btnsStarted = document.querySelectorAll(".button-started");
const btnBurger = document.querySelector(".burger");
const navMobile = document.querySelector(".nav-mobile");
const mobileNavList = document.querySelectorAll(".nav-mobile__item");
const header = document.querySelector(".header");
const loginForm = document.forms.LoginForm;
const passwordControl = document.querySelector(".password-control");
const inputListLogin = loginForm.querySelectorAll("input");
let userInfo = {};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  blockedScroll();
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  anBlockedScroll();
  document.removeEventListener("keydown", closeByEscape);
};

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

const submitForm = (evt) => {
  evt.preventDefault();
  getInputValues();
  closePopup(popupLogin);
};
function getInputValues() {
  inputListLogin.forEach((input) => {
    userInfo[input.id] = input.value;
  });
}
function blockedScroll() {
  document.body.classList.add("page-lock");
}
function anBlockedScroll() {
  document.body.classList.remove("page-lock");
}

function showPassword(evt) {
  const input = document.getElementById("password");
  if (input.getAttribute("type") == "password") {
    evt.target.classList.add("view");
    input.setAttribute("type", "text");
  } else {
    evt.target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  //return false;
}

//валидация
function showError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`form__input-error_active`);
}
function hiddenError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.classList.remove(`form__input-error_active`);
  errorElement.textContent = "";
}
function hiddenAllErrors() {
  inputListLogin.forEach((inputElement) => {
    hiddenError(inputElement);
  });
}
function toggleButtonState(form) {
  const isFormValid = form.checkValidity();
  const submitButton = form.querySelector(".form__button");
  submitButton.toggleAttribute("disabled", !isFormValid);
}

function isValid(inputElement) {
  if (!inputElement.validity.valid) {
    showError(inputElement);
  } else {
    hiddenError(inputElement);
  }
}

//слушатели на странице
btnsStarted.forEach((btn) => {
  btn.addEventListener("click", () => {
    openPopup(popupLogin);
    hiddenAllErrors();
  });
});
btnBurger.addEventListener("click", () => openPopup(popupBurger));
mobileNavList.forEach((item) => {
  item.addEventListener("click", () => closePopup(popupBurger));
});
loginForm.addEventListener("submit", submitForm);

passwordControl.addEventListener("click", showPassword);

inputListLogin.forEach((inputElement) => {
  inputElement.addEventListener("input", () => {
    isValid(inputElement);
    toggleButtonState(loginForm);
  });
  toggleButtonState(loginForm);
});
