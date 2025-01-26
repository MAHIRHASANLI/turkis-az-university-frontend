import { getBaseRequest } from "../api/base_request.js";
import { createElement } from "../utils/index.js";

window.addEventListener("DOMContentLoaded", function () {
     getInformationsAndAddUI();
})

async function getInformationsAndAddUI() {
     try {
          const { data: datas } = await getBaseRequest();
          const categoryContainers = {
               news: document.querySelector(".news"),
               announcements: document.querySelector(".announcements"),
               activities: document.querySelector(".activities")
          };

          datas.forEach((data) => {
               const container = categoryContainers[data.category]
               if (container) {
                    const title = createElement("a", { href: `./${data.category}.html` }, data.title);
                    const arrow = createElement("i", { className: "fa fa-arrow-right" });
                    const containerItem = createElement("div", { className: "container-item announcement" });
                    containerItem.append(arrow, title);
                    container.append(containerItem);
               }
          });
     } catch (error) {
          console.error("Məlumat yüklənərkən xəta baş verdi:", error.message);
     }
}