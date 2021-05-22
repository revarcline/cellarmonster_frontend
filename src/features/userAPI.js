const axios = require('axios');

// set api root here
const apiRoot = 'http://localhost:3001';
//const apiRoot = 'https://cellarmonster.herokuapp.com';

const userAPI = {
  //bottles
  getAllBottles: () => {
    return axios
      .get(`${apiRoot}/bottles`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  getBottlesBy: (resource, query) => {
    return axios
      .get(`${apiRoot}/${resource}/${query}`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  postBottle: (data) => {
    return axios
      .post(`${apiRoot}/bottles`, data)
      .then((response) => response.data)
      .catch((error) => error);
  },

  patchBottle: (data, id) => {
    return axios
      .patch(`${apiRoot}/bottles/${id}`, data)
      .then((response) => response.data)
      .catch((error) => error);
  },

  deleteBottle: (id) => {
    return axios
      .delete(`${apiRoot}/bottles/${id}`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  // attributes
  getCountries: () => {
    return axios
      .get(`${apiRoot}/countries`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  getBins: () => {
    return axios
      .get(`${apiRoot}/bins`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  getVarietals: () => {
    return axios
      .get(`${apiRoot}/producers`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  getVarietals: () => {
    return axios
      .get(`${apiRoot}/varietals`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  // orders
  getAllOrders: () => {
    return axios
      .get(`${apiRoot}/orders`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  getUserOrders: (id) => {
    return axios
      .get(`${apiRoot}/user_orders/${id}`)
      .then((response) => response.data)
      .catch((error) => error);
  },

  postOrder: (data) => {
    return axios
      .post(`${apiRoot}/orders`, data)
      .then((response) => response.data)
      .catch((error) => error);
  },
};

export default userAPI;
