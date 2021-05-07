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

const attributesReducer = (
  state = {
    countries: [],
    bins: [],
    producers: [],
    varietals: [],
    countriesLoading: 'idle',
    binsLoading: 'idle',
    producersLoading: 'idle',
    varietalsLoading: 'idle',
    countriesError: '',
    binsError: '',
    producersError: '',
    varietalsError: '',
  },
) => {
  switch (action.type) {
    case LOADING_COUNTRIES:
      return {
        ...state,
        countries: [...state.countries],
        countriesLoading: 'loading',
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload.data,
        countriesLoading: 'finished',
      };
    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        countriesError: action.payload,
      };

    case LOADING_BINS:
      return {
        ...state,
        bins: [...state.bins],
        binsLoading: 'loading',
      };
    case GET_BINS_SUCCESS:
      return {
        ...state,
        bins: action.payload.data,
        binsLoading: 'finished',
      };
    case GET_BINS_FAILURE:
      return {
        ...state,
        binsError: action.payload,
      };

    case LOADING_PRODUCERS:
      return {
        ...state,
        producers: [...state.producers],
        producersLoading: 'loading',
      };
    case GET_PRODUCERS_SUCCESS:
      return {
        ...state,
        producers: action.payload.data,
        producersLoading: 'finished',
      };
    case GET_PRODUCERS_FAILURE:
      return {
        ...state,
        producersError: action.payload,
      };

    case LOADING_VARIETALS:
      return {
        ...state,
        varietals: [...state.varietals],
        varietalsLoading: 'loading',
      };
    case GET_VARIETALS_SUCCESS:
      return {
        ...state,
        varietals: action.payload.data,
        varietalsLoading: 'finished',
      };
    case GET_VARIETALS_FAILURE:
      return {
        ...state,
        varietalsError: action.payload,
      };

    default:
      state;
  }
};

export default attributesReducer;
