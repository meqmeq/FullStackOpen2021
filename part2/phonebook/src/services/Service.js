import axios from "axios";
const baseUrl = "/api/persons";
// const baseUrl = "http://localhost:3001/persons";
// eslint-disable-next-line

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
// eslint-disable-next-line
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
// eslint-disable-next-line
export default { getAll, create, update, deletePerson };
