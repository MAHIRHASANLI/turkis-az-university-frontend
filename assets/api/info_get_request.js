import { createElement, scrollToTop } from "../utils/index.js";
import { getBaseRequest } from "./base_request.js";

let newsDatas = [];


export async function loadAndRenderInfo(category = " ") {
     try {
          if (category) {
               const unicDates = new Set();
               const { data } = await getBaseRequest();
               newsDatas = data;
               data.forEach(({ date }) => unicDates.add(date.slice(3)));
               unicDates.forEach((date) => addInfoUI(data, date));
          }
     } catch (error) {
          console.error("Xəbərlər yüklənərkən xəta baş verdi: ", error.message)
     }
}


//TODO UI a Informasiya(DATA) leave edilmesi;
function addInfoUI(array, date) {
     const filterData = array.filter((info) => info.date.includes(date));
     //TODO Əsas elementlər
     const infoItemLi = createElement("li")
     const label = createElement("label", { className: "menu" });
     //TODO Tarix və xəbər sayı
     const spanDate = createElement("span", {}, `${date} - Xəbərləri`);
     const spanCountInfo = createElement("span", {}, `{ ${filterData.length} }`);
     label.append(spanDate, spanCountInfo);
     //TODO Accordion siyahısı
     const accardionUl = createElement("ul", { className: "accardion" });
     filterData.forEach((data) => accardionUl.append(createAccardionItem(data)))
     //TODO Bütün elementlər birləşdi
     infoItemLi.append(label, accardionUl);
     //TODO Wrapper-a əlavə
     document.querySelector(".accardion-wrapper").append(infoItemLi);
};

//TODO Accordion üçün hər bir elementi yaradiriq;
function createAccardionItem(data) {
     const accardionItemA = createElement("a", { className: "info", id: data.id }, `${data.date} - ${data.title}`);
     const accardionItemLi = createElement("li");
     accardionItemLi.append(accardionItemA);
     return accardionItemLi;
};

//! Click olunan xeberi gostermek;
const info = document.querySelector(".accardion-wrapper");
info.addEventListener("click", showDetailInfo);
function showDetailInfo(e) {
     if (e.target.classList.contains("info")) {
          const detailInfo = newsDatas.find(({ id }) => id == e.target.id);
          if (detailInfo) {
               findDetailInfo(detailInfo);
          } else {
               findDetailInfo("");
          }
     }
}

function findDetailInfo({ title, description, date, images }) {
     const detailContainer = document.querySelector(".detail-information");
     if (!title) {
          renderNotFoundMessage(detailContainer);
          return;
     }
     // Başlıq
     const h3Title = createElement("h3", { className: "detail-title" }, title);
     //Xəbər
     const pDescription = createElement("p", { className: "detail-description" }, description);
     //Tarix
     const aDate = createElement("a", { className: "detail-date" }, `Xəbər tarixi: ${date}`);
     // Şəkil konteyneri
     const imgContainer = createElement("div", { className: "img-container" });
     if (images && images.length > 0) {
          images.forEach((img) => imgContainer.appendChild(createElement("img", { src: img, alt: title })));
     };
     // Bütün elementləri birləşdirən konteyner
     const divContainer = createElement("div");
     divContainer.append(h3Title, pDescription, imgContainer, aDate);
     //Melumati goster
     detailContainer.innerHTML = "";
     detailContainer.appendChild(divContainer);

     // Yuxarıya keçid
     scrollToTop();
};

//NOT FOUUND mesaji
function renderNotFoundMessage(container) {
     container.appendChild(createElement("h3", { className: "not-found-message" }, "Axtardığınız xəbər tapılmadı 😊"));
}

