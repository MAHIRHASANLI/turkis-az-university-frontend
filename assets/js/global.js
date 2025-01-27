import { scrollToTop } from "../utils/index.js";

document.addEventListener("DOMContentLoaded", function () {
     setupScrollButton();
     addSliderBackground()
     toggleAccardion();
     // accardionColorChange();
})

//! ANA SEHIFE DLIDER I
function addSliderBackground() {
     const sliderItems = document.querySelectorAll("#slider-wrapper .slider-item");
     let currentIndex = 0;
     sliderItems.forEach((item, index) => {
          item.style.overflow = index === 0 ? "visible" : "hidden";
          item.style.opacity = index === 0 ? "1" : "0";
     });
     function changeBackground() {
          sliderItems[currentIndex].style.overflow = "hidden";
          sliderItems[currentIndex].style.opacity = "0";

          currentIndex = (currentIndex + 1) % sliderItems.length;

          sliderItems[currentIndex].style.overflow = "visible";
          sliderItems[currentIndex].style.opacity = "1";
          sliderItems[currentIndex].style.transition = "opacity 0.5s ease-in-out";
     }

     setInterval(changeBackground, 5000);
}

//! ACCARDION LINK
function toggleAccardion() {
     addEventListener("click", function (e) {
          // e.target.classList.contains("menu")
          const menu = e.target.closest(".menu")
          if (menu) {

               const accardions = document.querySelectorAll(".accardion");
               accardions.forEach((accardion) => {
                    if (e.target.nextElementSibling === accardion) {
                         if (accardion.style.height === "0px" || accardion.style.height === "") {
                              accardion.style.height = (accardion.children.length * 40) + "px";
                         } else {
                              accardion.style.height = "0px";
                         }
                    } else {
                         accardion.style.height = "0px";
                    }
               });
          }

     })
}

//! XEBER ACCARDINU
// function accardionColorChange() {
//      const checkboxes = document.querySelectorAll('.accardion');

//      checkboxes.forEach(checkbox => {
//           checkbox.addEventListener('click', (e) => {
//                checkboxes.forEach(cb => {
//                     const label = cb.nextElementSibling;
//                     const span = label.querySelector('span:nth-of-type(2)');

//                     if (cb.checked) {
//                          if (cb === checkbox) {
//                               label.style.background = '#44c6eb';
//                               label.style.borderTop = '1px solid #878e98';
//                               label.style.borderBottom = '1px solid #2799db';
//                               label.style.backgroundImage = 'linear-gradient(to bottom, #44c6eb, #2799db)';

//                               span.style.background = '#2173a1';
//                               span.style.borderTop = '1px solid #1b5f85';
//                               span.style.borderBottom = '1px solid #4cb1e4';
//                               span.style.boxShadow = 'inset 0 0 5px #111';
//                          } else {
//                               cb.checked = false;
//                               label.style.background = '';
//                               label.style.borderTop = '';
//                               label.style.borderBottom = '';
//                               label.style.backgroundImage = '';

//                               span.style.background = '';
//                               span.style.borderTop = '';
//                               span.style.borderBottom = '';
//                               span.style.boxShadow = '';
//                          }
//                     } else {
//                          label.style.background = '';
//                          label.style.borderTop = '';
//                          label.style.borderBottom = '';
//                          label.style.backgroundImage = '';

//                          span.style.background = '';
//                          span.style.borderTop = '';
//                          span.style.borderBottom = '';
//                          span.style.boxShadow = '';
//                     }
//                });
//           });
//      });


// }


//! BUTTON SCROLL ILE GERI DONME
function setupScrollButton() {
     const backBtn = document.querySelector(".top-back-btn");
     window.addEventListener("scroll", function () {
          if (this.scrollY > 100) {
               backBtn.style.display = "block";
          } else {
               backBtn.style.display = "none";
          }
     });

     backBtn.addEventListener("click", scrollToTop)

}