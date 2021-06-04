const axios = require('axios');

// set api root here
const apiRoot = 'http://localhost:3001';
//const apiRoot = 'https://cellarmonster.herokuapp.com';

const userAPI = {
  //bottles
  getAllBottles: () =>
    axios
      .get(`${apiRoot}/bottles`)
      .then((response) => response.data)
      .catch((error) => error),

  getBottlesBy: (by, term) =>
    axios
      .get(`${apiRoot}/${by}/${term}`)
      .then((response) => response.data)
      .catch((error) => error),

  postBottle: (data) =>
    axios
      .post(`${apiRoot}/bottles`, data)
      .then((response) => response.data)
      .catch((error) => error),

  patchBottle: (data, id) =>
    axios
      .patch(`${apiRoot}/bottles/${id}`, data)
      .then((response) => response.data)
      .catch((error) => error),

  deleteBottle: (id) =>
    axios
      .delete(`${apiRoot}/bottles/${id}`)
      .then((response) => response.data)
      .catch((error) => error),

  // attributes
  getCountries: () =>
    axios
      .get(`${apiRoot}/countries`)
      .then((response) => response.data)
      .catch((error) => error),

  getBins: () =>
    axios
      .get(`${apiRoot}/bins`)
      .then((response) => response.data)
      .catch((error) => error),

  getProducers: () =>
    axios
      .get(`${apiRoot}/producers`)
      .then((response) => response.data)
      .catch((error) => error),

  getVarietals: () =>
    axios
      .get(`${apiRoot}/varietals`)
      .then((response) => response.data)
      .catch((error) => error),

  // orders
  getAllOrders: () =>
    axios
      .get(`${apiRoot}/orders`)
      .then((response) => response.data)
      .catch((error) => error),

  getUserOrders: (id) =>
    axios
      .get(`${apiRoot}/user_orders/${id}`)
      .then((response) => response.data)
      .catch((error) => error),

  postOrder: (data) =>
    axios
      .post(`${apiRoot}/orders`, data)
      .then((response) => response.data)
      .catch((error) => error),

  //users
  getUsers: () =>
    axios
      .get(`${apiRoot}/users`)
      .then((response) => response.data)
      .catch((error) => error),

  getUser: (id) =>
    axios
      .get(`${apiRoot}/users/${id}`)
      .then((response) => response.data)
      .catch((error) => error),
};

export default userAPI;
