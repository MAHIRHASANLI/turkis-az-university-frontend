allFunctions()
function allFunctions() {
     addPageSlider();
     openAccardion()
     setupScrollButton()
     accardionColorChange()
}


//! ANA SEHIFE DLIDER I
function addPageSlider() {
     // Şəkillərin olduğu massiv
     const images = [
          'url("../../images/01.jpg")',
          'url("../../images/03.jpeg")',
          'url("../../images/02.jpeg")'
     ];

     // Başlanğıc olaraq birinci şəkli göstərək
     let currentIndex = 0;

     const mainElement = document.getElementById("main");
     mainElement.style.backgroundImage = images[currentIndex];

     function changeBackground() {
          currentIndex = (currentIndex + 1) % images.length;

          mainElement.style.backgroundImage = images[currentIndex];
     }

     setInterval(changeBackground, 5000);
}

//! ACCARDION LINK
function openAccardion() {
     const menuLink = document.querySelectorAll(".menu");
     menuLink.forEach((link) => {
          link.addEventListener("click", function () {
               const accardions = document.querySelectorAll(".accardion");
               accardions.forEach((accardion) => {
                    if (link.nextElementSibling === accardion) {
                         if (accardion.style.height === "0px" || accardion.style.height === "") {
                              accardion.style.height = (accardion.children.length * 40) + "px";
                         } else {
                              accardion.style.height = "0px";
                         }
                    } else {
                         accardion.style.height = "0px";
                    }
               });
          });
     });
}

function accardionColorChange() {
     const checkboxes = document.querySelectorAll('[class*="accardion-wrapper"] input[type=checkbox]');

     checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', () => {
               checkboxes.forEach(cb => {
                    const label = cb.nextElementSibling;
                    const span = label.querySelector('span:nth-of-type(2)');

                    if (cb.checked) {
                         if (cb === checkbox) {
                              label.style.background = '#44c6eb';
                              label.style.borderTop = '1px solid #878e98';
                              label.style.borderBottom = '1px solid #2799db';
                              label.style.backgroundImage = 'linear-gradient(to bottom, #44c6eb, #2799db)';

                              span.style.background = '#2173a1';
                              span.style.borderTop = '1px solid #1b5f85';
                              span.style.borderBottom = '1px solid #4cb1e4';
                              span.style.boxShadow = 'inset 0 0 5px #111';
                         } else {
                              cb.checked = false;
                              label.style.background = '';
                              label.style.borderTop = '';
                              label.style.borderBottom = '';
                              label.style.backgroundImage = '';

                              span.style.background = '';
                              span.style.borderTop = '';
                              span.style.borderBottom = '';
                              span.style.boxShadow = '';
                         }
                    } else {
                         label.style.background = '';
                         label.style.borderTop = '';
                         label.style.borderBottom = '';
                         label.style.backgroundImage = '';

                         span.style.background = '';
                         span.style.borderTop = '';
                         span.style.borderBottom = '';
                         span.style.boxShadow = '';
                    }
               });
          });
     });


}


//! BUTTON SCROLL ILE GERI DONME
function setupScrollButton() {
     const backBtn = document.querySelector(".top-back-btn");
     window.addEventListener("scroll", function () {
          if (this.scrollY > 200) {
               backBtn.style.display = "block";

          } else {
               backBtn.style.display = "none";
          }
     });

     backBtn.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: "smooth" });
     })

}