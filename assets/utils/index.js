//! DOM elementi yaratmaq üçün funksiya;
export function createElement(tag, attributes = null, content = null) {
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

//! Sehifeni yuxari aparan funksiya;
export function scrollToTop() {
     window.scrollTo({ top: 0, behavior: "smooth" });
}

//! ALERT GOSTERMEK
export const showAlert = (icon, title) => {
     Swal.fire({
          position: "top-end",
          icon,
          title,
          showConfirmButton: false,
          timer: 1500
     });
}
