// modals
const modalForm = document.querySelector(".popup__login");
const modalNavigation = document.querySelector(".nav-mobile");

// buttons
const buttonsStartedList = document.querySelectorAll(".button-started");
const buttonBurger = document.querySelector(".burger");
const buttonPassword = document.querySelector(".password-control");

const header = document.querySelector(".header");
const mobileNavigationList = document.querySelectorAll(".nav-mobile__item");

// form
const form = document.forms.form;
const inputList = form.querySelectorAll("input");
const user = {};

// Modal
function openModal(modal) {
  modal.classList.add("popup_opened");
  blockedScroll();
};

function closeModal(modal) {
  modal.classList.remove("popup_opened");
  unBlockedScroll();
};

// Close modal
function setModalListener(modal) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("popup__button-close")) {
      closeModal(modal);
    }
  });
}

// submit form
function submitForm(evt) {
  evt.preventDefault();
  getInputValues();
  evt.target.reset();
  closeModal(modalForm);
};

// get values
function getInputValues() {
  inputList.forEach((input) => {
    user[input.id] = input.value;
  });
}

function blockedScroll() {
  document.body.classList.add("page-lock");
}
function unBlockedScroll() {
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

// validation
function showError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.classList.add(`form__input-error_active`);
}
function hiddenError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.classList.remove(`form__input-error_active`);
}
function hiddenAllErrors() {
  inputList.forEach((inputElement) => {
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

// All EventListener
function initPage() {

  // close modal
  setModalListener(modalForm);
  setModalListener(modalNavigation);

  // all buttons 'Get Started'
  buttonsStartedList.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(modalForm);
      hiddenAllErrors();
    });
  });

  buttonBurger.addEventListener("click", () => openModal(modalNavigation));

  mobileNavigationList.forEach((item) => {
    item.addEventListener("click", () => closeModal(modalNavigation));
  });

  form.addEventListener("submit", submitForm);

  buttonPassword.addEventListener("click", showPassword);
  // all input validation
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement);
      toggleButtonState(form);
    });
    toggleButtonState(form);
  });
}
initPage();
