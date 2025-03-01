import axios from "axios";
import { API_CONFIG } from "../../../../utils/api"; 

export const savedDocsListService = {
  listAllDocs: async () => {
    const response = await axios.get(`${API_CONFIG.LOCAL_URL}${API_CONFIG.ENDPOINTS.LIST}`);
    return response.data;
  },

  deleteDoc: async (docId) => {
    const response = await axios.delete(`${API_CONFIG.LOCAL_URL}${API_CONFIG.ENDPOINTS.DELETE}/${docId}`);
    return response.data;
  },
};