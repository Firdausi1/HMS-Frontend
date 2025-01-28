import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

//Requests with Auth
export const getRequest = async (uri) => {
  return await axios.get(`${baseUrl}/${uri}`);
};

export const postRequest = async (uri, data) => {
  return await axios.post(`${baseUrl}/${uri}`, data);
};

export const putRequest = async (uri, data) => {
  return await axios.put(`${baseUrl}/${uri}`, data);
};

export const deleteRequest = async (uri, data) => {
  return await axios.delete(`${baseUrl}/${uri}`, data);
};

//Requests without Auth
// export const getRequest = async (uri) => {
//   return await axios.get(`${baseUrl}/${uri}`, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "application/json",
//     },
//   });
// };

// export const postRequest = async (uri, data) => {
//   return await axios.post(`${baseUrl}/${uri}`, data, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "application/json",
//     },
//   });
// };
