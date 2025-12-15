import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ai-model-inventory-manager-server-six.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
