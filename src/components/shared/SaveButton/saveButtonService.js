import axios from "axios";
import { API_CONFIG } from "../../../utils/api";

export const saveButtonService = {
  saveDoc: async (name, label, content) => {
    const response = await axios.post(`${API_CONFIG.LOCAL_URL}${API_CONFIG.ENDPOINTS.SAVE_DOC}`, {
      name,
      label,
      content
    });
    return response.data;
  },
};