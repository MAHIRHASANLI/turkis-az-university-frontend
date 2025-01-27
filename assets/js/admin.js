import { postBaseRequest } from "../api/base_request.js";

const myForm = document.querySelector("#product-info-form");


myForm.addEventListener("submit", async function (event) {
     await postBaseRequest();
     event.preventDefault();
});

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", toggleForm);

const addInfoBtn = document.querySelector("#add-info-btn");
addInfoBtn.addEventListener("click", toggleForm)

function toggleForm() {
     const formContainer = document.querySelector(".form-container");
     console.log('formContainer: ', formContainer);

     if (formContainer.style.display === "none" || formContainer.style.display === "") {
          formContainer.style.display = "block";
     } else {
          formContainer.style.display = "none";
     }
}