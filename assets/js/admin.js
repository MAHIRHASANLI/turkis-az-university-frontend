import { deleteBaseRequest, getBaseRequest, postBaseCloudinary, postBaseRequest } from "../api/base_request.js";
import { createElement, showAlert } from "../utils/index.js";
let allDatas = [];



window.addEventListener("DOMContentLoaded", async function () {
     await getDatasToAdmin();
     handleDeleteInformation();
     handleChangeCategory();
     onSubmitForm();
     handleCloseModal();
     handleOpenModal();
     addMinDateToInput();
     handleSearchInformation();
})

//! SERVERDEN DATA GETIRILMESI;
async function getDatasToAdmin(category) {
     const { data: datas } = await getBaseRequest();
     allDatas = [...datas];
     loadAndRenderInfo(datas, category);
}


//TODO UI a Informasiya(DATA) leave edilmesi;
function loadAndRenderInfo(datas, category) {
     if (!category) {
          category = "news";
     }

     const tbodyContainer = document.getElementById("tbody-list");
     tbodyContainer.innerHTML = "";

     datas.forEach((data) => {
          if (data.category === category) {
               const tdButton = createElement("td");
               const button = createElement("button", { className: "btn-remove" }, "Sil");
               tdButton.append(button)

               const trContainer = createElement("tr", { className: "table-item", id: data._id })
               const pTitle = createElement("p", { className: "table-content infos-title" }, data.title);
               const tdTitle = createElement("td", {}, pTitle);

               const pDescription = createElement("p", { className: "table-content" }, data.description);
               const tdDescription = createElement("td", {}, pDescription);
               const tdDate = createElement("td", {}, data.date);

               const tdImages = createElement("td");
               data.images.forEach((image) => tdImages.append(createElement("img", { src: image, alt: "info images", className: "table-item-img" })));

               trContainer.append(tdImages, tdTitle, tdDescription, tdDate, tdButton);

               tbodyContainer.append(trContainer);

          }
     })
}

//! INFORMASIYANIN KATEGORIYAYA GORE DEYISDIRLMESI
function handleChangeCategory() {
     const selectCategory = document.querySelector(".select-btn #category-select");
     selectCategory.addEventListener("change", function (event) {
          loadAndRenderInfo(allDatas, event.target.value)
     })
}

//! POST SORGUSU && FORM SUBMIT OLUNMASI 
function onSubmitForm() {
     const myForm = document.querySelector("#product-info-form");

     myForm.addEventListener("submit", async function (event) {
          event.preventDefault();
          toggleForm()
          const formData = new FormData(this)
          try {
               const date = formData.get("date");
               const newObject = {
                    title: formData.get("title"),
                    description: formData.get("description"),
                    date: formatDateToCustom(date),
                    category: formData.get("category"),
                    images: formData.getAll("images")
               };
               const imgURLs = await Promise.all(
                    newObject.images.map((img) => postBaseCloudinary(img))
               );
               newObject.images = imgURLs;
               const response = await postBaseRequest(newObject);

               showAlert("success", "Əlavə olundu!")

               getDatasToAdmin(newObject.category)
               console.log("Server Response:", response);
          } catch (error) {
               console.error("admin js de : Elave olunmadi: ");

               showAlert("error", "Əlavə olunmadı!")
          }
          myForm.reset();
     });
}

//! DELETE FUNKSIYASI;
function handleDeleteInformation() {
     const tbodyContainer = document.getElementById("tbody-list");

     tbodyContainer.addEventListener("click", async function (event) {
          if (event.target.classList.contains("btn-remove")) {
               if (confirm("Silmek ucun tesdiq edin!")) {
                    try {
                         const element = event.target.closest("tr");
                         const response = await deleteBaseRequest(element.id);

                         showAlert("success", "Uğurla silindi.");
                         element.remove();

                         console.log("Server Response:", response);
                    } catch (error) {
                         showAlert("error", "Silinmə uğursuz oldu.");
                         console.error("Silinme ugursuz oldu: ", error);
                    }
               }
          }
     });
}

//! AXTARIS FUNKSIYASI;
function handleSearchInformation() {
     const inputSearch = document.getElementById("search-input");
     inputSearch.addEventListener("input", function (event) {
          const searchValue = event.target.value.toLowerCase().trim()
          const infosTitles = document.querySelectorAll(".infos-title");
          infosTitles.forEach((item) => {
               const titleText = item.textContent.toLowerCase().trim()
               if (!searchValue || titleText.includes(searchValue)) {
                    item.closest(".table-item").style.display = "table-row";
               } else {
                    item.closest(".table-item").style.display = "none";
               }
          })
     })

}

//! MODALIN BAGLANMASI
function handleCloseModal() {
     const closeBtn = document.querySelector(".close");
     closeBtn.addEventListener("click", toggleForm);
}

//! MODALIN ACILMASI
function handleOpenModal() {
     const addInfoBtn = document.querySelector("#add-info-btn");
     addInfoBtn.addEventListener("click", toggleForm)
}

//! MODALIN ACILIB BAGLANMASI FUNKSIYASI;
function toggleForm() {
     const formContainer = document.getElementById("form-container");

     if (!formContainer) {
          console.error("Form container not found!");
          return;
     }

     formContainer.classList.toggle("active");

     if (formContainer.classList.contains("active")) {
          formContainer.style.visibility = "visible"; // Görünən edir
     } else {
          setTimeout(() => {
               formContainer.style.visibility = "hidden"; // Tamamilə gizlənir
          }, 400); // CSS keçid müddəti ilə eyni
     }
}

// ! Dinamik Olaraq AYLARIN teyini;
function formatDateToCustom(dateValue) {
     const months = [
          "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
          "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
     ];

     const [year, month, day] = dateValue.split("-");
     return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

//! DATE inputuna minimum tarix qeyd etmek;
function addMinDateToInput() {
     const dateInput = document.getElementById("date");

     const today = new Date();
     const yyyy = today.getFullYear();
     const mm = String(today.getMonth() + 1).padStart(2, "0");
     const dd = String(today.getDate()).padStart(2, "0");

     const todayFormatted = `${yyyy}-${mm}-${dd}`;

     dateInput.setAttribute("min", todayFormatted);
}