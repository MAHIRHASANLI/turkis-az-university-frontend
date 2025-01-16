
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
setInterval(changeBackground, 5000);


const menuLink = document.querySelectorAll(".menu");

menuLink.forEach((item) => {
     let isOpen = false;
     item.addEventListener("click", function () {
          isOpen = !isOpen;
          if (isOpen) {
               item.nextElementSibling.style.display = "block"
          } else {
               item.nextElementSibling.style.display = "none"
          }
     });

})

