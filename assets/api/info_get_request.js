import { getBaseRequest } from "./base_request.js";

// let newsDatas = [];


export async function loadAndRenderInfo(category = " ") {
     try {
          if (category) {
               const unicDates = new Set();
               const { data } = await getBaseRequest();
               // newsDatas = data;
               data.forEach(({ date }) => unicDates.add(date.slice(3)));
               unicDates.forEach((date) => addInfoUI(data, date));
          }
     } catch (error) {
          console.error("Xəbərlər yüklənərkən xəta baş verdi: ", error.message)
     }
}

//! DOM elementi yaratmaq üçün funksiya;
function createElement(tag, attributes = null, content = null) {
     const element = document.createElement(tag);
     if (attributes) {
          Object.entries(attributes).forEach(([key, value]) => {
               if (key === "className") {
                    element.className = value;
               } else {
                    element.setAttribute(key, value);
               }
          });
     };
     if (content) {
          element.append(content);
     };

     return element;
};
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
     filterData.forEach((data) => accardionUl.append(createAccardionItem(data.title)))
     //TODO Bütün elementlər birləşdi
     infoItemLi.append(label, accardionUl);
     //TODO Wrapper-a əlavə
     document.querySelector(".accardion-wrapper").append(infoItemLi);
};

//TODO Accordion üçün hər bir elementi yaradiriq;
function createAccardionItem(data) {
     const accardionItemA = createElement("a", {}, data);
     const accardionItemLi = createElement("li");
     accardionItemLi.append(accardionItemA);
     return accardionItemLi;
}