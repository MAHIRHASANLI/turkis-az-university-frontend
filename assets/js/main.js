
// Şəkillərin olduğu massiv
const images = [
     'url("../../images/01.jpg")',
     'url("../../images/03.jpeg")',
     'url("../../images/02.jpeg")'
];


// Başlanğıc olaraq birinci şəkli göstərək
let currentIndex = 0;

const bodyElement = document.body;

// Arxa fon şəklini dəyişdirən funksiyanı yazırıq
function changeBackground() {
     // Növbəti şəkli təyin edirik
     currentIndex = (currentIndex + 1) % images.length;

     // Yeni fon şəklini body-yə təyin edirik
     bodyElement.style.backgroundImage = images[currentIndex];
}

// İlk fon şəklini təyin edək
bodyElement.style.backgroundImage = images[currentIndex];

// Hər 5 dəqiqədən bir şəkli dəyişdirən interval
setInterval(changeBackground, 10000);


const menuLink = document.querySelectorAll(".menu");
menuLink.forEach((link) => {
     link.addEventListener("click", function () {
          const accardions = document.querySelectorAll(".accardion")
          accardions.forEach((accardion) => {
               if (link.nextElementSibling === accardion) {
                    accardion.style.height = (accardion.children.length * 35) + "px";
               }
               else {
                    accardion.style.height = "0px";
               }
          })
     });

})

