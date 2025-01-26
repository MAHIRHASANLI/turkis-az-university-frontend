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
