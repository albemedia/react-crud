import axios from "axios";

const API_URL = "https://deltomapi.herokuapp.com/api";

const responseBody = res => res.data;
const requests = {
  get: url => axios.get(url).then(responseBody),
  post: (url, data) => axios.post(url, data).then(responseBody)
};

export const customers = {
  fetch: url => requests.get(`${API_URL}${url}`),
  register: data => requests.post(`${API_URL}/customers`, data)
};
