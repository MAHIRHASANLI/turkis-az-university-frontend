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