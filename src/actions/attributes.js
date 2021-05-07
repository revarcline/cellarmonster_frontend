import apiRoot from '../apiConfig';
import {
  LOADING_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE,
  LOADING_BINS,
  GET_BINS_SUCCESS,
  GET_BINS_FAILURE,
  LOADING_PRODUCERS,
  GET_PRODUCERS_SUCCESS,
  GET_PRODUCERS_FAILURE,
  LOADING_VARIETALS,
  GET_VARIETALS_SUCCESS,
  GET_VARIETALS_FAILURE,
} from '.';

export const loadingCountries = () => {
  return { type: LOADING_COUNTRIES };
};

export const getCountriesSuccess = (data) => {
  return { type: GET_COUNTRIES_SUCCESS, payload: data };
};

export const getCountriesFailure = (error) => {
  return { type: GET_COUNTRIES_FAILURE, payload: error };
};

export const loadingBins = () => {
  return { type: LOADING_BINS };
};

export const getBinsSuccess = (data) => {
  return { type: GET_BINS_SUCCESS, payload: data };
};

export const getBinsFailure = (error) => {
  return { type: GET_BINS_FAILURE, payload: error };
};

export const loadingProducers = () => {
  return { type: LOADING_PRODUCERS };
};

export const getProducersSuccess = (data) => {
  return { type: GET_PRODUCERS_SUCCESS, payload: data };
};

export const getProducersFailure = (error) => {
  return { type: GET_PRODUCERS_FAILURE, payload: error };
};

export const loadingVarietals = () => {
  return { type: LOADING_VARIETALS };
};

export const getVarietalsSuccess = (data) => {
  return { type: GET_VARIETALS_SUCCESS, payload: data };
};

export const getVarietalsFailure = (error) => {
  return { type: GET_VARIETALS_FAILURE, payload: error };
};

export const getCountries = () => {
  return (dispatch) => {
    dispatch(loadingCountries());
    return fetch(`${apiRoot}/countries`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getCountriesSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getCountriesSuccess(errors)));
      }
    });
  };
};

export const getBins = () => {
  return (dispatch) => {
    dispatch(loadingBins());
    return fetch(`${apiRoot}/bins`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getBinsSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getBinsSuccess(errors)));
      }
    });
  };
};

export const getProducers = () => {
  return (dispatch) => {
    dispatch(loadingProducers());
    return fetch(`${apiRoot}/producers`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getProducersSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getProducersSuccess(errors)));
      }
    });
  };
};

export const getVarietals = () => {
  return (dispatch) => {
    dispatch(loadingVarietals());
    return fetch(`${apiRoot}/varietals`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getVarietalsSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getVarietalsSuccess(errors)));
      }
    });
  };
};
