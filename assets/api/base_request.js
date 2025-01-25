const BASE_URL = "http://127.0.0.1:5500/info.json";

export const getBaseRequest = async () => {
     try {
          const response = await fetch(BASE_URL);
          if (!response.ok) {
               throw new Error("Server xəta verdi: " + response.status);
          }

          return await response.json()
     } catch (error) {
          console.error("Xəta baş verdi: ", error.message);
          return null;
     }
};
