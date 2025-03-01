import axios from "axios";
import { API_CONFIG } from "../../../../utils/api"; 

export const pdfService = {
  uploadPdf: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_CONFIG.LOCAL_URL}${API_CONFIG.ENDPOINTS.PDF}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
