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
};

export default userAPI;
