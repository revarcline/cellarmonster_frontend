import apiRoot from '../apiConfig';
const axios = require('axios');

const setHeaders = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const setHeadersWithToken = (token) => {
  return {
    headers: {
      ...setHeaders.headers,
      Authorization: token,
    },
  };
};

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

  deleteUser: (id) =>
    axios
      .delete(`${apiRoot}/users/registrations/${id}`)
      .then((response) => response.data)
      .catch((error) => error),

  // auth - not implemented, see src/actions/auth instead
  signupUser: (credentials) =>
    axios
      .post(`${apiRoot}/signup`, credentials, setHeaders)
      .then((response) => response)
      .catch((error) => error),

  updateUser: (credentials) =>
    axios
      .patch(`${apiRoot}/signup`, credentials, setHeaders)
      .then((response) => response)
      .catch((error) => error),

  loginUser: (credentials) =>
    axios
      .post(`${apiRoot}/login`, credentials, setHeaders)
      .then((response) => {
        return { response: { data, headers } };
      })
      .catch((error) => error),

  logoutUser: (token) =>
    axios
      .delete(`${apiRoot}/logout`, setHeadersWithToken(token))
      .then((response) => response)
      .catch((error) => error),

  checkAuth: (token) =>
    axios
      .get(`${apiRoot}/current_user`, setHeadersWithToken(token))
      .then((response) => {
        return { response: { data, headers } };
      })
      .catch((error) => error),
};

export default userAPI;
