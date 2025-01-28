const BASE_URL = "https://turkis-az-university-backend.vercel.app/informations"
// "http://127.0.0.1:5500/info.json";

export const getBaseRequest = async (category) => {
     try {
          // Əgər category varsa, onu əlavə et, yoxsa bütün məlumatları götür
          const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;

          const response = await fetch(url);
          if (!response.ok) {
               throw new Error("Server xəta verdi: " + response.status);
          }
          return await response.json()
     } catch (error) {
          console.error("Xəta baş verdi: ", error.message);
          return null;
     }
};


export const postBaseRequest = async (data) => {
     try {
          const response = await fetch(BASE_URL, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(data)
          });

          if (!response.ok) {
               throw new Error("Informasiya elave olunmadi!")
          };
          return await response.json();
     } catch (error) {
          console.error("Informasiya elave olunmadi: ", error)
     }
};


export const deleteBaseRequest = async (id) => {
     try {
          const response = await fetch(`${BASE_URL}/${id}`, {
               method: "DELETE"
          });
          return response.json();
     } catch (error) {
          console.error("Silinmedi: ", error);
     }
}

export const postBaseCloudinary = async (image) => {

     const CLOUDINARY_CLOUD_NAME = "dge5vq2gu"
     const UPLOAD_PRESET = "Informations-images"
     const formData = new FormData();
     formData.append("file", image);
     formData.append("upload_preset", UPLOAD_PRESET);
     formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

     const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
               method: "POST",
               body: formData,
          })
     const data = await res.json();
     return data.secure_url;
}