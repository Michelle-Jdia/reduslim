const selectorList = {
  formSelector: ".header__form",
  inputSelector: ".header__input",
  submitButtonSelector: ".header__btn",
  inactiveButtonClass: "header__btn-submit_disabled",
  inputErrorClass: "header__input-error",
  errorClass: "header__input-error_visible",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  selectorList
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorList.errorClass);
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(selectorList.errorClass);
};
const checkInputValidity = (formSelector, inputSelector, selectorList) => {
  if (!inputSelector.validity.valid) {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
      selectorList
    );
  } else {
    hideInputError(formSelector, inputSelector, selectorList);
  }
};
const setEventListeners = (formSelector, selectorList) => {
  const inputList = Array.from(
    formSelector.querySelectorAll(selectorList.inputSelector)
  );
  const btnElement = formSelector.querySelector(
    selectorList.submitButtonSelector
  );
  toggleBtnState(inputList, btnElement, selectorList);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      checkInputValidity(formSelector, inputSelector, selectorList);
      toggleBtnState(inputList, btnElement, selectorList);
    });
  });
};
const enableValidation = (selectorList) => {
  const formList = Array.from(
    document.querySelectorAll(selectorList.formSelector)
  );
  formList.forEach((formSelector) => {
    formSelector.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    setEventListeners(formSelector, selectorList);
  });
};

const hasNotValidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

function disableSubmitButton(btnElement, selectorList) {
  btnElement.disabled = true;
  btnElement.classList.add(selectorList.inactiveButtonClass);
}

const toggleBtnState = (inputList, btnElement, selectorList) => {
  if (hasNotValidInput(inputList, selectorList)) {
    disableSubmitButton(btnElement, selectorList);
  } else {
    btnElement.disabled = false;
    btnElement.classList.remove(selectorList.inactiveButtonClass);
  }
};
enableValidation(selectorList);
